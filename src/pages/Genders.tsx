
import { AddGenderForm } from "@/components/AddGenderForm";
import { MetaData } from "@/components/MetaData";
import { useGenders } from "@/hooks/useGenders";

const Genders = () => {
  const { refetch } = useGenders();

  const handleGenderAdded = () => {
    refetch();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MetaData
        title="Gender Management - Hearing Test App"
        description="Manage gender options for the hearing test application. Administrative interface for configuring user demographics."
        keywords="gender management, hearing test admin, demographics, user configuration"
        ogTitle="Gender Management - Hearing Test App"
        ogDescription="Administrative interface for managing gender options in the hearing test application"
        ogUrl={window.location.href}
        canonical={window.location.href}
      />
      
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Gender Management</h1>
        <AddGenderForm onGenderAdded={handleGenderAdded} />
      </div>
    </div>
  );
};

export default Genders;
