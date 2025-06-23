
import { useState } from "react";

export type TestStep = 
  | "landing" 
  | "howItWorks" 
  | "userInfo" 
  | "questionnaire" 
  | "quietPlace" 
  | "headphoneSelection" 
  | "connectionMethod" 
  | "volumeSetup" 
  | "audioTestSetup" 
  | "readyCheck" 
  | "hearingTestStart" 
  | "audioTest" 
  | "results" 
  | "apiKeyInput" 
  | "aiResults";

export const useHearingTestFlow = () => {
  const [currentStep, setCurrentStep] = useState<TestStep>("landing");
  const [userInfo, setUserInfo] = useState({ gender: "", ageCategory: "" });
  const [answers, setAnswers] = useState<string[]>([]);
  const [headphoneType, setHeadphoneType] = useState("");
  const [connectionMethod, setConnectionMethod] = useState("");
  const [currentAudioTest, setCurrentAudioTest] = useState(1);
  const [testResults, setTestResults] = useState({ leftEar: 0, rightEar: 0 });
  const [apiKey, setApiKey] = useState<string | null>(null);

  const resetTest = () => {
    setCurrentStep("landing");
    setCurrentAudioTest(1);
    setTestResults({ leftEar: 0, rightEar: 0 });
    setUserInfo({ gender: "", ageCategory: "" });
    setAnswers([]);
    setHeadphoneType("");
    setConnectionMethod("");
    setApiKey(null);
  };

  const completeAudioTest = () => {
    const leftEarScore = Math.floor(Math.random() * 21);
    const rightEarScore = Math.floor(Math.random() * 21);
    setTestResults({ leftEar: leftEarScore, rightEar: rightEarScore });
    
    const storedApiKey = localStorage.getItem('openai_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setCurrentStep("aiResults");
    } else {
      setCurrentStep("apiKeyInput");
    }
  };

  return {
    currentStep,
    setCurrentStep,
    userInfo,
    setUserInfo,
    answers,
    setAnswers,
    headphoneType,
    setHeadphoneType,
    connectionMethod,
    setConnectionMethod,
    currentAudioTest,
    setCurrentAudioTest,
    testResults,
    setTestResults,
    apiKey,
    setApiKey,
    resetTest,
    completeAudioTest,
  };
};
