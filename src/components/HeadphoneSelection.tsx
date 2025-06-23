
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Headphones } from "lucide-react";

interface HeadphoneSelectionProps {
  onNext: (type: string) => void;
}

export const HeadphoneSelection = ({ onNext }: HeadphoneSelectionProps) => {
  const [selectedType, setSelectedType] = useState<string>("");

  const handleSelection = (type: string) => {
    setSelectedType(type);
    setTimeout(() => onNext(type), 300);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-3xl mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div 
            className="bg-lime-400 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: '30%' }}
          ></div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-12">Select your headphones</h1>
        
        <div className="flex justify-center space-x-8 mb-12">
          <button
            onClick={() => handleSelection("in-ear")}
            className={`p-8 border-2 rounded-xl transition-all duration-200 ${
              selectedType === "in-ear" 
                ? "border-orange-600 bg-orange-50" 
                : "border-orange-300 bg-orange-50 hover:border-orange-500"
            }`}
          >
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl">🎧</span>
            </div>
            <p className="text-lg font-semibold text-gray-800 italic">In-ear</p>
          </button>
          
          <button
            onClick={() => handleSelection("over-ear")}
            className={`p-8 border-2 rounded-xl transition-all duration-200 ${
              selectedType === "over-ear" 
                ? "border-orange-600 bg-orange-50" 
                : "border-orange-300 bg-orange-50 hover:border-orange-500"
            }`}
          >
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Headphones className="w-12 h-12 text-orange-600" />
            </div>
            <p className="text-lg font-semibold text-gray-800 italic">Over-ear</p>
          </button>
        </div>
        
        <div className="bg-gray-100 rounded-xl p-4 mb-8">
          <p className="text-gray-600">{selectedType === "in-ear" ? "In-ear headphones" : "Over-ear headphones"}</p>
        </div>
        
        <div className="space-y-4 text-gray-700">
          <p className="text-lg font-semibold">We recommend using over-ear headphones.</p>
          <p>Avoid using low quality and children's headphones.</p>
          <p className="italic mt-8">Headphones are needed to complete this hearing check.</p>
        </div>
      </div>
    </div>
  );
};
