import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Bot, 
  User, 
  AlertTriangle, 
  Heart,
  Shield,
  Brain,
  Phone,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  isEmergency?: boolean;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI mental health companion. I'm here to listen, support, and guide you through any challenges you might be facing. How are you feeling today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [crisisDialogOpen, setCrisisDialogOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const emergencyKeywords = [
    "suicide", "kill myself", "end my life", "hurt myself", 
    "self-harm", "die", "death", "hopeless", "give up"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectEmergency = (text: string) => {
    return emergencyKeywords.some(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (detectEmergency(message)) {
      return "I'm concerned about what you're going through. Your feelings are valid, but I want to make sure you're safe. Please consider reaching out to a crisis counselor immediately. Would you like me to connect you with emergency resources?";
    }
    
    if (message.includes("anxious") || message.includes("anxiety")) {
      return "I understand you're feeling anxious. That's a very common experience. Let's try some grounding techniques together. Can you tell me 5 things you can see around you right now?";
    }
    
    if (message.includes("sad") || message.includes("depressed") || message.includes("down")) {
      return "I hear that you're feeling sad, and I want you to know that these feelings are valid. Depression can make things feel overwhelming. Have you been able to maintain your daily routines lately?";
    }
    
    if (message.includes("stress") || message.includes("stressed")) {
      return "Stress can be really challenging to manage. Let's work on some coping strategies. What's been causing the most stress for you lately? Breaking it down can help us find solutions together.";
    }
    
    if (message.includes("sleep") || message.includes("tired")) {
      return "Sleep issues can really impact our mental health. Have you noticed any patterns in your sleep schedule? I can suggest some sleep hygiene techniques that might help.";
    }
    
    return "Thank you for sharing that with me. I'm here to listen and support you. Can you tell me more about what's on your mind? Sometimes talking through our thoughts can help us process them better.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date()
    };

    const isEmergency = detectEmergency(input);

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(input),
        isBot: true,
        timestamp: new Date(),
        isEmergency
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            AI Mental Health Support
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Safe, confidential, and available 24/7
          </p>
          
          {/* Safety Notice */}
          <Card className="mb-6 border-warning/20 bg-warning-light">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="text-sm font-medium text-warning-foreground">
                    Crisis Support Available
                  </p>
                  <p className="text-sm text-muted-foreground">
                    If you're experiencing a mental health emergency, please contact the Campus Crisis Line: 
                    <span className="font-semibold ml-1">(555) 123-4567</span> or call 988 for immediate help.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <Card className="shadow-wellness h-[600px] flex flex-col">
          <CardHeader className="bg-gradient-wellness text-primary-foreground">
            <CardTitle className="flex items-center space-x-2">
              <Bot className="h-6 w-6" />
              <span>MindWell AI Assistant</span>
              <Badge variant="secondary" className="ml-auto bg-primary-foreground/20 text-primary-foreground">
                Online
              </Badge>
            </CardTitle>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-0">
            <div className="space-y-4 p-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start space-x-3",
                    message.isBot ? "justify-start" : "justify-end"
                  )}
                >
                  {message.isBot && (
                    <div className="w-8 h-8 bg-gradient-wellness rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
                      message.isBot 
                        ? "bg-muted text-foreground" 
                        : "bg-gradient-wellness text-primary-foreground",
                      message.isEmergency && "ring-2 ring-destructive"
                    )}
                  >
                    {message.isEmergency && (
                      <div className="flex items-center space-x-2 mb-2 text-destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm font-medium">Crisis Detection</span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <span className={cn(
                      "text-xs opacity-60 mt-2 block",
                      message.isBot ? "text-muted-foreground" : "text-primary-foreground/60"
                    )}>
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                    
                    {message.isEmergency && (
                      <div className="mt-3 pt-3 border-t border-destructive/20">
                        <AlertDialog open={crisisDialogOpen} onOpenChange={setCrisisDialogOpen}>
  <AlertDialogTrigger asChild>
    <Button
      size="sm"
      variant="destructive"
      className="w-full"
    >
      <Phone className="h-4 w-4 mr-2" />
      Connect to Crisis Counselor
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Crisis Support Resources</AlertDialogTitle>
      <AlertDialogDescription>
        If you are in immediate danger, call 911 (US) or your local emergency number right away.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <div className="space-y-3">
      <div className="flex space-x-3">
        <Phone className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-medium">988 Suicide &amp; Crisis Lifeline (US)</div>
          <div className="text-sm text-muted-foreground">Call or text 988, available 24/7</div>
        </div>
      </div>
      <div className="flex space-x-3">
        <Phone className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-medium">Campus Crisis Line</div>
          <div className="text-sm text-muted-foreground">(555) 123-4567</div>
        </div>
      </div>
      <div className="flex space-x-3">
        <MessageSquare className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-medium">Crisis Text Line</div>
          <div className="text-sm text-muted-foreground">Text HOME to 741741</div>
        </div>
      </div>
    </div>
    <p className="text-xs text-muted-foreground mt-4">
      MindWell is not a substitute for professional medical advice, diagnosis, or treatment.
    </p>
  </AlertDialogContent>
</AlertDialog>
                      </div>
                    )}
                  </div>

                  {!message.isBot && (
                    <div className="w-8 h-8 bg-secondary-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-secondary-foreground" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-wellness rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here... Press Enter to send"
                className="flex-1"
              />
              <Button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-gradient-wellness hover:shadow-glow transition-smooth"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Your conversations are confidential and secure. AI responses are not a substitute for professional medical advice.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chat;