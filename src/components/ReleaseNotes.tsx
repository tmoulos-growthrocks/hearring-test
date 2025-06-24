
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Clock, Bug, Plus, Zap } from "lucide-react";

interface ReleaseNote {
  version: string;
  date: string;
  type: 'major' | 'minor' | 'patch';
  changes: {
    type: 'feature' | 'bugfix' | 'improvement';
    description: string;
  }[];
}

const releaseNotes: ReleaseNote[] = [
  {
    version: "1.2.0",
    date: "2024-06-24",
    type: "minor",
    changes: [
      { type: "feature", description: "Added comprehensive debug information panel" },
      { type: "feature", description: "Added user name collection in test flow" },
      { type: "bugfix", description: "Fixed email not displaying in comprehensive results" },
      { type: "improvement", description: "Enhanced webhook payload with user names" }
    ]
  },
  {
    version: "1.1.0",
    date: "2024-06-23",
    type: "minor",
    changes: [
      { type: "feature", description: "Added email collection step" },
      { type: "feature", description: "Integrated Zap webhook for results submission" },
      { type: "improvement", description: "Enhanced user flow navigation" }
    ]
  },
  {
    version: "1.0.0",
    date: "2024-06-22",
    type: "major",
    changes: [
      { type: "feature", description: "Initial hearing test application release" },
      { type: "feature", description: "Complete test flow with questionnaire" },
      { type: "feature", description: "Audio testing capabilities" },
      { type: "feature", description: "Results analysis and reporting" }
    ]
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'feature':
      return <Plus className="w-4 h-4 text-green-600" />;
    case 'bugfix':
      return <Bug className="w-4 h-4 text-red-600" />;
    case 'improvement':
      return <Zap className="w-4 h-4 text-blue-600" />;
    default:
      return <FileText className="w-4 h-4 text-gray-600" />;
  }
};

const getVersionBadgeColor = (type: string) => {
  switch (type) {
    case 'major':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'minor':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'patch':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const ReleaseNotes = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="fixed top-4 left-4 z-40">
          <FileText className="w-4 h-4 mr-2" />
          Release Notes
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Release Notes
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            {releaseNotes.map((release) => (
              <Card key={release.version} className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      Version {release.version}
                      <Badge className={getVersionBadgeColor(release.type)}>
                        {release.type}
                      </Badge>
                    </CardTitle>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {release.date}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {release.changes.map((change, index) => (
                    <div key={index} className="flex items-start gap-3">
                      {getTypeIcon(change.type)}
                      <div className="flex-1">
                        <span className="text-sm font-medium capitalize text-gray-600">
                          {change.type}:
                        </span>
                        <span className="text-sm ml-2">{change.description}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
