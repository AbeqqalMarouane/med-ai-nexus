import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, ArrowDown, Loader2 } from "lucide-react"; // Removed MessageSquare as typing indicator uses text
import ChatMessage from "./ChatMessage";
import { toast } from "sonner";

import { 
  GoogleGenerativeAI, 
  HarmCategory, 
  HarmBlockThreshold, 
  Content // Import the Content type
} from "@google/generative-ai";

interface Message {
  id: string;
  type: "user" | "bot" | "typing_indicator";
  content: string;
  timestamp: Date;
}

// Constants
const SCROLL_BUTTON_THRESHOLD_PX = 100;
const WELCOME_MESSAGE = "Hello! I'm your Medical AI Assistant. Please describe your symptoms, and I'll help identify potential diseases and suggest appropriate medical tests. Remember, this is not real medical advice.";

// --- Gemini API Setup ---
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // For Vite
// const API_KEY = process.env.REACT_APP_GEMINI_API_KEY; // For Create React App

if (!API_KEY) {
  console.error("Gemini API Key not found. Please set VITE_GEMINI_API_KEY in your .env.local file.");
  // Consider how to inform the user if the API key is missing, e.g., disable chat or show a persistent error.
}

const genAI = new GoogleGenerativeAI(API_KEY || "FALLBACK_API_KEY_FOR_SAFETY_BUT_CHAT_WILL_FAIL"); // Provide a fallback or ensure API_KEY is always present

