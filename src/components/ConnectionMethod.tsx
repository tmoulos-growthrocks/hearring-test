
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Headphones, Wifi } from "lucide-react";

interface ConnectionMethodProps {
  onNext: (method: string) => void;
  stepNumber: number;
}

export const ConnectionMethod = ({ onNext, stepNumber }: ConnectionMethodProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  const handleSelection = (method: string) => {
    setSelectedMethod(method);
    setTimeout(() => onNext(method), 300);
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
            style={{ width: '40%' }}
          ></div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-12">How are you connecting your headphones?</h1>
        
        <div className="flex justify-center space-x-8 mb-12">
          <button
            onClick={() => handleSelection("wired")}
            className={`p-8 border-2 rounded-xl transition-all duration-200 ${
              selectedMethod === "wired" 
                ? "border-orange-600 bg-orange-50" 
                : "border-orange-300 bg-orange-50 hover:border-orange-500"
            }`}
          >
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Headphones className="w-12 h-12 text-orange-600" />
            </div>
            <p className="text-lg font-semibold text-gray-800">By wire</p>
          </button>
          
          <button
            onClick={() => handleSelection("wireless")}
            className={`p-8 border-2 rounded-xl transition-all duration-200 ${
              selectedMethod === "wireless" 
                ? "border-orange-600 bg-orange-50" 
                : "border-orange-300 bg-orange-50 hover:border-orange-500"
            }`}
          >
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <div className="relative">
                <Headphones className="w-12 h-12 text-orange-600" />
                <Wifi className="w-6 h-6 text-orange-600 absolute -top-1 -right-1" />
              </div>
            </div>
            <p className="text-lg font-semibold text-gray-800">Wirelessly</p>
          </button>
        </div>
        
        <p className="text-gray-600 text-lg">
          Please select whether you're going to connect your<br />
          headphones by wire or wirelessly.
        </p>
      </div>
    </div>
  );
};
