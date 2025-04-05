
import { Card } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import ChatInterface from "@/components/chatbot/ChatInterface";

const ChatbotPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border-border/50 overflow-hidden h-[calc(100vh-160px)]">
              <ChatInterface />
            </Card>
          </div>
          
          <div>
            <Card className="p-6 border-border/50 mb-6">
              <h2 className="text-xl font-semibold mb-4">How to Use the Medical Chatbot</h2>
              <ul className="space-y-3 text-sm text-foreground/80">
                <li className="flex items-start">
                  <span className="font-bold mr-2">1.</span>
                  <span>Describe your symptoms in detail, including duration, severity, and any triggers.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">2.</span>
                  <span>Mention any pre-existing conditions or medications you're taking.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">3.</span>
                  <span>The AI will analyze your symptoms and suggest potential conditions.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">4.</span>
                  <span>It will recommend appropriate medical tests or specialists to consult.</span>
                </li>
              </ul>
            </Card>
            
            <Card className="p-6 border-border/50">
              <h2 className="text-xl font-semibold mb-4">Important Disclaimer</h2>
              <p className="text-sm text-foreground/80 mb-4">
                This AI medical assistant is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
              </p>
              <p className="text-sm text-foreground/80">
                Always seek the advice of your physician or other qualified health provider with any questions about your medical condition.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatbotPage;
