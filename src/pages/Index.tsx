
import { LandingPage } from "@/components/LandingPage";
import { HowItWorks } from "@/components/HowItWorks";
import { TestFlowManager } from "@/components/TestFlowManager";
import { useHearingTestFlow } from "@/hooks/useHearingTestFlow";

const Index = () => {
  const {
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
    apiKey,
    setApiKey,
    resetTest,
    completeAudioTest,
  } = useHearingTestFlow();

  const handleStartTest = () => {
    setCurrentStep("howItWorks");
  };

  const handleContinue = () => {
    setCurrentStep("userInfo");
  };

  const handleUserInfoComplete = (info: { gender: string; ageCategory: string }) => {
    setUserInfo(info);
    setCurrentStep("questionnaire");
  };

  const handleQuestionnaireComplete = (questionnaireAnswers: string[]) => {
    setAnswers(questionnaireAnswers);
    setCurrentStep("quietPlace");
  };

  const handleQuietPlaceNext = () => {
    setCurrentStep("headphoneSelection");
  };

  const handleHeadphoneSelection = (type: string) => {
    setHeadphoneType(type);
    setCurrentStep("connectionMethod");
  };

  const handleConnectionMethod = (method: string) => {
    setConnectionMethod(method);
    setCurrentStep("volumeSetup");
  };

  const handleVolumeSetupNext = () => {
    setCurrentStep("audioTestSetup");
  };

  const handleAudioTestSetupNext = () => {
    setCurrentStep("readyCheck");
  };

  const handleReadyCheckNext = () => {
    setCurrentStep("hearingTestStart");
  };

  const handleHearingTestStartNext = () => {
    setCurrentStep("audioTest");
  };

  const handleAudioTestNext = () => {
    if (currentAudioTest < 3) {
      setCurrentAudioTest(currentAudioTest + 1);
    } else {
      completeAudioTest();
    }
  };

  const handleApiKeySet = (key: string) => {
    setApiKey(key);
    setCurrentStep("aiResults");
  };

  if (currentStep === "landing") {
    return <LandingPage onStartTest={handleStartTest} />;
  }

  if (currentStep === "howItWorks") {
    return <HowItWorks onContinue={handleContinue} />;
  }

  return (
    <TestFlowManager
      currentStep={currentStep}
      userInfo={userInfo}
      answers={answers}
      headphoneType={headphoneType}
      connectionMethod={connectionMethod}
      currentAudioTest={currentAudioTest}
      testResults={testResults}
      onUserInfoComplete={handleUserInfoComplete}
      onQuestionnaireComplete={handleQuestionnaireComplete}
      onQuietPlaceNext={handleQuietPlaceNext}
      onHeadphoneSelection={handleHeadphoneSelection}
      onConnectionMethod={handleConnectionMethod}
      onVolumeSetupNext={handleVolumeSetupNext}
      onAudioTestSetupNext={handleAudioTestSetupNext}
      onReadyCheckNext={handleReadyCheckNext}
      onHearingTestStartNext={handleHearingTestStartNext}
      onAudioTestNext={handleAudioTestNext}
      onApiKeySet={handleApiKeySet}
      onRetakeTest={resetTest}
    />
  );
};

export default Index;
