
import { Button } from "@/components/ui/button";
import { TestStep } from "@/hooks/useHearingTestFlow";

interface TopNavigationProps {
  currentStep: TestStep;
  onNavigate: (step: TestStep) => void;
}

const steps: { step: TestStep; label: string; number: number }[] = [
  { step: "landing", label: "Start", number: 1 },
  { step: "howItWorks", label: "How It Works", number: 2 },
  { step: "userInfo", label: "User Info", number: 3 },
  { step: "questionnaire", label: "Questions", number: 4 },
  { step: "quietPlace", label: "Quiet Place", number: 11 },
  { step: "headphoneSelection", label: "Headphones", number: 12 },
  { step: "connectionMethod", label: "Connection", number: 13 },
  { step: "volumeSetup", label: "Volume", number: 14 },
  { step: "audioTestSetup", label: "Test Setup", number: 15 },
  { step: "readyCheck", label: "Ready", number: 16 },
  { step: "hearingTestStart", label: "Test Start", number: 17 },
  { step: "audioTest", label: "Audio Test", number: 18 },
  { step: "results", label: "Results", number: 19 },
  { step: "aiResults", label: "AI Results", number: 20 }
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
              onClick={() => onNavigate(stepItem.step)}
              className={`whitespace-nowrap text-xs px-3 py-1 ${
                currentStep === stepItem.step 
                  ? "bg-orange-600 hover:bg-orange-700 text-white" 
                  : "text-gray-600 hover:text-gray-800"
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
