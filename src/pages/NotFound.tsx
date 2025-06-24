
import { Button } from "@/components/ui/button";
import { MetaData } from "@/components/MetaData";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <MetaData
        title="Page Not Found - Hearing Test App"
        description="The page you're looking for doesn't exist. Return to the hearing test application homepage."
        keywords="page not found, 404 error, hearing test app"
        ogTitle="Page Not Found - Hearing Test App"
        ogDescription="The requested page could not be found on the hearing test application"
        ogUrl={window.location.href}
        canonical={window.location.href}
      />
      
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => navigate("/")}>
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
