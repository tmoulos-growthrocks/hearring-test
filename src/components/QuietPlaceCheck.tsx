
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Armchair } from "lucide-react";

interface QuietPlaceCheckProps {
  onNext: () => void;
  stepNumber: number;
}

export const QuietPlaceCheck = ({ onNext, stepNumber }: QuietPlaceCheckProps) => {
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
            style={{ width: '20%' }}
          ></div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Find a quiet place</h1>
        
        <p className="text-xl text-gray-600 mb-12 leading-relaxed">
          Background noise—people talking, street traffic, or loud fans—<br />
          can affect results.
        </p>
        
        <div className="w-32 h-32 mx-auto mb-12 bg-orange-50 rounded-full flex items-center justify-center">
          <Armchair className="w-16 h-16 text-orange-600" />
        </div>
        
        <Button 
          onClick={onNext}
          className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-4 text-xl rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          I'm in a quiet place!
        </Button>
      </div>
    </div>
  );
};
