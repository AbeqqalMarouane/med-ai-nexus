
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { AlertCircle, Check, Info } from "lucide-react";

interface AnalysisResultProps {
  isAnalyzing: boolean;
  imageUrl: string | null;
}

const AnalysisResult = ({ isAnalyzing, imageUrl }: AnalysisResultProps) => {
  // Mock analysis result - in a real application this would come from an AI model
  const analysisData = {
    probableDiagnosis: "Pneumonia",
    confidence: 89,
    alternatives: [
      { name: "Bronchitis", probability: 43 },
      { name: "Normal", probability: 11 },
    ],
    findings: [
      "Opacity in the right lower lobe",
      "Minor air bronchogram signs",
      "No pleural effusion",
      "Heart size within normal limits"
    ],
    recommendedTests: [
      "Complete Blood Count (CBC)",
      "Blood cultures",
      "Sputum culture",
      "CT scan for detailed visualization"
    ]
  };

  if (!imageUrl) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-xl">Analysis Results</CardTitle>
          <CardDescription>
            Upload a radiology image to see AI-powered analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10 text-muted-foreground">
          <Info className="h-10 w-10 mb-4" />
          <p className="text-center">No image has been analyzed yet</p>
        </CardContent>
      </Card>
    );
  }

  if (isAnalyzing) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-xl">Analyzing Image</CardTitle>
          <CardDescription>
            Please wait while our AI processes your radiology image
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-10">
            <div className="relative w-16 h-16 mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-primary/30 opacity-75"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            </div>
            <p className="text-foreground/80">Analysis in progress...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">Analysis Results</CardTitle>
            <CardDescription>
              AI-detected findings from your radiology image
            </CardDescription>
          </div>
          <Badge variant={analysisData.confidence > 80 ? "default" : "outline"} className="ml-2">
            {analysisData.confidence}% Confidence
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-2 flex items-center">
            <AlertCircle className="h-4 w-4 text-destructive mr-2" />
            Probable Diagnosis
          </h3>
          <div className="bg-card p-3 rounded-md border border-border">
            <p className="text-lg font-semibold">{analysisData.probableDiagnosis}</p>
            
            {analysisData.alternatives.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground mb-1">Alternative possibilities:</p>
                <div className="flex flex-wrap gap-2">
                  {analysisData.alternatives.map((alt, idx) => (
                    <Badge key={idx} variant="secondary">
                      {alt.name} ({alt.probability}%)
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2 flex items-center">
            <Info className="h-4 w-4 text-primary mr-2" />
            Key Findings
          </h3>
          <ul className="space-y-1.5">
            {analysisData.findings.map((finding, idx) => (
              <li key={idx} className="flex items-start">
                <Check className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                <span>{finding}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-2 flex items-center">
            <Info className="h-4 w-4 text-accent mr-2" />
            Recommended Tests
          </h3>
          <ul className="space-y-1.5">
            {analysisData.recommendedTests.map((test, idx) => (
              <li key={idx} className="flex items-start">
                <Check className="h-4 w-4 text-accent mr-2 mt-1 flex-shrink-0" />
                <span>{test}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <p className="text-sm text-muted-foreground mt-4 pt-2 border-t border-border">
          Note: This analysis is for demonstration purposes only. Always consult a qualified 
          healthcare professional for proper diagnosis.
        </p>
      </CardContent>
    </Card>
  );
};

export default AnalysisResult;
