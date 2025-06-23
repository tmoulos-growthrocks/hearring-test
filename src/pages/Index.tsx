import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Headphones, ClipboardList, Volume2, BarChart3 } from "lucide-react";
import { UserInfoForm } from "@/components/UserInfoForm";
import { QuestionnairePage } from "@/components/QuestionnairePage";
import { QuietPlaceCheck } from "@/components/QuietPlaceCheck";
import { HeadphoneSelection } from "@/components/HeadphoneSelection";
import { ConnectionMethod } from "@/components/ConnectionMethod";
import { VolumeSetup } from "@/components/VolumeSetup";
import { AudioTestSetup } from "@/components/AudioTestSetup";
import { ReadyCheck } from "@/components/ReadyCheck";
import { HearingTestStart } from "@/components/HearingTestStart";
import { AudioTest } from "@/components/AudioTest";

const Index = () => {
  const [currentStep, setCurrentStep] = useState("landing");
  const [userInfo, setUserInfo] = useState({ gender: "", ageCategory: "" });
  const [headphoneType, setHeadphoneType] = useState("");
  const [connectionMethod, setConnectionMethod] = useState("");
  const [currentAudioTest, setCurrentAudioTest] = useState(1);

  const audioTests = [
    {
      instruction: "Click the +/- buttons to reach the LOUDEST level you can listen to without discomfort (e.g. you could listen to it for 15 minutes).",
    },
    {
      instruction: "Click the +/- buttons until the person is speaking just loud enough to understand.",
    },
    {
      instruction: "Click the +/- buttons until you can barely hear the sound.",
    }
  ];

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

  const handleQuestionnaireComplete = () => {
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
    if (currentAudioTest < audioTests.length) {
      setCurrentAudioTest(currentAudioTest + 1);
    } else {
      setCurrentStep("questionnaire"); // Complete the flow - would go to results
    }
  };

  if (currentStep === "audioTest") {
    return (
      <AudioTest
        testNumber={currentAudioTest}
        totalTests={audioTests.length}
        instruction={audioTests[currentAudioTest - 1].instruction}
        onNext={handleAudioTestNext}
      />
    );
  }

  if (currentStep === "hearingTestStart") {
    return <HearingTestStart onNext={handleHearingTestStartNext} />;
  }

  if (currentStep === "readyCheck") {
    return <ReadyCheck onNext={handleReadyCheckNext} />;
  }

  if (currentStep === "audioTestSetup") {
    return <AudioTestSetup onNext={handleAudioTestSetupNext} />;
  }

  if (currentStep === "volumeSetup") {
    return <VolumeSetup onNext={handleVolumeSetupNext} />;
  }

  if (currentStep === "connectionMethod") {
    return <ConnectionMethod onNext={handleConnectionMethod} />;
  }

  if (currentStep === "headphoneSelection") {
    return <HeadphoneSelection onNext={handleHeadphoneSelection} />;
  }

  if (currentStep === "quietPlace") {
    return <QuietPlaceCheck onNext={handleQuietPlaceNext} />;
  }

  if (currentStep === "questionnaire") {
    return <QuestionnairePage userInfo={userInfo} onComplete={handleQuestionnaireComplete} />;
  }

  if (currentStep === "userInfo") {
    return <UserInfoForm onComplete={handleUserInfoComplete} />;
  }

  if (currentStep === "howItWorks") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
          <div className="w-16 h-1 bg-lime-400 rounded-full mx-auto mb-8"></div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-12">How it Works</h1>
          
          <div className="space-y-8 mb-12">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <ClipboardList className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Answer a few questions.</h3>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Volume2 className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Check your hearing with your <strong>headphones</strong>.*</h3>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">See your hearing results!</h3>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleContinue}
            className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-3 text-lg rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Continue
          </Button>
          
          <p className="text-sm text-gray-600 mt-8 italic">
            *SHOEBOX Online is not a diagnostic hearing test or medical assessment. It is designed to give you general information about your hearing.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          Check your hearing in less than 5 minutes!
        </h1>
        
        <p className="text-xl text-gray-600 mb-12">
          You will need a pair of headphones
        </p>
        
        <div className="relative mb-12">
          <div className="w-64 h-64 md:w-80 md:h-80 mx-auto mb-8 opacity-20">
            <Headphones className="w-full h-full text-gray-400" />
          </div>
        </div>
        
        <p className="text-gray-600 mb-8">
          By proceeding, you agree to the terms of our{" "}
          <a href="#" className="text-orange-600 underline font-medium">
            Privacy Statement
          </a>
          .
        </p>
        
        <Button 
          onClick={handleStartTest}
          className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-4 text-xl rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          Check My Hearing!
        </Button>
      </div>
    </div>
  );
};

export default Index;
