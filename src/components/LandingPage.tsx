
import { Button } from "@/components/ui/button";
import { Headphones } from "lucide-react";

interface LandingPageProps {
  onStartTest: () => void;
}

export const LandingPage = ({ onStartTest }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          Step 1
        </span>
      </div>
      
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Check your hearing in less than 5 minutes!
        </h1>
        
        <p className="text-lg text-gray-600 mb-12">
          You will need a pair of headphones
        </p>
        
        <div className="relative mb-12">
          <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-8 opacity-20">
            <Headphones className="w-full h-full text-gray-400" />
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-8">
          By proceeding, you agree to the terms of our{" "}
          <a href="#" className="text-orange-600 underline font-medium">
            Privacy Statement
          </a>
          .
        </p>
        
        <Button 
          onClick={onStartTest}
          className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-4 text-xl rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          Check My Hearing!
        </Button>
      </div>
    </div>
  );
};
