
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, ArrowDown, Loader2 } from "lucide-react";
import ChatMessage from "./ChatMessage";
import { toast } from "sonner";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content: "Hello! I'm your Medical AI Assistant. Please describe your symptoms, and I'll help identify potential diseases and suggest appropriate medical tests.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Medical conditions and responses database (simplified for demo)
  const medicalResponses = {
    headache: "Based on your symptoms, you might be experiencing a tension headache, migraine, or cluster headache. I recommend consulting with a neurologist and potentially getting an MRI if the headaches persist or are severe. Blood tests may also help identify any underlying conditions.",
    fever: "Fever can be a symptom of various conditions including infections, inflammatory diseases, or medication reactions. I recommend a complete blood count (CBC) test and potentially a urine analysis. If the fever persists for more than 3 days or exceeds 103°F (39.4°C), please seek immediate medical attention.",
    cough: "Your persistent cough could indicate bronchitis, asthma, GERD, or an upper respiratory infection. A chest X-ray and pulmonary function test would be appropriate diagnostic measures. You might want to consult with a pulmonologist.",
    "joint pain": "Joint pain can be related to arthritis, injury, or autoimmune conditions. I recommend rheumatoid factor (RF) test, anti-CCP antibodies test, and potentially X-rays or MRI of the affected joints. A rheumatologist would be the appropriate specialist to consult.",
    "chest pain": "Chest pain could indicate serious conditions including heart problems. Please seek immediate medical attention. Tests may include an ECG, echocardiogram, stress test, and cardiac enzyme tests. A cardiologist should evaluate your condition.",
    default: "Thank you for providing your symptoms. Based on the information, I recommend consulting with a general practitioner for a proper diagnosis. They may recommend blood tests, imaging studies, or referral to a specialist depending on your specific condition."
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
      return () => {
        chatContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const processMessage = (userInput: string) => {
    setIsLoading(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const lowercaseInput = userInput.toLowerCase();
      let response = "";

      // Check if any keywords match in the input
      for (const [keyword, reply] of Object.entries(medicalResponses)) {
        if (lowercaseInput.includes(keyword)) {
          response = reply;
          break;
        }
      }

      // If no specific match, use default response
      if (!response) {
        response = medicalResponses.default;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          type: "bot",
          content: response,
          timestamp: new Date(),
        },
      ]);

      setIsLoading(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    processMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-border p-4">
        <h2 className="font-semibold">Medical AI Assistant</h2>
        <p className="text-sm text-muted-foreground">
          Describe your symptoms for disease identification and test recommendations
        </p>
      </div>
      
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        onScroll={handleScroll}
      >
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            type={message.type}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {showScrollButton && (
        <Button
          variant="outline"
          size="icon"
          className="absolute bottom-20 right-6 rounded-full shadow-lg"
          onClick={scrollToBottom}
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
      )}
      
      <div className="border-t border-border p-4 bg-background">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your symptoms..."
            className="min-h-[60px] resize-none"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Note: This is a simulation for demonstration purposes. Always consult a real healthcare professional for medical advice.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
