
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileX, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ImageUploaderProps {
  onImageSelected: (imageUrl: string) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
}

const ImageUploader = ({ onImageSelected, setIsAnalyzing }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedFileTypes = ["image/png", "image/jpeg", "image/jpg", "image/dicom"];
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!acceptedFileTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload PNG, JPEG, or DICOM images.");
      return false;
    }

    // Check file size
    if (file.size > maxFileSize) {
      toast.error("File size exceeds 5MB limit.");
      return false;
    }

    return true;
  };

  const processFile = (file: File) => {
    if (!validateFile(file)) {
      return;
    }

    setIsUploading(true);
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    // Simulate network delay for upload
    setTimeout(() => {
      setIsUploading(false);
      onImageSelected(url);
      toast.success("Image uploaded successfully");
    }, 1500);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const { files } = e.dataTransfer;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAnalyzeImage = () => {
    if (!previewUrl) return;
    
    // Simulate analysis process
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      toast.success("Image analysis completed");
    }, 3000);
  };

  return (
    <Card className="border-border/50">
      <CardContent className="p-6">
        <div
          className={`border-2 border-dashed rounded-lg p-6 transition-all ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-secondary/10"
          } cursor-pointer`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={!previewUrl ? triggerFileInput : undefined}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".png,.jpg,.jpeg,.dicom"
            onChange={handleFileSelect}
          />

          {isUploading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
              <p className="text-foreground/80">Uploading image...</p>
            </div>
          ) : previewUrl ? (
            <div className="space-y-4">
              <div className="relative aspect-video max-h-72 overflow-hidden rounded-lg">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex justify-between items-center pt-2">
                <Button variant="outline" size="sm" onClick={removeImage}>
                  <FileX className="h-4 w-4 mr-2" />
                  Remove
                </Button>
                <Button size="sm" onClick={handleAnalyzeImage}>
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Analyze Image
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10">
              <Upload className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="font-medium mb-1">Drop radiology image here or click to browse</p>
              <p className="text-sm text-muted-foreground">
                Supports PNG, JPG, JPEG, DICOM (Max 5MB)
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUploader;
