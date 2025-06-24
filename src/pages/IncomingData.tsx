
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const IncomingData = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const handleStartHearingTest = (record: any) => {
    console.log('Starting hearing test for:', record);
    toast({
      title: "Starting Hearing Test",
      description: `Initiating test for ${record.first_name} ${record.last_name}`,
    });
    navigate('/');
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
            {!incomingData || incomingData.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No records found
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incomingData.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        {record.first_name || 'N/A'}
                      </TableCell>
                      <TableCell>
                        {record.last_name || 'N/A'}
                      </TableCell>
                      <TableCell>
                        {record.source || 'N/A'}
                      </TableCell>
                      <TableCell>
                        {record.timestamp ? 
                          new Date(record.timestamp).toLocaleString() : 'N/A'
                        }
                      </TableCell>
                      <TableCell>
                        {new Date(record.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Button 
                          onClick={() => handleStartHearingTest(record)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Start Hearing Test
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IncomingData;
