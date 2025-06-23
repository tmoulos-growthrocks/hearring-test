
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { TestStep } from "@/hooks/useHearingTestFlow";

interface AppSidebarProps {
  currentStep: TestStep;
  onNavigate: (step: TestStep) => void;
}

const steps: { step: TestStep; label: string; number: number; enabled: boolean }[] = [
  { step: "landing", label: "Start", number: 1, enabled: true },
  { step: "userInfo", label: "User Info", number: 3, enabled: true },
  { step: "quietPlace", label: "Quiet Place", number: 11, enabled: true },
  { step: "hearingTestStart", label: "Test Start", number: 17, enabled: true }
];

export function AppSidebar({ currentStep, onNavigate }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Hearing Test Steps</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {steps.map((stepItem) => (
                <SidebarMenuItem key={stepItem.step}>
                  <SidebarMenuButton
                    onClick={() => stepItem.enabled && onNavigate(stepItem.step)}
                    isActive={currentStep === stepItem.step}
                    disabled={!stepItem.enabled}
                    className={`w-full justify-start ${
                      currentStep === stepItem.step 
                        ? "bg-orange-600 hover:bg-orange-700 text-white" 
                        : stepItem.enabled
                        ? "text-gray-600 hover:text-gray-800"
                        : "text-gray-400 cursor-not-allowed opacity-50"
                    }`}
                  >
                    <span className="font-medium">{stepItem.number}.</span>
                    <span>{stepItem.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
