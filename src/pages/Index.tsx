
import { LandingPage } from "@/components/LandingPage";
import { HowItWorks } from "@/components/HowItWorks";
import { TestFlowManager } from "@/components/TestFlowManager";
import { TopNavigation } from "@/components/TopNavigation";
import { EmailCollection } from "@/components/EmailCollection";
import { ComprehensiveResults } from "@/components/ComprehensiveResults";
import { DebugInfo } from "@/components/DebugInfo";
import { MetaData } from "@/components/MetaData";
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
    userFirstName,
    userLastName,
    setUserEmail,
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
    setUserEmail(email);
    setCurrentStep("comprehensiveResults");
  };

  const handleNavigate = (step: TestStep) => {
    setCurrentStep(step);
  };

  // Dynamic metadata based on current step
  const getStepMetadata = () => {
    switch (currentStep) {
      case "landing":
        return {
          title: "Hearing Test App - Professional Online Hearing Assessment",
          description: "Take a comprehensive online hearing test from the comfort of your home. Professional-grade hearing assessment with detailed results and recommendations.",
          ogUrl: window.location.href,
          canonical: window.location.href
        };
      case "howItWorks":
        return {
          title: "How It Works - Hearing Test App",
          description: "Learn how our professional online hearing test works. Step-by-step guide to getting accurate hearing assessment results.",
          ogUrl: window.location.href,
          canonical: window.location.href
        };
      case "userInfo":
        return {
          title: "User Information - Hearing Test App",
          description: "Provide your information to personalize your hearing test experience and get more accurate results.",
          ogUrl: window.location.href,
          canonical: window.location.href
        };
      case "comprehensiveResults":
        return {
          title: "Your Hearing Test Results - Hearing Test App",
          description: "View your comprehensive hearing test results with detailed analysis and professional recommendations.",
          ogUrl: window.location.href,
          canonical: window.location.href
        };
      default:
        return {
          title: "Hearing Test in Progress - Hearing Test App",
          description: "Complete your professional hearing assessment to get personalized results and recommendations.",
          ogUrl: window.location.href,
          canonical: window.location.href
        };
    }
  };

  const stepMetadata = getStepMetadata();

  return (
    <div className="min-h-screen">
      <MetaData {...stepMetadata} />
      
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
            userFirstName={userFirstName}
            userLastName={userLastName}
          />
        )}

        {currentStep === "comprehensiveResults" && (
          <ComprehensiveResults
            userInfo={userInfo}
            answers={answers}
            leftEarScore={testResults.leftEar}
            rightEarScore={testResults.rightEar}
            userEmail={userEmail}
            onRetakeTest={handleRetakeTest}
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

      {/* Debug Info Component - Always visible */}
      <DebugInfo
        currentStep={currentStep}
        userInfo={userInfo}
        answers={answers}
        headphoneType={headphoneType}
        connectionMethod={connectionMethod}
        currentAudioTest={currentAudioTest}
        testResults={testResults}
        userEmail={userEmail}
        userFirstName={userFirstName}
        userLastName={userLastName}
      />
    </div>
  );
};

export default Index;
