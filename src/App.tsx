import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { ChatSection } from "./components/ChatSection";
import { FindSpecialist } from "./components/FindSpecialist";
import { MySchedule } from "./components/MySchedule";
import {
  MessageCircle,
  Search,
  Calendar,
  Heart,
  Shield,
  Users,
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

export default function App() {
  const [activeTab, setActiveTab] = useState("chat");
  const [selectedSpecialist, setSelectedSpecialist] = useState<{
    specialistName: string;
    specialistTitle: string;
  } | null>(null);

  const handleScheduleRequest = () => {
    setActiveTab("specialist");
  };

  const handleScheduleAppointment = (specialist: Specialist) => {
    setSelectedSpecialist({
      specialistName: specialist.name,
      specialistTitle: specialist.title,
    });
    setActiveTab("schedule");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <img
                src="src/images/psy-care-logo.png" // update to your actual path
                alt="PsyCare logo"
                style={{ backgroundColor: "transparent" }}
                className="w-10 h-10 object-contain"
                loading="eager"
                decoding="async"
              />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">
                <span style={{ color: "#032340" }}>Psy</span>
                <span style={{ color: "#6FBFB7" }}>Care</span>
              </h1>
              <p className="text-muted-foreground">
                Your mental health companion
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="chat" className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>Chat</span>
            </TabsTrigger>
            <TabsTrigger
              value="specialist"
              className="flex items-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>Find Specialist</span>
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>My Schedule</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <Card className="w-full max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat with PsyCare Assistant</span>
                </CardTitle>
                <p className="text-muted-foreground">
                  Share your thoughts and feelings in a safe, supportive
                  environment. Our AI assistant can provide coping strategies or
                  help you connect with professional support when needed.
                </p>
              </CardHeader>
              <CardContent>
                <ChatSection onScheduleRequest={handleScheduleRequest} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specialist">
            <div className="w-full max-w-6xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  Find a Mental Health Specialist
                </h2>
                <p className="text-muted-foreground">
                  Connect with qualified therapists, psychologists, and
                  psychiatrists in your area.
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="text-center p-4">
                  <div className="relative w-8 h-8 mx-auto mb-2">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      className="w-8 h-8"
                    >
                      <defs>
                        <linearGradient
                          id="shieldGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#A0D9B9" />
                          <stop offset="25%" stopColor="#6FBFB7" />
                          <stop offset="50%" stopColor="#94CEF2" />
                          <stop offset="75%" stopColor="#5B9ED9" />
                          <stop offset="100%" stopColor="#3973BF" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                        fill="none"
                        stroke="url(#shieldGradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-sm">
                    Licensed Professionals
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    All specialists are verified and licensed
                  </p>
                </Card>
                <Card className="text-center p-4">
                  <div className="relative w-8 h-8 mx-auto mb-2">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      className="w-8 h-8"
                    >
                      <defs>
                        <linearGradient
                          id="usersGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#A0D9B9" />
                          <stop offset="25%" stopColor="#6FBFB7" />
                          <stop offset="50%" stopColor="#94CEF2" />
                          <stop offset="75%" stopColor="#5B9ED9" />
                          <stop offset="100%" stopColor="#3973BF" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                        fill="none"
                        stroke="url(#usersGradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="9"
                        cy="7"
                        r="4"
                        fill="none"
                        stroke="url(#usersGradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 21v-2a4 4 0 0 0-3-3.87"
                        fill="none"
                        stroke="url(#usersGradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 3.13a4 4 0 0 1 0 7.75"
                        fill="none"
                        stroke="url(#usersGradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-sm">
                    Personalized Matching
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Find specialists that match your needs
                  </p>
                </Card>
                <Card className="text-center p-4">
                  <div className="relative w-8 h-8 mx-auto mb-2">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      className="w-8 h-8"
                    >
                      <defs>
                        <linearGradient
                          id="heartGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#A0D9B9" />
                          <stop offset="25%" stopColor="#6FBFB7" />
                          <stop offset="50%" stopColor="#94CEF2" />
                          <stop offset="75%" stopColor="#5B9ED9" />
                          <stop offset="100%" stopColor="#3973BF" />
                        </linearGradient>
                      </defs>
                      <path
                        d="m19 14-7 7-7-7a5 5 0 0 1 7-7 5 5 0 0 1 7 7z"
                        fill="none"
                        stroke="url(#heartGradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-sm">Compassionate Care</h3>
                  <p className="text-xs text-muted-foreground">
                    Dedicated to your mental wellness
                  </p>
                </Card>
              </div>

              <FindSpecialist
                onScheduleAppointment={handleScheduleAppointment}
              />
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <div className="w-full max-w-4xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">My Schedule</h2>
                <p className="text-muted-foreground">
                  Manage your therapy appointments and track your mental health
                  journey.
                </p>
              </div>
              <MySchedule newAppointment={selectedSpecialist} />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">
              <strong>Important:</strong> If you're experiencing a mental health
              crisis, please contact emergency services or a crisis helpline
              immediately.
            </p>
            <p className="text-xs mt-2">
              Crisis Text Line: Text HOME to 741741 | National Suicide
              Prevention Lifeline: 988
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
