
import { IncomingDataTable } from "@/components/IncomingDataTable";
import { MetaData } from "@/components/MetaData";

const IncomingData = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <MetaData
        title="Data Dashboard - Hearing Test App"
        description="View and manage incoming hearing test data. Administrative dashboard for monitoring test submissions and results."
        keywords="data dashboard, hearing test data, admin dashboard, test results, data management"
        ogTitle="Data Dashboard - Hearing Test App"
        ogDescription="Administrative dashboard for viewing and managing hearing test data and submissions"
        ogUrl="https://your-domain.com/incoming-data"
        canonical="https://your-domain.com/incoming-data"
      />
      
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Incoming Data Dashboard</h1>
        <IncomingDataTable />
      </div>
    </div>
  );
};

export default IncomingData;
