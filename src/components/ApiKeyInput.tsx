
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface ApiKeyInputProps {
  onApiKeySet: (apiKey: string) => void;
}

export const ApiKeyInput = ({ onApiKeySet }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = () => {
    if (apiKey.trim()) {
      localStorage.setItem('openai_api_key', apiKey.trim());
      onApiKeySet(apiKey.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
        <div className="w-16 h-1 bg-lime-400 rounded-full mx-auto mb-8"></div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          AI-Powered Results
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          To generate personalized hearing test results using AI, please enter your OpenAI API key.
        </p>
        
        <div className="relative mb-6">
          <input
            type={showKey ? "text" : "password"}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your OpenAI API key (sk-proj-...)"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-full text-lg focus:outline-none focus:border-orange-500"
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        
        <div className="text-left bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
          <h4 className="font-semibold text-blue-800 mb-2">Privacy Notice</h4>
          <p className="text-blue-700 text-sm">
            Your API key is stored locally in your browser and is only used to generate your personalized results. 
            It is not sent to our servers. You can get an API key from OpenAI's platform.
          </p>
        </div>
        
        <Button 
          onClick={handleSubmit}
          disabled={!apiKey.trim()}
          className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white px-12 py-3 text-lg rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none"
        >
          Generate AI Results
        </Button>
      </div>
    </div>
  );
};
