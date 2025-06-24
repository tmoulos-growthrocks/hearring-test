
import { LandingPage } from "@/components/LandingPage";
import { HowItWorks } from "@/components/HowItWorks";
import { TestFlowManager } from "@/components/TestFlowManager";
import { TopNavigation } from "@/components/TopNavigation";
import { EmailCollection } from "@/components/EmailCollection";
import { ComprehensiveResults } from "@/components/ComprehensiveResults";
import { useHearingTestFlow, TestStep } from "@/hooks/useHearingTestFlow";

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
    userEmail,
    setUserEmail,
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

  const handleResultsContinue = () => {
    setCurrentStep("emailCollection");
  };

  const handleEmailComplete = (email: string) => {
    setUserEmail(email);
    setCurrentStep("comprehensiveResults");
  };

  const handleNavigate = (step: TestStep) => {
    setCurrentStep(step);
  };

  return (
    <div className="min-h-screen">
      <TopNavigation currentStep={currentStep} onNavigate={handleNavigate} />
      
      <div className="pt-0">
        {currentStep === "landing" && (
          <LandingPage onStartTest={handleStartTest} />
        )}

        {currentStep === "howItWorks" && (
          <HowItWorks onContinue={handleContinue} />
        )}

        {currentStep === "emailCollection" && (
          <EmailCollection onComplete={handleEmailComplete} />
        )}

        {currentStep === "comprehensiveResults" && (
          <ComprehensiveResults
            userInfo={userInfo}
            answers={answers}
            leftEarScore={testResults.leftEar}
            rightEarScore={testResults.rightEar}
            userEmail={userEmail}
            onRetakeTest={resetTest}
          />
        )}

        {currentStep !== "landing" && 
         currentStep !== "howItWorks" && 
         currentStep !== "emailCollection" && 
         currentStep !== "comprehensiveResults" && (
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
            onResultsContinue={handleResultsContinue}
            onRetakeTest={resetTest}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
