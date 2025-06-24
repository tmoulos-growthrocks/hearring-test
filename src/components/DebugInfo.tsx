
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TestStep } from "@/hooks/useHearingTestFlow";

interface DebugInfoProps {
  currentStep: TestStep;
  userInfo: { gender: string; ageCategory: string };
  answers: string[];
  headphoneType: string;
  connectionMethod: string;
  currentAudioTest: number;
  testResults: { leftEar: number; rightEar: number };
  userEmail: string;
  userFirstName: string;
  userLastName: string;
}

export const DebugInfo = ({
  currentStep,
  userInfo,
  answers,
  headphoneType,
  connectionMethod,
  currentAudioTest,
  testResults,
  userEmail,
  userFirstName,
  userLastName,
}: DebugInfoProps) => {
  return (
    <Card className="fixed bottom-4 right-4 w-80 max-h-96 overflow-y-auto bg-white shadow-lg border-2 border-blue-200 z-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-bold text-blue-800 flex items-center gap-2">
          🐛 Debug Info
          <Badge variant="outline" className="text-xs">
            Step: {currentStep}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-xs">
        <div className="bg-green-50 p-2 rounded border">
          <h4 className="font-semibold text-green-800 mb-1">User Identity</h4>
          <div className="space-y-1">
            <div><strong>First Name:</strong> {userFirstName || "Not set"}</div>
            <div><strong>Last Name:</strong> {userLastName || "Not set"}</div>
            <div><strong>Email:</strong> {userEmail || "Not collected"}</div>
          </div>
        </div>

        <div className="bg-blue-50 p-2 rounded border">
          <h4 className="font-semibold text-blue-800 mb-1">User Info</h4>
          <div className="space-y-1">
            <div><strong>Gender:</strong> {userInfo.gender || "Not selected"}</div>
            <div><strong>Age:</strong> {userInfo.ageCategory || "Not selected"}</div>
          </div>
        </div>

        <div className="bg-purple-50 p-2 rounded border">
          <h4 className="font-semibold text-purple-800 mb-1">Equipment Setup</h4>
          <div className="space-y-1">
            <div><strong>Headphones:</strong> {headphoneType || "Not selected"}</div>
            <div><strong>Connection:</strong> {connectionMethod || "Not selected"}</div>
          </div>
        </div>

        <div className="bg-orange-50 p-2 rounded border">
          <h4 className="font-semibold text-orange-800 mb-1">Test Progress</h4>
          <div className="space-y-1">
            <div><strong>Current Audio Test:</strong> {currentAudioTest}/3</div>
            <div><strong>Left Ear Score:</strong> {testResults.leftEar}</div>
            <div><strong>Right Ear Score:</strong> {testResults.rightEar}</div>
          </div>
        </div>

        {answers.length > 0 && (
          <div className="bg-yellow-50 p-2 rounded border">
            <h4 className="font-semibold text-yellow-800 mb-1">Questionnaire ({answers.length} answers)</h4>
            <div className="max-h-20 overflow-y-auto space-y-1">
              {answers.map((answer, index) => (
                <div key={index} className="text-xs">
                  <strong>Q{index + 1}:</strong> {answer}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gray-50 p-2 rounded border">
          <h4 className="font-semibold text-gray-800 mb-1">Flow Status</h4>
          <div className="text-xs">
            <strong>Current Step:</strong> {currentStep}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
