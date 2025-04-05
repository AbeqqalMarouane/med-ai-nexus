
import { Check } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Medical Chatbot",
      description: "Describe your symptoms to our AI chatbot which uses NLP and machine learning to analyze your condition.",
      highlights: [
        "Natural language processing for accurate understanding",
        "Comprehensive medical database for reliable suggestions",
        "Instant feedback on potential diseases",
        "Recommendation of appropriate medical tests"
      ]
    },
    {
      number: "02",
      title: "Image Analysis",
      description: "Upload radiology images like X-rays or CT scans for AI-powered disease detection and analysis.",
      highlights: [
        "Deep learning algorithms for accurate disease detection",
        "Support for multiple image formats and types",
        "Rapid analysis with visual highlighting of concerns",
        "Detailed explanations of findings for better understanding"
      ]
    },
    {
      number: "03",
      title: "Doctor Connection",
      description: "Based on your symptoms or diagnosis, find specialized doctors in your area to provide necessary care.",
      highlights: [
        "Location-based search for convenient access to care",
        "Filter by specialization to find the right expert",
        "View doctor profiles with detailed credentials",
        "Direct connection to make appointments"
      ]
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-radial from-secondary/40 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How MedAI Nexus Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our integrated platform combines multiple AI technologies to provide 
            a comprehensive healthcare solution from symptom analysis to doctor connection.
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16`}
            >
              {/* Step number and description */}
              <div className="flex-1 space-y-4">
                <div className="inline-block text-4xl font-bold text-primary/20">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground mb-6">
                  {step.description}
                </p>
                <ul className="space-y-3">
                  {step.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 mt-1 flex-shrink-0 rounded-full p-1 bg-primary/10 text-primary">
                        <Check className="h-4 w-4" />
                      </span>
                      <span className="text-foreground/80">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Illustration placeholder */}
              <div className="flex-1 min-h-[300px] rounded-xl glass-card flex items-center justify-center">
                <div className="text-4xl text-primary/30 font-bold">
                  {step.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
