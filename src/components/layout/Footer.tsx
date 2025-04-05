
import { Link } from "react-router-dom";
import { Brain, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card/70 border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">MedAI Nexus</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Revolutionizing healthcare through advanced AI solutions for symptom analysis, 
              medical imaging, and connecting patients with specialists.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/chatbot" className="hover:text-primary transition-colors">Medical Chatbot</Link></li>
              <li><Link to="/image-analysis" className="hover:text-primary transition-colors">Disease Detection</Link></li>
              <li><Link to="/doctors" className="hover:text-primary transition-colors">Find Doctors</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start">
                <Mail className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                <span>contact@medainexus.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                <span>123 Medical Plaza, Suite 456<br />New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-sm text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MedAI Nexus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
