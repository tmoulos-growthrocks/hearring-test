
import { Button } from "@/components/ui/button";

interface HearingTestStartProps {
  onNext: () => void;
  stepNumber: number;
}

export const HearingTestStart = ({ onNext, stepNumber }: HearingTestStartProps) => {
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
            style={{ width: '80%' }}
          ></div>
        </div>
        
        <div className="mb-8">
          <span className="inline-block bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-semibold tracking-wider">
            HEARING CHECK
          </span>
        </div>
        
        <div className="w-24 h-24 mx-auto mb-8 bg-orange-50 rounded-full flex items-center justify-center">
          <span className="text-4xl">👂</span>
        </div>
        
        <p className="text-sm text-gray-500 mb-2">Check your right ear</p>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          This hearing check works by checking one ear at a time.<br />
          We're going to start with your <strong>right ear</strong>.
        </h1>
        
        <Button 
          onClick={onNext}
          className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-4 text-xl rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          I'm ready!
        </Button>
      </div>
    </div>
  );
};
