
import { IncomingDataTable } from "@/components/IncomingDataTable";
import { MetaData } from "@/components/MetaData";
import { useIncomingData } from "@/hooks/useIncomingData";

const IncomingData = () => {
  const { data, isLoading, error } = useIncomingData();

  const handleStartHearingTest = (id: string) => {
    console.log("Starting hearing test for:", id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MetaData
        title="Data Dashboard - Hearing Test App"
        description="View and manage incoming hearing test data. Administrative dashboard for monitoring test submissions and results."
        keywords="data dashboard, hearing test data, admin dashboard, test results, data management"
        ogTitle="Data Dashboard - Hearing Test App"
        ogDescription="Administrative dashboard for viewing and managing hearing test data and submissions"
        ogUrl={window.location.href}
        canonical={window.location.href}
      />
      
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Incoming Data Dashboard</h1>
        <IncomingDataTable 
          data={data || []} 
          onStartHearingTest={handleStartHearingTest}
          isUpdating={isLoading}
        />
      </div>
    </div>
  );
};

export default IncomingData;
