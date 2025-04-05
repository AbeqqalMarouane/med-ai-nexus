
import { MessageSquare, ImagePlus, UserRound } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Features = () => {
  const features = [
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "Medical Chatbot AI",
      description: "Our advanced AI analyzes your symptoms to identify potential diseases and suggest necessary medical tests.",
      link: "/chatbot",
      linkText: "Chat with AI"
    },
    {
      icon: <ImagePlus className="h-10 w-10 text-primary" />,
      title: "Disease Detection",
      description: "Upload radiology images such as X-rays or CT scans and let our AI detect signs of various diseases.",
      link: "/image-analysis",
      linkText: "Analyze Images"
    },
    {
      icon: <UserRound className="h-10 w-10 text-primary" />,
      title: "Doctor Interface",
      description: "Find specialized doctors in your area based on your specific medical needs and conditions.",
      link: "/doctors",
      linkText: "Find Doctors"
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprehensive Medical AI Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform offers multiple AI-powered tools to enhance healthcare 
            diagnosis, analysis, and doctor-patient connections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="feature-card border-border/50">
              <CardHeader className="pb-4">
                <div className="mb-4 p-3 w-16 h-16 flex items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to={feature.link}>
                    {feature.linkText}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
