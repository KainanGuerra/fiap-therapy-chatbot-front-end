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
    title: "Licensed Clinical Psychologist",
    specialties: [
      "Anxiety",
      "Depression",
      "PTSD",
      "Cognitive Behavioral Therapy",
    ],
    rating: 4.9,
    reviews: 127,
    location: "Downtown Medical Center",
    distance: "2.3 miles",
    availability: "Available this week",
    phone: "(555) 123-4567",
    email: "sarah.johnson@therapy.com",
    bio: "Dr. Johnson has over 10 years of experience helping individuals overcome anxiety and depression through evidence-based therapeutic approaches.",
    price: "R$120-150/session",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    title: "Psychiatrist & Therapist",
    specialties: [
      "Bipolar Disorder",
      "Medication Management",
      "Mood Disorders",
    ],
    rating: 4.8,
    reviews: 89,
    location: "Westside Wellness Clinic",
    distance: "4.1 miles",
    availability: "Next available: Monday",
    phone: "(555) 234-5678",
    email: "michael.chen@wellness.com",
    bio: "Specializes in combining medication management with therapy for comprehensive mental health treatment.",
    price: "R$180-220/session",
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    title: "Licensed Marriage & Family Therapist",
    specialties: ["Couples Therapy", "Family Therapy", "Relationship Issues"],
    rating: 4.7,
    reviews: 156,
    location: "Family Counseling Center",
    distance: "1.8 miles",
    availability: "Available today",
    phone: "(555) 345-6789",
    email: "emily.rodriguez@family.com",
    bio: "Dedicated to helping couples and families build stronger, healthier relationships through effective communication.",
    price: "R$100-130/session",
  },
  {
    id: "5",
    name: "Dr. James Wilson",
    title: "Clinical Psychologist",
    specialties: ["Trauma", "EMDR", "Addiction Recovery", "Group Therapy"],
    rating: 4.6,
    reviews: 203,
    location: "Recovery & Wellness Institute",
    distance: "3.7 miles",
    availability: "Next available: Wednesday",
    phone: "(555) 456-7890",
    email: "james.wilson@recovery.com",
    bio: "Experienced in trauma recovery and addiction treatment with a focus on holistic healing approaches.",
    price: "R$140-170/session",
  },
  {
    id: "4",
    name: "Dr. Lisa Thompson",
    title: "Neuropsychologist",
    specialties: [
      "ADHD Assessment",
      "Cognitive Assessment",
      "Learning Disabilities",
      "Brain Injury",
    ],
    rating: 4.8,
    reviews: 94,
    location: "Mind & Brain Health Center",
    distance: "2.9 miles",
    availability: "Available next week",
    phone: "(555) 567-8901",
    email: "lisa.thompson@mindbrain.com",
    bio: "Specializes in neuropsychological assessment and treatment, helping individuals understand how brain function affects behavior and learning.",
    price: "R$200-250/session",
  },
  {
    id: "6",
    name: "Dr. David Kumar",
    title: "Behavioral Psychologist",
    specialties: ["Behavior Modification", "OCD", "Phobias", "Habit Disorders"],
    rating: 4.7,
    reviews: 112,
    location: "Behavioral Health Associates",
    distance: "3.2 miles",
    availability: "Available this week",
    phone: "(555) 678-9012",
    email: "david.kumar@behavioral.com",
    bio: "Expert in behavior analysis and modification techniques, specializing in treating obsessive-compulsive disorder and specific phobias.",
    price: "R$130-160/session",
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
              placeholder="Search by name or specialty..."
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
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
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
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="distance">Distance</SelectItem>
                <SelectItem value="price">Price</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <p className="text-muted-foreground">
          {filteredAndSortedSpecialists.length} specialists found
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
                      src={`/src/images/dr${specialist.id}.png`}
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
                <p className="text-sm font-medium">Specialties:</p>
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
                    Contact
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
                    Schedule
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
