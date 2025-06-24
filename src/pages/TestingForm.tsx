
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { MetaData } from "@/components/MetaData";

const TestingForm = () => {
  const handleApiKeySet = (apiKey: string) => {
    console.log("API key set:", apiKey);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MetaData
        title="API Configuration - Hearing Test App"
        description="Configure API settings for the hearing test application. Administrative interface for API key management."
        keywords="API configuration, hearing test admin, API key, settings, configuration"
        ogTitle="API Configuration - Hearing Test App"
        ogDescription="Administrative interface for configuring API settings in the hearing test application"
        ogUrl={window.location.href}
        canonical={window.location.href}
      />
      
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">API Configuration</h1>
        <ApiKeyInput onApiKeySet={handleApiKeySet} />
      </div>
    </div>
  );
};

export default TestingForm;
