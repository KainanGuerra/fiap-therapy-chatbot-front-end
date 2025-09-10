import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  MapPin,
  Star,
  Clock,
  Phone,
  Mail,
  Calendar,
  Filter,
} from "lucide-react";

interface Specialist {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  availability: string;
  phone: string;
  email: string;
  bio: string;
  price: string;
}

const mockSpecialists: Specialist[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    title: "Psicóloga Clínica Licenciada",
    specialties: [
      "Avaliação Psicológica",
      "Psicologia Clínica",
      "Psicologia em Saúde",
      "Psicologia Hospitalar"
    ].sort(),
    rating: 4.9,
    reviews: 127,
    location: "Centro Médico Vila Madalena - São Paulo",
    distance: "3,7 km",
    availability: "Disponível esta semana",
    phone: "(555) 123-4567",
    email: "sarah.johnson@therapy.com",
    bio: "Dra. Johnson tem mais de 10 anos de experiência ajudando indivíduos a superar desafios emocionais e clínicos através de abordagens terapêuticas baseadas em evidências.",
    price: "R$120-150/sessão",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    title: "Psicólogo Organizacional e do Trabalho",
    specialties: [
      "Psicologia Organizacional e do Trabalho",
      "Psicologia Social",
      "Psicologia Jurídica"
    ].sort(),
    rating: 4.8,
    reviews: 89,
    location: "Clínica Connect Mind Zona Oeste - São Paulo",
    distance: "6,6 km",
    availability: "Próximo disponível: Segunda-feira",
    phone: "(555) 234-5678",
    email: "michael.chen@wellness.com",
    bio: "Especialista em psicologia do trabalho, social e jurídica, atuando em ambientes corporativos e jurídicos.",
    price: "R$180-220/sessão",
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    title: "Psicopedagoga e Psicomotricista",
    specialties: [
      "Psicopedagogia",
      "Psicomotricidade",
      "Psicologia Escolar e Educacional"
    ].sort(),
    rating: 4.7,
    reviews: 156,
    location: "Centro de Terapia Familiar - Ipanema, Rio de Janeiro",
    distance: "2,9 km",
    availability: "Disponível hoje",
    phone: "(555) 345-6789",
    email: "emily.rodriguez@family.com",
    bio: "Dedicada a ajudar crianças e adolescentes no desenvolvimento escolar, psicomotor e pedagógico.",
    price: "R$100-130/sessão",
  },
  {
    id: "4",
    name: "Dr. Lisa Thompson",
    title: "Neuropsicóloga",
    specialties: [
      "Neuropsicologia",
      "Avaliação Psicológica",
      "Psicologia Clínica"
    ].sort(),
    rating: 4.8,
    reviews: 94,
    location: "Centro de Saúde Mental e Neurológica - Botafogo, Rio de Janeiro",
    distance: "4,7 km",
    availability: "Disponível na próxima semana",
    phone: "(555) 567-8901",
    email: "lisa.thompson@mindbrain.com",
    bio: "Especializa-se em avaliação e tratamento neuropsicológico, ajudando indivíduos a entender como a função cerebral afeta o comportamento e aprendizagem.",
    price: "R$200-250/sessão",
  },
  {
    id: "5",
    name: "Dr. James Wilson",
    title: "Psicólogo do Esporte e Tráfego",
    specialties: [
      "Psicologia do Esporte",
      "Psicologia de Tráfego",
      "Psicologia em Saúde"
    ].sort(),
    rating: 4.6,
    reviews: 203,
    location: "Instituto de Recuperação e ConnectMind - Bela Vista, São Paulo",
    distance: "6,0 km",
    availability: "Próximo disponível: Quarta-feira",
    phone: "(555) 456-7890",
    email: "james.wilson@recovery.com",
    bio: "Experiente em psicologia do esporte, tráfego e saúde, promovendo bem-estar e desempenho.",
    price: "R$140-170/sessão",
  },
  {
    id: "6",
    name: "Dr. David Kumar",
    title: "Psicólogo Social e Hospitalar",
    specialties: [
      "Psicologia Social",
      "Psicologia Hospitalar",
      "Psicologia em Saúde"
    ].sort(),
    rating: 4.7,
    reviews: 112,
    location: "Associados em Saúde Comportamental - Pinheiros, São Paulo",
    distance: "5,1 km",
    availability: "Disponível esta semana",
    phone: "(555) 678-9012",
    email: "david.kumar@behavioral.com",
    bio: "Especialista em psicologia social, hospitalar e saúde, com foco em contextos clínicos e institucionais.",
    price: "R$130-160/sessão",
  },
];

interface FindSpecialistProps {
  onScheduleAppointment: (specialist: Specialist) => void;
}

export function FindSpecialist({ onScheduleAppointment }: FindSpecialistProps) {
  const [specialists, setSpecialists] = useState(mockSpecialists);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const allSpecialties = Array.from(
    new Set(mockSpecialists.flatMap((s) => s.specialties))
  ).sort();

  const filteredAndSortedSpecialists = specialists
    .filter((specialist) => {
      const matchesSearch =
        specialist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        specialist.specialties.some((specialty) =>
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesSpecialty =
        selectedSpecialty === "all" ||
        specialist.specialties.includes(selectedSpecialty);
      return matchesSearch && matchesSpecialty;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "distance":
          return parseFloat(a.distance) - parseFloat(b.distance);
        case "price":
          return (
            parseInt(a.price.split("-")[0].replace("R$", "")) -
            parseInt(b.price.split("-")[0].replace("R$", ""))
          );
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar por nome ou especialidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={selectedSpecialty}
              onValueChange={setSelectedSpecialty}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Especialidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Especialidades</SelectItem>
                {allSpecialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Avaliação</SelectItem>
                <SelectItem value="distance">Distância</SelectItem>
                <SelectItem value="price">Preço</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <p className="text-muted-foreground">
          {filteredAndSortedSpecialists.length} especialistas encontrados
        </p>

        {filteredAndSortedSpecialists.map((specialist) => (
          <Card
            key={specialist.id}
            className="hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={`/images/dr${specialist.id}.png`}
                      alt={specialist.name}
                    />
                    <AvatarFallback>
                      {specialist.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{specialist.name}</CardTitle>
                    <p className="text-muted-foreground">{specialist.title}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{specialist.rating}</span>
                        <span className="text-muted-foreground">
                          ({specialist.reviews} reviews)
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{specialist.distance}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{specialist.price}</p>
                  <div className="flex items-center space-x-1 text-green-600 mt-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{specialist.availability}</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{specialist.bio}</p>

              <div className="space-y-2">
                <p className="text-sm font-medium">Especialidades:</p>
                <div className="flex flex-wrap gap-2">
                  {specialist.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{specialist.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Phone className="w-4 h-4" />
                    <span>{specialist.phone}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Contato
                  </Button>
                  <button
                    onClick={() => onScheduleAppointment(specialist)}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-8 px-3 transition-all"
                    style={{
                      backgroundColor: "#5B9ED9",
                      color: "white",
                      border: "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#3973BF")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#5B9ED9")
                    }
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Agendar
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
