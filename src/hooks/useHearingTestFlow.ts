
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export type TestStep = 
  | "landing"
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
  | "comprehensiveResults";

export const useHearingTestFlow = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<TestStep>("landing");
  const [userInfo, setUserInfo] = useState<{ gender: string; ageCategory: string }>({ gender: "", ageCategory: "" });
  const [answers, setAnswers] = useState<string[]>([]);
  const [headphoneType, setHeadphoneType] = useState("");
  const [connectionMethod, setConnectionMethod] = useState("");
  const [currentAudioTest, setCurrentAudioTest] = useState(1);
  const [testResults, setTestResults] = useState({ leftEar: 0, rightEar: 0 });
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  
  // Capture user's first and last name from navigation state
  const [userFirstName, setUserFirstName] = useState<string>("");
  const [userLastName, setUserLastName] = useState<string>("");

  useEffect(() => {
    // Check if we received user data from the incoming data page
    if (location.state?.userFirstName && location.state?.userLastName) {
      setUserFirstName(location.state.userFirstName);
      setUserLastName(location.state.userLastName);
      console.log('Captured user name from incoming data:', {
        firstName: location.state.userFirstName,
        lastName: location.state.userLastName
      });
    }
  }, [location.state]);

  const handleUserInfoComplete = (info: { gender: string; ageCategory: string }) => {
    setUserInfo(info);
    setCurrentStep("questionnaire");
  };

  const handleQuestionnaireComplete = (questionnaireAnswers: string[]) => {
    setAnswers(questionnaireAnswers);
    setCurrentStep("quietPlace");
  };

  const handleQuietPlaceNext = () => setCurrentStep("headphoneSelection");
  const handleHeadphoneSelection = (type: string) => {
    setHeadphoneType(type);
    setCurrentStep("connectionMethod");
  };
  const handleConnectionMethod = (method: string) => {
    setConnectionMethod(method);
    setCurrentStep("volumeSetup");
  };
  const handleVolumeSetupNext = () => setCurrentStep("audioTestSetup");
  const handleAudioTestSetupNext = () => setCurrentStep("readyCheck");
  const handleReadyCheckNext = () => setCurrentStep("hearingTestStart");
  const handleHearingTestStartNext = () => setCurrentStep("audioTest");

  const handleAudioTestNext = () => {
    if (currentAudioTest < 3) {
      setCurrentAudioTest(currentAudioTest + 1);
    } else {
      setCurrentStep("results");
    }
  };

  const handleResultsContinue = () => {
    setCurrentStep("comprehensiveResults");
  };

  const handleRetakeTest = () => {
    setCurrentStep("userInfo");
    setAnswers([]);
    setCurrentAudioTest(1);
    setTestResults({ leftEar: 0, rightEar: 0 });
    setEmail("");
    setConsent(false);
  };

  const handleDetailedResultsSubmit = async (emailInput: string, consentInput: boolean, leftEarScore: number, rightEarScore: number) => {
    setEmail(emailInput);
    setConsent(consentInput);
    setTestResults({ leftEar: leftEarScore, rightEar: rightEarScore });

    console.log("Submitting detailed results with captured user data:", {
      email: emailInput,
      consent: consentInput,
      userInfo,
      answers,
      testResults: { leftEar: leftEarScore, rightEar: rightEarScore },
      userFirstName,
      userLastName
    });

    const averageScore = Math.round((leftEarScore + rightEarScore) / 2);

    const payload = {
      email: emailInput,
      consent: consentInput,
      timestamp: new Date().toISOString(),
      source: "hearing_test_app",
      userInfo: userInfo,
      questionnaireAnswers: answers,
      testResults: {
        leftEarScore: leftEarScore,
        rightEarScore: rightEarScore,
        averageScore: averageScore
      },
      // Include the captured first and last name in the webhook payload
      firstName: userFirstName,
      lastName: userLastName
    };

    console.log("Webhook triggered with detailed results:", payload);

    try {
      // Send to Zapier webhook
      const response = await fetch("https://hooks.zapier.com/hooks/catch/447525/ubyp1bq/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast({
          title: "Results Submitted",
          description: "Your hearing test results have been submitted successfully.",
        });
      } else {
        throw new Error("Failed to submit results");
      }
    } catch (error) {
      console.error("Error submitting results:", error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your results. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    currentStep,
    userInfo,
    answers,
    headphoneType,
    connectionMethod,
    currentAudioTest,
    testResults,
    email,
    consent,
    userFirstName,
    userLastName,
    setCurrentStep,
    handleUserInfoComplete,
    handleQuestionnaireComplete,
    handleQuietPlaceNext,
    handleHeadphoneSelection,
    handleConnectionMethod,
    handleVolumeSetupNext,
    handleAudioTestSetupNext,
    handleReadyCheckNext,
    handleHearingTestStartNext,
    handleAudioTestNext,
    handleResultsContinue,
    handleRetakeTest,
    handleDetailedResultsSubmit,
  };
};
