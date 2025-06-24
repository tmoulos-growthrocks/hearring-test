
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useIncomingData } from "@/hooks/useIncomingData";
import { IncomingDataTable } from "@/components/IncomingDataTable";

const IncomingData = () => {
  const navigate = useNavigate();
  const { incomingData, isLoading, error, updateStatusMutation } = useIncomingData();

  const handleStartHearingTest = async (record: any) => {
    console.log('Starting hearing test for:', record);
    
    if (record.status === 'started') {
      console.log('Test already started, navigating to home');
      navigate('/');
      return;
    }
    
    try {
      await updateStatusMutation.mutateAsync(record.id);
      navigate('/');
    } catch (error) {
      console.error('Failed to start hearing test:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading incoming data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">Error loading data: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Incoming Data Records</CardTitle>
          </CardHeader>
          <CardContent>
            <IncomingDataTable 
              data={incomingData || []}
              onStartHearingTest={handleStartHearingTest}
              isUpdating={updateStatusMutation.isPending}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IncomingData;
