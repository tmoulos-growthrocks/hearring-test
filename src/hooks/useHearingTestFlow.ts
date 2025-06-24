
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
  | "emailCollection";

export const useHearingTestFlow = () => {
  const [currentStep, setCurrentStep] = useState<TestStep>("landing");
  const [userInfo, setUserInfo] = useState({ gender: "", ageCategory: "" });
  const [answers, setAnswers] = useState<string[]>([]);
  const [headphoneType, setHeadphoneType] = useState("");
  const [connectionMethod, setConnectionMethod] = useState("");
  const [currentAudioTest, setCurrentAudioTest] = useState(1);
  const [testResults, setTestResults] = useState({ leftEar: 0, rightEar: 0 });
  const [userEmail, setUserEmail] = useState("");

  const resetTest = () => {
    setCurrentStep("landing");
    setCurrentAudioTest(1);
    setTestResults({ leftEar: 0, rightEar: 0 });
    setUserInfo({ gender: "", ageCategory: "" });
    setAnswers([]);
    setHeadphoneType("");
    setConnectionMethod("");
    setUserEmail("");
  };

  const completeAudioTest = () => {
    const leftEarScore = Math.floor(Math.random() * 21);
    const rightEarScore = Math.floor(Math.random() * 21);
    setTestResults({ leftEar: leftEarScore, rightEar: rightEarScore });
    setCurrentStep("results");
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
    userEmail,
    setUserEmail,
    resetTest,
    completeAudioTest,
  };
};
