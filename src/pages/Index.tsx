
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
    answers,
    headphoneType,
    connectionMethod,
    currentAudioTest,
    testResults,
    userEmail,
    resetTest,
    completeAudioTest,
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
  } = useHearingTestFlow();

  const handleStartTest = () => {
    setCurrentStep("howItWorks");
  };

  const handleContinue = () => {
    setCurrentStep("userInfo");
  };

  const handleEmailComplete = (email: string) => {
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
          <EmailCollection 
            onComplete={handleEmailComplete}
            userInfo={userInfo}
            answers={answers}
            testResults={testResults}
          />
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
            onRetakeTest={handleRetakeTest}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
