
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
import { ResultsPage } from "@/components/ResultsPage";
import { useHearingTestFlow, TestStep } from "@/hooks/useHearingTestFlow";

interface TestFlowManagerProps {
  currentStep: TestStep;
  userInfo: { gender: string; ageCategory: string };
  answers: string[];
  headphoneType: string;
  connectionMethod: string;
  currentAudioTest: number;
  testResults: { leftEar: number; rightEar: number };
  onUserInfoComplete: (info: { gender: string; ageCategory: string }) => void;
  onQuestionnaireComplete: (answers: string[]) => void;
  onQuietPlaceNext: () => void;
  onHeadphoneSelection: (type: string) => void;
  onConnectionMethod: (method: string) => void;
  onVolumeSetupNext: () => void;
  onAudioTestSetupNext: () => void;
  onReadyCheckNext: () => void;
  onHearingTestStartNext: () => void;
  onAudioTestNext: () => void;
  onResultsContinue: () => void;
  onRetakeTest: () => void;
}

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

export const TestFlowManager = ({
  currentStep,
  userInfo,
  answers,
  headphoneType,
  connectionMethod,
  currentAudioTest,
  testResults,
  onUserInfoComplete,
  onQuestionnaireComplete,
  onQuietPlaceNext,
  onHeadphoneSelection,
  onConnectionMethod,
  onVolumeSetupNext,
  onAudioTestSetupNext,
  onReadyCheckNext,
  onHearingTestStartNext,
  onAudioTestNext,
  onResultsContinue,
  onRetakeTest,
}: TestFlowManagerProps) => {
  switch (currentStep) {
    case "userInfo":
      return <UserInfoForm onComplete={onUserInfoComplete} stepNumber={3} />;
    
    case "questionnaire":
      return <QuestionnairePage userInfo={userInfo} onComplete={onQuestionnaireComplete} stepNumber={4} />;
    
    case "quietPlace":
      return <QuietPlaceCheck onNext={onQuietPlaceNext} stepNumber={11} />;
    
    case "headphoneSelection":
      return <HeadphoneSelection onNext={onHeadphoneSelection} stepNumber={12} />;
    
    case "connectionMethod":
      return <ConnectionMethod onNext={onConnectionMethod} stepNumber={13} />;
    
    case "volumeSetup":
      return <VolumeSetup onNext={onVolumeSetupNext} stepNumber={14} />;
    
    case "audioTestSetup":
      return <AudioTestSetup onNext={onAudioTestSetupNext} stepNumber={15} />;
    
    case "readyCheck":
      return <ReadyCheck onNext={onReadyCheckNext} stepNumber={16} />;
    
    case "hearingTestStart":
      return <HearingTestStart onNext={onHearingTestStartNext} stepNumber={17} />;
    
    case "audioTest":
      return (
        <AudioTest
          testNumber={currentAudioTest}
          totalTests={audioTests.length}
          instruction={audioTests[currentAudioTest - 1].instruction}
          onNext={onAudioTestNext}
          stepNumber={17 + currentAudioTest}
        />
      );
    
    case "results":
      return (
        <ResultsPage
          userInfo={userInfo}
          answers={answers}
          onContinue={onResultsContinue}
        />
      );
    
    default:
      return null;
  }
};