// System instruction for the AI model
const SYSTEM_INSTRUCTION_TEXT = `You are a helpful Medical AI Assistant. 
Your primary function is to:
1. Analyze user-described symptoms.
2. Suggest potential, general (non-definitive) conditions that *might* be associated with those symptoms.
3. Recommend appropriate general medical tests that a doctor *might* consider for further investigation.
4. ALWAYS include a clear disclaimer that your advice is NOT a substitute for professional medical diagnosis or treatment and that the user MUST consult a qualified healthcare professional for any health concerns or before making any decisions related to their health.
5. Keep responses concise and easy to understand for a general audience.
6. Do not provide specific diagnoses or treatment plans. Focus on general information and guidance towards professional help.
7. If the user asks for something outside your scope (e.g., unrelated to medical symptoms), politely decline or redirect.
Example of disclaimer: "Please remember, I am an AI assistant and this information is not a substitute for professional medical advice. Always consult with a qualified healthcare provider for any health concerns or before making any decisions related to your health."
`;

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest", // Or "gemini-pro" or other suitable models
  systemInstruction: { // Pass system instruction here directly
     role: "system", // This is implicit when providing a string or a single part object
    parts: [{ text: SYSTEM_INSTRUCTION_TEXT }],
  },
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
});

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content: WELCOME_MESSAGE,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Store chat history for Gemini API. This will NOT include the system instruction.
  const [chatHistoryForGemini, setChatHistoryForGemini] = useState<Content[]>([]);


  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < SCROLL_BUTTON_THRESHOLD_PX;
      setShowScrollButton(!isNearBottom);
    }
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.type === "typing_indicator" || messages.length <= 2) {
        scrollToBottom("auto");
    } else {
        scrollToBottom("smooth");
    }
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

  const processMessageWithGemini = async (userInput: string) => {
    if (!API_KEY) {
      toast.error("API Key is not configured. Cannot connect to AI services.");
      setMessages((prev) => prev.filter(msg => msg.type !== "typing_indicator"));
      setIsProcessing(false);
      textareaRef.current?.focus();
      return;
    }

    setIsProcessing(true);
    setMessages((prev) => [
      ...prev,
      {
        id: `bot-typing-${Date.now()}`,
        type: "typing_indicator",
        content: "AI Assistant is thinking...", // Content for the typing indicator
        timestamp: new Date(), // Timestamp for typing indicator (optional, but good for consistency)
      },
    ]);
    scrollToBottom("auto"); // Ensure typing indicator is visible

    console.log("Sending to Gemini with history:", JSON.stringify(chatHistoryForGemini, null, 2));
    console.log("And user input:", userInput);
    
    try {
      // Start a chat session. System instruction is part of the 'model' config.
      // History is the conversation turns so far.
      const chat = model.startChat({
        history: chatHistoryForGemini,
        generationConfig: {
          // maxOutputTokens: 200, // Optional: limit response length
        },
      });

      const result = await chat.sendMessage(userInput);
      const response = result.response;
      const botResponseText = response.text();

      if (!botResponseText && response.candidates && response.candidates.length > 0 && response.candidates[0].finishReason !== "STOP") {
        console.warn("Gemini response might be blocked or empty. Finish Reason:", response.candidates[0].finishReason, "Safety Ratings:", response.candidates[0].safetyRatings);
        const blockedMessage = "I'm sorry, I couldn't generate a response for that. It might be due to content restrictions. Please try rephrasing or ask something else.";
         setMessages((prev) => [
            ...prev.filter(msg => msg.type !== "typing_indicator"),
            {
              id: `bot-blocked-${Date.now()}`,
              type: "bot",
              content: blockedMessage,
              timestamp: new Date(),
            },
          ]);
        //toast.warn("The AI's response was potentially blocked.");
      } else {
        // Add AI's response to our UI messages
        setMessages((prev) => [
          ...prev.filter(msg => msg.type !== "typing_indicator"),
          {
            id: `bot-${Date.now()}`,
            type: "bot",
            content: botResponseText || "I'm sorry, I didn't get a specific response. Please try again.", // Fallback if text is empty
            timestamp: new Date(),
          },
        ]);

        // Update the Gemini chat history state for the next turn
        setChatHistoryForGemini((prevHistory) => [
          ...prevHistory,
          { role: "user", parts: [{ text: userInput }] },
          { role: "model", parts: [{ text: botResponseText }] },
        ]);
      }

    } catch (error) {
      console.error("Error calling Gemini API:", error);
      let errorMessage = "Sorry, I encountered an error. Please try again.";
      if (error instanceof Error) {
        if (error.message.includes("API key not valid")) {
            errorMessage = "API Key is invalid. Please check your configuration.";
        } else if (error.message.toLowerCase().includes("quota") || error.message.toLowerCase().includes("rate limit")) {
            errorMessage = "API quota exceeded or rate limit hit. Please try again later.";
        } else if (error.message.includes("FETCH_ERROR")) {
            errorMessage = "Network error. Please check your connection and try again.";
        }
        // Add more specific error handling if needed based on Gemini API errors
      }
      
      setMessages((prev) => [
        ...prev.filter(msg => msg.type !== "typing_indicator"),
        {
          id: `bot-error-${Date.now()}`,
          type: "bot",
          content: errorMessage,
          timestamp: new Date(),
        },
      ]);
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
      textareaRef.current?.focus();
    }
  };

  const handleSendMessage = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isProcessing) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      content: trimmedInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    processMessageWithGemini(trimmedInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="border-b border-border p-4">
        <h2 className="font-semibold text-lg">Medical AI Assistant</h2>
        <p className="text-sm text-muted-foreground">
          Describe your symptoms for potential insights. (AI Powered by Gemini)
        </p>
      </div>
      
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        aria-live="polite"
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
          className="absolute bottom-24 right-6 rounded-full shadow-lg z-10"
          onClick={() => scrollToBottom("smooth")}
          aria-label="Scroll to bottom"
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
      )}
      
      <div className="border-t border-border p-4 bg-background">
        <div className="flex gap-2 items-end">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={!API_KEY ? "API Key not configured. Chat disabled." : "Describe your symptoms..."}
            className="min-h-[60px] max-h-[150px] resize-none"
            disabled={isProcessing || !API_KEY} // Disable if API key is missing
            rows={1}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isProcessing || !input.trim() || !API_KEY} // Disable if API key is missing
            size="icon"
            className="h-[60px] w-[60px] shrink-0"
            aria-label="Send message"
          >
            {isProcessing ? ( // Simplified loader condition, shows whenever processing
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Note: This is an AI simulation. Always consult a real healthcare professional for medical advice.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;