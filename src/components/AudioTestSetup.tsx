
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface AudioTestSetupProps {
  onNext: () => void;
  stepNumber: number;
}

export const AudioTestSetup = ({ onNext, stepNumber }: AudioTestSetupProps) => {
  const [audioPlayed, setAudioPlayed] = useState(false);

  const playAudio = () => {
    setAudioPlayed(true);
    // In a real implementation, you would play an actual audio file here
    console.log("Playing audio test...");
  };

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
            style={{ width: '60%' }}
          ></div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Put on your headphones and test your setup</h1>
        
        <p className="text-xl text-gray-600 mb-12">Now let's test your setup.</p>
        
        <div className="space-y-6 mb-12">
          <div className="flex items-center justify-center space-x-4">
            <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-semibold">1</span>
            <p className="text-lg text-gray-700">Plug in your headphones</p>
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-semibold">2</span>
            <p className="text-lg text-gray-700">Click the button</p>
          </div>
        </div>
        
        <Button 
          onClick={playAudio}
          className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 mb-12"
        >
          <Play className="w-5 h-5 mr-2" />
          Play Audio
        </Button>
        
        <div className="text-sm text-gray-600 italic">
          <p>Please see a healthcare provider if you have recently noticed a sudden change in hearing, ear pain, and/or discharge.</p>
          <p className="mt-2">Please stop the screener if you experience discomfort (e.g. dizziness, uncomfortably loud sounds).</p>
        </div>
        
        {audioPlayed && (
          <Button 
            onClick={onNext}
            className="mt-8 bg-orange-600 hover:bg-orange-700 text-white px-12 py-3 text-lg rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};
