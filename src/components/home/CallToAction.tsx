
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="glass-card rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
          {/* Background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 -z-10"></div>
          <div className="absolute top-1/2 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl -z-10"></div>
          
          <div className="max-w-2xl relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience the Future of Healthcare?
            </h2>
            <p className="text-lg text-foreground/80 mb-8">
              Start with our AI medical chatbot to analyze your symptoms, upload medical images for 
              analysis, or search for specialized doctors in your area.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link to="/chatbot">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
