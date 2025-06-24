
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const TestingForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim() || !lastName.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both first name and last name",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://dwyfnqrtdbgyujkustbm.supabase.co/functions/v1/webhook-listener", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3eWZucXJ0ZGJneXVqa3VzdGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMTM2NTMsImV4cCI6MjA2MzY4OTY1M30.cQVEX7aMmTIsSh-4xutX2pEf6MNoW8BWGJbPTmc5d2I`,
          "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3eWZucXJ0ZGJneXVqa3VzdGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMTM2NTMsImV4cCI6MjA2MzY4OTY1M30.cQVEX7aMmTIsSh-4xutX2pEf6MNoW8BWGJbPTmc5d2I"
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          timestamp: new Date().toISOString(),
          source: "testing_form",
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Webhook response:", result);
        
        toast({
          title: "Success!",
          description: "Form submitted successfully",
        });
        
        // Clear the form
        setFirstName("");
        setLastName("");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Testing Form
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <Input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              disabled={isLoading}
              className="w-full"
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <Input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              disabled={isLoading}
              className="w-full"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full mt-6"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TestingForm;
