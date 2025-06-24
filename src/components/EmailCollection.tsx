
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailCollectionProps {
  onComplete: (email: string) => void;
  userInfo: { gender: string; ageCategory: string };
  answers: string[];
  testResults: { leftEar: number; rightEar: number };
  userFirstName?: string;
  userLastName?: string;
}

export const EmailCollection = ({ 
  onComplete, 
  userInfo, 
  answers, 
  testResults,
  userFirstName,
  userLastName 
}: EmailCollectionProps) => {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!email.trim()) {
      setEmailError("Please enter your email address");
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    
    if (!consent) {
      setEmailError("Please agree to receive your results");
      return;
    }
    
    setEmailError("");
    setIsLoading(true);

    try {
      const averageScore = Math.round((testResults.leftEar + testResults.rightEar) / 2);

      // Send data to Zapier webhook with detailed results including captured names
      const payload = {
        email: email,
        consent: consent,
        timestamp: new Date().toISOString(),
        source: "hearing_test_app",
        userInfo: {
          gender: userInfo.gender,
          ageCategory: userInfo.ageCategory
        },
        questionnaireAnswers: answers,
        testResults: {
          leftEarScore: testResults.leftEar,
          rightEarScore: testResults.rightEar,
          averageScore: averageScore
        },
        // Include the captured first and last name in the webhook payload
        firstName: userFirstName,
        lastName: userLastName
      };

      const response = await fetch("https://hooks.zapier.com/hooks/catch/447525/ubyp1bq/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(payload),
      });

      console.log("Webhook triggered with detailed results including names:", payload);
      
      toast({
        title: "Success!",
        description: "Your information has been submitted successfully.",
      });

      onComplete(email);
    } catch (error) {
      console.error("Error sending webhook:", error);
      toast({
        title: "Error",
        description: "There was an issue submitting your information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
        <div className="w-16 h-1 bg-lime-400 rounded-full mx-auto mb-8"></div>
        
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
          <Mail className="w-10 h-10 text-blue-600" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Get Your Results
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Please provide your email address to receive your personalized hearing test results.
        </p>
        
        <div className="space-y-6 mb-8">
          <div>
            <Input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email address"
              className="text-lg py-3 px-4"
              disabled={isLoading}
            />
            {emailError && (
              <p className="text-red-600 text-sm mt-2 text-left">{emailError}</p>
            )}
          </div>
          
          <div className="flex items-start space-x-3 text-left">
            <Checkbox
              id="consent"
              checked={consent}
              onCheckedChange={(checked) => setConsent(checked as boolean)}
              className="mt-1"
              disabled={isLoading}
            />
            <label htmlFor="consent" className="text-sm text-gray-700 leading-relaxed">
              I agree to receive my hearing test results via email. This information will only be used 
              to send you your test results and will not be shared with third parties.
            </label>
          </div>
        </div>
        
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8 text-left">
          <div className="flex items-center mb-2">
            <Shield className="w-5 h-5 text-blue-600 mr-2" />
            <h4 className="font-semibold text-blue-800">Privacy Protected</h4>
          </div>
          <p className="text-blue-700 text-sm">
            Your email address is secure and will only be used to deliver your hearing test results. 
            We respect your privacy and will never spam you or share your information.
          </p>
        </div>
        
        <Button 
          onClick={handleSubmit}
          disabled={!email.trim() || !consent || isLoading}
          className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white px-12 py-3 text-lg rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none"
        >
          {isLoading ? "Submitting..." : "Get My Results"}
        </Button>
      </div>
    </div>
  );
};
