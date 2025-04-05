
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ImageUploader from "@/components/image-analysis/ImageUploader";
import AnalysisResult from "@/components/image-analysis/AnalysisResult";

const ImageAnalysisPage = () => {
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageSelected = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Disease Detection from Medical Images</h1>
          <p className="text-muted-foreground">
            Upload radiology images such as X-rays or CT scans for AI-powered disease detection and analysis.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ImageUploader 
              onImageSelected={handleImageSelected}
              setIsAnalyzing={setIsAnalyzing}
            />
            
            <div className="mt-6 glass-card p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Supported Image Types</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/30 rounded-md">
                  <h3 className="font-medium mb-1">X-ray Images</h3>
                  <p className="text-sm text-muted-foreground">Chest, bone, abdominal</p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-md">
                  <h3 className="font-medium mb-1">CT Scans</h3>
                  <p className="text-sm text-muted-foreground">Brain, chest, full body</p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-md">
                  <h3 className="font-medium mb-1">MRI Scans</h3>
                  <p className="text-sm text-muted-foreground">Brain, spine, joints</p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-md">
                  <h3 className="font-medium mb-1">Ultrasound</h3>
                  <p className="text-sm text-muted-foreground">Abdominal, cardiac</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <AnalysisResult 
              isAnalyzing={isAnalyzing}
              imageUrl={selectedImageUrl}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ImageAnalysisPage;
