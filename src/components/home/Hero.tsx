
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-radial from-secondary/40 to-background">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm mb-6">
            <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-primary"></span>
            Next-Generation Medical AI Platform
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Revolutionizing Healthcare with <span className="text-gradient">Advanced AI</span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl">
            Our AI-powered platform helps identify potential diseases from symptoms, 
            analyzes medical images, and connects you with specialized doctors.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button asChild size="lg" className="text-base">
              <Link to="/chatbot">
                Try Medical AI Chatbot
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base">
              <Link to="/doctors">Find Doctors</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-1/3 left-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-10 h-64 w-64 rounded-full bg-accent/5 blur-3xl -z-10"></div>
    </div>
  );
};

export default Hero;
