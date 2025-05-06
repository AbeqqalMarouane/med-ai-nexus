
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Brain, User } from "lucide-react";



interface ChatMessageProps {
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

const ChatMessage = ({ type, content, timestamp = new Date() }: ChatMessageProps) => {
  const isUser = type === "user";
  
  return (
    <div
      className={cn(
        "flex w-full gap-3 mb-6",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 bg-primary/20 text-primary">
          <Brain className="h-4 w-4" />
        </Avatar>
      )}
      
      <div
        className={cn(
          "flex flex-col max-w-[80%] md:max-w-[70%] rounded-lg p-4",
          isUser 
            ? "bg-primary/20 border border-primary/30 rounded-tr-none" 
            : "glass-card rounded-tl-none"
        )}
      >
        <div className="whitespace-pre-wrap text-sm">{content}</div>
        <div className="text-xs text-muted-foreground mt-1 self-end">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8 bg-secondary text-secondary-foreground">
          <User className="h-4 w-4" />
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
