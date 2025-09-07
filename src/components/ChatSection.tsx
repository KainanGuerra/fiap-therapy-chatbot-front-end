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
        "Olá! Estou aqui para apoiá-lo. Como você está se sentindo hoje? Você pode compartilhar o que está em sua mente, e farei o meu melhor para ajudar.",
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
      "suicide", "suicídio", "suicidio",
      "kill myself", "me matar", "me suicidar",
      "end it all", "acabar com tudo", "terminar com tudo",
      "not worth living", "não vale a pena viver", "vida não vale a pena",
      "hurt myself", "me machucar", "me ferir", "me fazer mal",
      "self harm", "automutilação", "auto mutilação", "me cortar",
      "quero morrer", "vou me matar", "não aguento mais",
      "melhor morto", "não quero mais viver", "acabar comigo",
    ];
    const deathKeywords = [
      "death", "morte", "morrer",
      "die", "morrer", "falecer",
      "dying", "morrendo", "agonizando",
      "want to die", "quero morrer", "desejo morrer",
      "better off dead", "melhor morto", "melhor morrer",
      "pensamentos de morte", "penso em morte", "obsessão com morte",
    ];
    const severeKeywords = [
      "severe depression", "depressão severa", "depressão grave",
      "panic attacks", "ataques de pânico", "crises de pânico",
      "can't function", "não consigo funcionar", "não funciono",
      "completely overwhelmed", "completamente sobrecarregado", "totalmente perdido",
      "breakdown", "colapso", "surto", "crise nervosa",
      "trauma", "trauma", "traumatizado",
      "ptsd", "tept", "estresse pós-traumático",
      "depressão profunda", "ansiedade severa", "pânico constante",
      "não consigo sair da cama", "paralisia total", "incapacitado",
    ];
    const chronicKeywords = [
      "months of", "meses de", "há meses",
      "years of", "anos de", "há anos",
      "always feel", "sempre sinto", "sempre me sinto",
      "never feel better", "nunca me sinto melhor", "não melhoro nunca",
      "getting worse", "piorando", "ficando pior",
      "desde sempre", "toda vida", "nunca mudou",
      "só piora", "cada vez pior", "sem melhora",
    ];
    const psychologyKeywords = [
      "behavior patterns", "padrões de comportamento", "comportamentos repetitivos",
      "cognitive", "cognitivo", "cognição", "pensamento",
      "thinking patterns", "padrões de pensamento", "forma de pensar",
      "phobia", "fobia", "fobias", "medo extremo",
      "ocd", "toc", "obsessivo compulsivo", "manias",
      "adhd", "tdah", "déficit de atenção", "hiperatividade",
      "autism", "autismo", "autista", "espectro autista",
      "personality disorder", "transtorno de personalidade", "distúrbio de personalidade",
      "compulsões", "obsessões", "rituais", "comportamento obsessivo",
    ];
    const therapyKeywords = [
      "relationship", "relacionamento", "relacionamentos",
      "family", "família", "familiar", "familiares",
      "couples", "casais", "casal", "namoro", "casamento",
      "grief", "luto", "perda", "falecimento",
      "loss", "perda", "perdas", "separação",
      "addiction", "vício", "dependência", "adicção",
      "problemas conjugais", "conflitos familiares", "divórcio",
      "alcoolismo", "drogas", "dependência química",
    ];

    // Mild stress/advice keywords
    const mildKeywords = [
      "stressed", "estressado", "estressada", "stress",
      "tired", "cansado", "cansada", "exausto", "exausta",
      "overwhelmed", "sobrecarregado", "sobrecarregada", "perdido",
      "anxious about work", "ansioso com trabalho", "ansiedade no trabalho",
      "sleep problems", "problemas de sono", "insônia", "não durmo bem",
      "work stress", "estresse no trabalho", "pressão no trabalho",
      "preocupado", "nervoso", "agitado", "irritado",
      "sem energia", "desmotivado", "chateado", "frustrado",
    ];

    if (crisisKeywords.some((keyword) => lowerMessage.includes(keyword))) {
      return {
        needsProfessionalHelp: true,
        response:
          "Estou muito preocupado com o que você está compartilhando. Esses sentimentos são sérios e você merece apoio imediato. Por favor, considere entrar em contato com uma linha de ajuda para crises ou agendar uma consulta de emergência com um psicólogo, psiquiatra ou outro profissional de saúde mental. Gostaria que eu ajudasse você a encontrar alguém para conversar imediatamente?",
        suggestions: [
          "Encontrar apoio de emergência",
          "Agendar consulta urgente",
          "Números de linha de crise",
        ],
        showCrisisCard: true,
      };
    }

    if (deathKeywords.some((keyword) => lowerMessage.includes(keyword))) {
      return {
        needsProfessionalHelp: true,
        response:
          "Estou profundamente preocupado com o que você está compartilhando. Pensamentos sobre morte são sérios e você não precisa enfrentar isso sozinho. Existem profissionais de saúde mental que se especializam em ajudar pessoas durante esses momentos difíceis. Por favor, considere buscar apoio imediato.",
        suggestions: [
          "Ligar para especialista em crise",
          "Agendar consulta de emergência",
          "Acessar recursos de crise",
        ],
        showCrisisCard: true,
      };
    }

    if (psychologyKeywords.some((keyword) => lowerMessage.includes(keyword))) {
      return {
        needsProfessionalHelp: true,
        response:
          "Com base no que você está descrevendo, parece que você pode se beneficiar de trabalhar com um psicólogo clínico. Os psicólogos se especializam em entender padrões de comportamento, processos cognitivos e podem fornecer tratamentos baseados em evidências como a terapia cognitivo-comportamental (TCC). Eles podem ajudá-lo a desenvolver estratégias eficazes de enfrentamento e trabalhar através desses desafios sistematicamente.",
        suggestions: [
          "Encontrar um psicólogo",
          "Aprender sobre TCC",
          "Agendar avaliação psicológica",
        ],
      };
    }

    if (therapyKeywords.some((keyword) => lowerMessage.includes(keyword))) {
      return {
        needsProfessionalHelp: true,
        response:
          "Parece que você está lidando com alguns desafios importantes de relacionamento ou vida. Um terapeuta licenciado que se especializa nessas áreas pode fornecer apoio valioso. Dependendo de suas necessidades específicas, você também pode se beneficiar de consultar um psicólogo que pode oferecer tanto terapia quanto avaliação psicológica, se necessário.",
        suggestions: [
          "Encontrar um terapeuta",
          "Encontrar um psicólogo",
          "Explorar opções de aconselhamento",
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
          "O que você está experienciando parece realmente desafiador e é preciso coragem para compartilhar isso. Esses sintomas se beneficiariam muito do apoio profissional. Um psicólogo pode fornecer avaliação abrangente e tratamentos baseados em evidências, enquanto um terapeuta pode oferecer apoio contínuo de aconselhamento. Se medicação puder ser útil, um psiquiatra também pode fazer parte de sua equipe de cuidados.",
        suggestions: [
          "Encontrar um psicólogo",
          "Encontrar um terapeuta",
          "Aprender sobre tratamentos",
          "Agendar consulta",
        ],
      };
    }

    if (mildKeywords.some((keyword) => lowerMessage.includes(keyword))) {
      return {
        needsProfessionalHelp: false,
        response:
          "Parece que você está lidando com algum estresse. Aqui estão algumas estratégias que podem ajudar: pratique exercícios de respiração profunda, tente a técnica de ancoragem 5-4-3-2-1, mantenha um horário regular de sono e pratique atividade física. Se esses sentimentos persistirem ou piorarem, considere conversar com um psicólogo ou terapeuta que pode fornecer estratégias personalizadas de enfrentamento.",
        suggestions: [
          "Tentar exercícios de respiração",
          "Praticar mindfulness",
          "Melhorar higiene do sono",
          "Considerar ver um psicólogo",
        ],
      };
    }

    // Default supportive response
    return {
      needsProfessionalHelp: false,
      response:
        "Obrigado por compartilhar comigo. Estou aqui para ouvir e apoiá-lo. Pode me contar mais sobre o que tem estado em sua mente ultimamente? Entender melhor sua situação me ajudará a fornecer orientação mais personalizada. Se você sentir que precisa de mais apoio, tanto psicólogos quanto terapeutas podem fornecer ajuda profissional adaptada às suas necessidades específicas.",
      suggestions: [
        "Conte-me mais",
        "Explorar estratégias de enfrentamento",
        "Aprender sobre psicologia",
        "Encontrar apoio de saúde mental",
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
            placeholder="Compartilhe o que está em sua mente..."
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
