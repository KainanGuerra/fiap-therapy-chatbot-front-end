import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  AlertTriangle,
  Phone,
  Calendar,
  MapPin,
  Star,
  Clock,
} from "lucide-react";

interface CrisisPsychologist {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  rating: number;
  reviews: number;
  location: string;
  availability: string;
  phone: string;
  emergencyAvailable: boolean;
}

const crisisPsychologist: CrisisPsychologist = {
  id: "crisis-1",
  name: "Dr. Sarah Johnson",
  title: "Licensed Clinical Psychologist",
  specialties: ["Intervenção em Crise", "Ansiedade", "Depressão", "TEPT"],
  rating: 4.9,
  reviews: 127,
  location: "Downtown Medical Center",
  availability: "Disponível para consultas de emergência",
  phone: "(555) 123-4567",
  emergencyAvailable: true,
};

interface CrisisPsychologistCardProps {
  onSchedule: () => void;
  onEmergencyCall: () => void;
}

export function CrisisPsychologistCard({
  onSchedule,
  onEmergencyCall,
}: CrisisPsychologistCardProps) {
  return (
    <Card
      className="border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800"
      style={{ borderColor: "#94CEF2", backgroundColor: "#f0f8ff" }}
    >
      <CardHeader className="pb-3">
        <div
          className="flex items-center space-x-2"
          style={{ color: "#5B9ED9" }}
        >
          <AlertTriangle className="w-5 h-5" />
          <CardTitle className="text-lg">
            Suporte profissional imediato disponível
          </CardTitle>
        </div>
        <p className="text-sm" style={{ color: "#3973BF" }}>
          Estamos preocupados com você. Aqui está um especialista em crises que
          pode ajudar agora mesmo.
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-start space-x-4 bg-white dark:bg-gray-900 p-4 rounded-lg">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {crisisPsychologist.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div>
              <h4 className="font-semibold">{crisisPsychologist.name}</h4>
              <p className="text-sm text-muted-foreground">
                {crisisPsychologist.title}
              </p>
            </div>

            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{crisisPsychologist.rating}</span>
                <span className="text-muted-foreground">
                  ({crisisPsychologist.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{crisisPsychologist.location}</span>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">
                {crisisPsychologist.availability}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {crisisPsychologist.specialties.slice(0, 3).map((specialty) => (
                <Badge key={specialty} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex space-x-2">
            <Button
              onClick={onEmergencyCall}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              <Phone className="w-4 h-4 mr-2" />
              Ligue agora - Emergência
            </Button>
            <Button
              onClick={onSchedule}
              variant="outline"
              className="flex-1 border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Agendar consulta
            </Button>
          </div>

          <div className="text-xs text-center text-muted-foreground bg-white dark:bg-gray-900 p-3 rounded-md border">
            <strong>Recursos de crise:</strong> Prevenção Nacional do Suicídio
            Linha de vida: 988 | Linha de texto de crise: 741741
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
