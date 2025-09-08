import React, { useState } from "react";
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
  ChevronLeft,
  ChevronRight,
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

const crisisPsychologists: CrisisPsychologist[] = [
  {
    id: "crisis-1",
    name: "Dr. Sarah Johnson",
    title: "Psicóloga Clínica Licenciada",
    specialties: ["Intervenção em Crise", "Ansiedade", "Depressão", "TEPT"],
    rating: 4.9,
    reviews: 127,
    location: "Centro de Saúde Mental São Paulo - SP",
    availability: "Disponível para consultas de emergência",
    phone: "(555) 123-4567",
    emergencyAvailable: true,
  },
  {
    id: "crisis-2",
    name: "Dr. João Silva",
    title: "Psicólogo Clínico",
    specialties: ["Crise Suicida", "Depressão", "Luto"],
    rating: 4.8,
    reviews: 98,
    location: "Clínica Vida Nova - RJ",
    availability: "Atendimento imediato disponível",
    phone: "(555) 987-6543",
    emergencyAvailable: true,
  },
  {
    id: "crisis-3",
    name: "Dra. Ana Souza",
    title: "Psicóloga Especialista em Emergências",
    specialties: ["Emergência", "Ansiedade", "Pânico"],
    rating: 4.7,
    reviews: 85,
    location: "Instituto Apoio SP",
    availability: "Plantão 24h",
    phone: "(555) 222-3344",
    emergencyAvailable: true,
  },
];

interface CrisisPsychologistCarouselProps {
  onSchedule: (psychologist: CrisisPsychologist) => void;
  onEmergencyCall: (psychologist: CrisisPsychologist) => void;
}

export function CrisisPsychologistCarousel({
  onSchedule,
  onEmergencyCall,
}: CrisisPsychologistCarouselProps) {
  const [index, setIndex] = useState(0);
  const psychologist = crisisPsychologists[index];

  const handlePrev = () => setIndex((prev) => (prev === 0 ? crisisPsychologists.length - 1 : prev - 1));
  const handleNext = () => setIndex((prev) => (prev === crisisPsychologists.length - 1 ? 0 : prev + 1));

  return (
    <Card
      className="border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800"
      style={{ borderColor: "#94CEF2", backgroundColor: "#f0f8ff" }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2" style={{ color: "#5B9ED9" }}>
          <AlertTriangle className="w-5 h-5" />
          <CardTitle className="text-lg">Suporte profissional imediato disponível</CardTitle>
        </div>
        <p className="text-sm" style={{ color: "#3973BF" }}>
          Estamos preocupados com você. Aqui estão especialistas em crises que podem ajudar agora mesmo.
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-start space-x-4 bg-white dark:bg-gray-900 p-4 rounded-lg">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {psychologist.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div>
              <h4 className="font-semibold">{psychologist.name}</h4>
              <p className="text-sm text-muted-foreground">{psychologist.title}</p>
            </div>

            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{psychologist.rating}</span>
                <span className="text-muted-foreground">
                  ({psychologist.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{psychologist.location}</span>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">{psychologist.availability}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {psychologist.specialties.slice(0, 3).map((specialty) => (
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
              onClick={() => onEmergencyCall(psychologist)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              <Phone className="w-4 h-4 mr-2" />
              Ligue agora - Emergência
            </Button>
            <Button
              onClick={() => onSchedule(psychologist)}
              variant="outline"
              className="flex-1 border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Agendar consulta
            </Button>
          </div>

          <div className="text-xs text-center text-muted-foreground bg-white dark:bg-gray-900 p-3 rounded-md border">
            <strong>Recursos de crise:</strong> Prevenção Nacional do Suicídio Linha de vida: 188 | Emergência: 192 ou 193
          </div>
        </div>

        {/* Navegação do carrossel */}
        <div className="flex justify-center items-center gap-2 mt-2">
          <Button variant="ghost" size="icon" onClick={handlePrev} aria-label="Anterior">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <span className="text-xs text-muted-foreground">
            {index + 1} de {crisisPsychologists.length}
          </span>
          <Button variant="ghost" size="icon" onClick={handleNext} aria-label="Próximo">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
