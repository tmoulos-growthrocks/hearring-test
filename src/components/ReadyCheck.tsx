
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface ReadyCheckProps {
  onNext: () => void;
  stepNumber: number;
}

export const ReadyCheck = ({ onNext, stepNumber }: ReadyCheckProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          Step {stepNumber}
        </span>
      </div>
      
      <div className="max-w-3xl mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div 
            className="bg-lime-400 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: '70%' }}
          ></div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-12">Are you ready to start your hearing check?</h1>
        
        <div className="space-y-8 mb-12">
          <div className="flex items-center justify-center space-x-4">
            <Check className="w-6 h-6 text-green-600" />
            <p className="text-xl text-gray-700">My headphones are connected.</p>
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <Check className="w-6 h-6 text-green-600" />
            <p className="text-xl text-gray-700">My device volume is set to 100%.</p>
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <Check className="w-6 h-6 text-green-600" />
            <p className="text-xl text-gray-700">I'm in a quiet place.</p>
          </div>
        </div>
        
        <Button 
          onClick={onNext}
          className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-4 text-xl rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          Start hearing check!
        </Button>
      </div>
    </div>
  );
};
