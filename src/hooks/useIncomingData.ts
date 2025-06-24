
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useIncomingData = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: incomingData, isLoading, error } = useQuery({
    queryKey: ['incoming_data'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('incoming_data')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async (recordId: string) => {
      console.log('=== Starting status update process ===');
      console.log('Record ID:', recordId);
      
      // First, let's verify the record exists and log its current state
      const { data: existingRecord, error: fetchError } = await supabase
        .from('incoming_data')
        .select('*')
        .eq('id', recordId);
      
      console.log('Step 1 - Initial fetch result:', { existingRecord, fetchError });
      
      if (fetchError) {
        console.error('Error fetching record:', fetchError);
        throw new Error(`Error fetching record: ${fetchError.message}`);
      }
      
      if (!existingRecord || existingRecord.length === 0) {
        console.error('No record found with ID:', recordId);
        throw new Error(`No record found with ID: ${recordId}`);
      }
      
      console.log('Step 2 - Found existing record:', existingRecord[0]);
      console.log('Current status before update:', existingRecord[0].status);
      
      // Check if the record already has the desired status
      if (existingRecord[0].status === 'started') {
        console.log('Record already has status "started", returning existing record');
        return existingRecord[0];
      }
      
      // Try the update with more detailed logging
      console.log('Step 3 - Attempting update...');
      const updateResult = await supabase
        .from('incoming_data')
        .update({ status: 'started' })
        .eq('id', recordId);
      
      console.log('Step 4 - Update result:', updateResult);
      console.log('Update error details:', updateResult.error);
      console.log('Update data:', updateResult.data);
      console.log('Update status:', updateResult.status);
      console.log('Update statusText:', updateResult.statusText);
      
      if (updateResult.error) {
        console.error('Update failed with error:', updateResult.error);
        throw new Error(`Database update error: ${updateResult.error.message}`);
      }
      
      // Wait a moment before refetching to ensure the update has propagated
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Fetch the updated record to verify the change
      console.log('Step 5 - Refetching record to verify update...');
      const { data: updatedRecord, error: refetchError } = await supabase
        .from('incoming_data')
        .select('*')
        .eq('id', recordId)
        .single();
      
      console.log('Step 6 - Refetch result:', { updatedRecord, refetchError });
      
      if (refetchError) {
        console.error('Error refetching updated record:', refetchError);
        throw new Error(`Error refetching record: ${refetchError.message}`);
      }
      
      console.log('Step 7 - Final verification:');
      console.log('Status after update:', updatedRecord.status);
      console.log('Expected status: started');
      console.log('Update successful:', updatedRecord.status === 'started');
      
      if (updatedRecord.status !== 'started') {
        console.error('WARNING: Update appeared successful but status did not change!');
        console.error('This might indicate a database trigger, constraint, or RLS policy issue');
        // Still return the record but with a warning
      }
      
      console.log('=== Status update process complete ===');
      return updatedRecord;
    },
    onSuccess: (updatedRecord) => {
      console.log('Mutation successful, invalidating queries');
      // Update the cache immediately with the new data
      queryClient.setQueryData(['incoming_data'], (oldData: any[]) => {
        if (!oldData) return oldData;
        return oldData.map(record => 
          record.id === updatedRecord.id ? updatedRecord : record
        );
      });
      queryClient.invalidateQueries({ queryKey: ['incoming_data'] });
      toast({
        title: "Success",
        description: "Hearing test status updated",
      });
    },
    onError: (error) => {
      console.error('Mutation failed:', error);
      toast({
        title: "Error",
        description: `Failed to update hearing test status: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    incomingData,
    isLoading,
    error,
    updateStatusMutation,
  };
};
