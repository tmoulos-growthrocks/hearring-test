
import { Button } from "@/components/ui/button";
import { TestStep } from "@/hooks/useHearingTestFlow";

interface TopNavigationProps {
  currentStep: TestStep;
  onNavigate: (step: TestStep) => void;
}

const steps: { step: TestStep; label: string; number: number; enabled: boolean }[] = [
  { step: "landing", label: "Start", number: 1, enabled: true },
  { step: "howItWorks", label: "How It Works", number: 2, enabled: true },
  { step: "userInfo", label: "User Info", number: 3, enabled: true },
  { step: "quietPlace", label: "Quiet Place", number: 11, enabled: true },
  { step: "hearingTestStart", label: "Test Start", number: 17, enabled: true },
  { step: "questionnaire", label: "Questions", number: 4, enabled: false },
  { step: "headphoneSelection", label: "Headphones", number: 12, enabled: false },
  { step: "connectionMethod", label: "Connection", number: 13, enabled: false },
  { step: "volumeSetup", label: "Volume", number: 14, enabled: false },
  { step: "audioTestSetup", label: "Test Setup", number: 15, enabled: false },
  { step: "readyCheck", label: "Ready", number: 16, enabled: false },
  { step: "audioTest", label: "Audio Test", number: 18, enabled: false },
  { step: "results", label: "Results", number: 19, enabled: false },
  { step: "emailCollection", label: "Email", number: 20, enabled: false }
];

export const TopNavigation = ({ currentStep, onNavigate }: TopNavigationProps) => {
  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center space-x-2 overflow-x-auto">
          {steps.map((stepItem) => (
            <Button
              key={stepItem.step}
              variant={currentStep === stepItem.step ? "default" : "outline"}
              size="sm"
              onClick={() => stepItem.enabled && onNavigate(stepItem.step)}
              disabled={!stepItem.enabled}
              className={`whitespace-nowrap text-xs px-3 py-1 ${
                currentStep === stepItem.step 
                  ? "bg-orange-600 hover:bg-orange-700 text-white" 
                  : stepItem.enabled
                  ? "text-gray-600 hover:text-gray-800"
                  : "text-gray-400 cursor-not-allowed opacity-50"
              }`}
            >
              {stepItem.number}. {stepItem.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
