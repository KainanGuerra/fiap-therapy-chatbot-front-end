import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { CrisisPsychologistCard } from "./CrisisPsychologistCard";
import { Send, Bot, User, Calendar, Heart, Lightbulb } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  suggestions?: string[];
  needsProfessionalHelp?: boolean;
  showCrisisCard?: boolean;
}

interface ChatSectionProps {
  onScheduleRequest: () => void;
}

export function ChatSection({ onScheduleRequest }: ChatSectionProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm here to support you. How are you feeling today? You can share what's on your mind, and I'll do my best to help.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeMessage = (
    message: string
  ): {
    needsProfessionalHelp: boolean;
    response: string;
    suggestions?: string[];
    showCrisisCard?: boolean;
  } => {
    const lowerMessage = message.toLowerCase();

    // Crisis indicators
    const crisisKeywords = [
      "suicide",
      "kill myself",
      "end it all",
      "not worth living",
      "hurt myself",
      "self harm",
    ];
    const deathKeywords = [
      "death",
      "die",
      "dying",
      "want to die",
      "better off dead",
    ];
    const severeKeywords = [
      "severe depression",
      "panic attacks",
      "can't function",
      "completely overwhelmed",
      "breakdown",
      "trauma",
      "ptsd",
    ];
    const chronicKeywords = [
      "months of",
      "years of",
      "always feel",
      "never feel better",
      "getting worse",
    ];
    const psychologyKeywords = [
      "behavior patterns",
      "cognitive",
      "thinking patterns",
      "phobia",
      "ocd",
      "adhd",
      "autism",
      "personality disorder",
    ];
    const therapyKeywords = [
      "relationship",
      "family",
      "couples",
      "grief",
      "loss",
      "addiction",
    ];

    // Mild stress/advice keywords
    const mildKeywords = [
      "stressed",
      "tired",
      "overwhelmed",
      "anxious about work",
      "sleep problems",
      "work stress",
    ];

    if (crisisKeywords.some((keyword) => lowerMessage.includes(keyword))) {
      return {
        needsProfessionalHelp: true,
        response:
          "I'm very concerned about what you're sharing. These feelings are serious and you deserve immediate support. Please consider reaching out to a crisis helpline or scheduling an emergency appointment with a psychologist, psychiatrist, or other mental health professional. Would you like me to help you find someone to talk to right away?",
        suggestions: [
          "Find emergency support",
          "Schedule urgent appointment",
          "Crisis helpline numbers",
        ],
        showCrisisCard: true,
      };
    }

    if (deathKeywords.some((keyword) => lowerMessage.includes(keyword))) {
      return {
        needsProfessionalHelp: true,
        response:
          "I'm deeply concerned about what you're sharing. Thoughts about death are serious and you don't have to face this alone. There are mental health professionals who specialize in helping people through these difficult times. Please consider reaching out for immediate support.",
        suggestions: [
          "Call crisis specialist",
          "Schedule emergency appointment",
          "Access crisis resources",
        ],
        showCrisisCard: true,
      };
    }

    if (psychologyKeywords.some((keyword) => lowerMessage.includes(keyword))) {
      return {
        needsProfessionalHelp: true,
        response:
          "Based on what you're describing, it sounds like you might benefit from working with a clinical psychologist. Psychologists specialize in understanding behavior patterns, cognitive processes, and can provide evidence-based treatments like cognitive-behavioral therapy (CBT). They can help you develop effective coping strategies and work through these challenges systematically.",
        suggestions: [
          "Find a psychologist",
          "Learn about CBT",
          "Schedule psychological assessment",
        ],
      };
    }

    if (therapyKeywords.some((keyword) => lowerMessage.includes(keyword))) {
      return {
        needsProfessionalHelp: true,
        response:
          "It sounds like you're dealing with some important relationship or life challenges. A licensed therapist who specializes in these areas could provide valuable support. Depending on your specific needs, you might also benefit from seeing a psychologist who can offer both therapy and psychological assessment if needed.",
        suggestions: [
          "Find a therapist",
          "Find a psychologist",
          "Explore counseling options",
        ],
      };
    }

    if (
      severeKeywords.some((keyword) => lowerMessage.includes(keyword)) ||
      chronicKeywords.some((keyword) => lowerMessage.includes(keyword))
    ) {
      return {
        needsProfessionalHelp: true,
        response:
          "What you're experiencing sounds really challenging and it takes courage to share this. These symptoms would benefit greatly from professional support. A psychologist can provide comprehensive assessment and evidence-based treatments, while a therapist can offer ongoing counseling support. If medication might be helpful, a psychiatrist could also be part of your care team.",
        suggestions: [
          "Find a psychologist",
          "Find a therapist",
          "Learn about treatments",
          "Schedule consultation",
        ],
      };
    }

    if (mildKeywords.some((keyword) => lowerMessage.includes(keyword))) {
      return {
        needsProfessionalHelp: false,
        response:
          "It sounds like you're dealing with some stress. Here are some strategies that might help: Practice deep breathing exercises, try the 5-4-3-2-1 grounding technique, maintain a regular sleep schedule, and engage in physical activity. If these feelings persist or worsen, consider talking to a psychologist or therapist who can provide personalized coping strategies.",
        suggestions: [
          "Try breathing exercises",
          "Practice mindfulness",
          "Improve sleep hygiene",
          "Consider seeing a psychologist",
        ],
      };
    }

    // Default supportive response
    return {
      needsProfessionalHelp: false,
      response:
        "Thank you for sharing with me. I'm here to listen and support you. Can you tell me more about what's been on your mind lately? Understanding your situation better will help me provide more personalized guidance. If you feel like you need more support, both psychologists and therapists can provide professional help tailored to your specific needs.",
      suggestions: [
        "Tell me more",
        "Explore coping strategies",
        "Learn about psychology",
        "Find mental health support",
      ],
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const analysis = analyzeMessage(inputValue);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: analysis.response,
        sender: "bot",
        timestamp: new Date(),
        suggestions: analysis.suggestions,
        needsProfessionalHelp: analysis.needsProfessionalHelp,
        showCrisisCard: analysis.showCrisisCard,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (
      suggestion.includes("Find") ||
      suggestion.includes("Schedule") ||
      suggestion.includes("Call")
    ) {
      onScheduleRequest();
    } else {
      setInputValue(suggestion);
    }
  };

  const handleCrisisSchedule = () => {
    onScheduleRequest();
  };

  const handleEmergencyCall = () => {
    // In a real app, this would initiate a phone call
    window.open("tel:(555)123-4567", "_self");
  };

  return (
    <div className="flex flex-col h-full max-h-[600px]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex items-start space-x-2 max-w-[80%] ${
                message.sender === "user"
                  ? "flex-row-reverse space-x-reverse"
                  : ""
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
              >
                {message.sender === "user" ? (
                  <User className="w-4 h-4" />
                ) : (
                  <img 
                    src="/src/images/bot.jpeg" 
                    alt="Bot" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <Card
                  className={`${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card"
                  }`}
                >
                  <CardContent className="p-3">
                    <p className="text-sm">{message.content}</p>
                  </CardContent>
                </Card>

                {message.suggestions && (
                  <div className="flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-accent transition-colors text-xs"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion.includes("Find") ||
                        suggestion.includes("Schedule") ||
                        suggestion.includes("Call") ? (
                          <Calendar className="w-3 h-3 mr-1" />
                        ) : suggestion.includes("coping") ||
                          suggestion.includes("strategies") ? (
                          <Lightbulb className="w-3 h-3 mr-1" />
                        ) : (
                          <Heart className="w-3 h-3 mr-1" />
                        )}
                        {suggestion}
                      </Badge>
                    ))}
                  </div>
                )}

                {message.showCrisisCard && (
                  <div className="mt-4">
                    <CrisisPsychologistCard
                      onSchedule={handleCrisisSchedule}
                      onEmergencyCall={handleEmergencyCall}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center">
                <img 
                  src="/src/images/bot.jpeg" 
                  alt="Bot" 
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              <Card className="bg-card">
                <CardContent className="p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Share what's on your mind..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            disabled={!inputValue.trim()}
            style={{ backgroundColor: "#3973BF", color: "white" }}
            className="hover:opacity-90 transition-opacity"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
