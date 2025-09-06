import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar, Clock, MapPin, Phone, Video, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';

interface Appointment {
  id: string;
  specialistName: string;
  specialistTitle: string;
  date: string;
  time: string;
  duration: string;
  type: 'in-person' | 'video' | 'phone';
  status: 'upcoming' | 'completed' | 'cancelled';
  location?: string;
  notes?: string;
  sessionType: string;
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    specialistName: 'Dr. Sarah Johnson',
    specialistTitle: 'Licensed Clinical Psychologist',
    date: '2024-09-10',
    time: '2:00 PM',
    duration: '50 minutes',
    type: 'video',
    status: 'upcoming',
    sessionType: 'Individual Therapy',
    notes: 'Follow-up on anxiety management techniques'
  },
  {
    id: '2',
    specialistName: 'Dr. Emily Rodriguez',
    specialistTitle: 'Licensed Marriage & Family Therapist',
    date: '2024-09-12',
    time: '10:00 AM',
    duration: '60 minutes',
    type: 'in-person',
    status: 'upcoming',
    location: 'Family Counseling Center',
    sessionType: 'Couples Therapy'
  },
  {
    id: '3',
    specialistName: 'Dr. Michael Chen',
    specialistTitle: 'Psychiatrist & Therapist',
    date: '2024-09-05',
    time: '3:30 PM',
    duration: '30 minutes',
    type: 'phone',
    status: 'completed',
    sessionType: 'Medication Check-in',
    notes: 'Discussed medication adjustments'
  },
  {
    id: '4',
    specialistName: 'Dr. Sarah Johnson',
    specialistTitle: 'Licensed Clinical Psychologist',
    date: '2024-08-28',
    time: '2:00 PM',
    duration: '50 minutes',
    type: 'video',
    status: 'completed',
    sessionType: 'Individual Therapy',
    notes: 'Worked on cognitive behavioral techniques'
  }
];

interface MyScheduleProps {
  newAppointment?: {
    specialistName: string;
    specialistTitle: string;
  } | null;
}

export function MySchedule({ newAppointment }: MyScheduleProps) {
  const [appointments, setAppointments] = useState(mockAppointments);
  
  const upcomingAppointments = appointments.filter(apt => apt.status === 'upcoming');
  const pastAppointments = appointments.filter(apt => apt.status === 'completed');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'phone':
        return <Phone className="w-4 h-4" />;
      case 'in-person':
        return <MapPin className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const AppointmentCard = ({ appointment }: { appointment: Appointment }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback>
                {appointment.specialistName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{appointment.specialistName}</CardTitle>
              <p className="text-sm text-muted-foreground">{appointment.specialistTitle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusIcon(appointment.status)}
            <Badge variant={appointment.status === 'upcoming' ? 'default' : 'secondary'}>
              {appointment.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{formatDate(appointment.date)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{appointment.time} ({appointment.duration})</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            {getTypeIcon(appointment.type)}
            <span className="capitalize">{appointment.type.replace('-', ' ')}</span>
          </div>
          {appointment.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{appointment.location}</span>
            </div>
          )}
        </div>
        
        <div className="pt-2">
          <Badge variant="outline">{appointment.sessionType}</Badge>
        </div>
        
        {appointment.notes && (
          <div className="pt-2">
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              {appointment.notes}
            </p>
          </div>
        )}
        
        {appointment.status === 'upcoming' && (
          <div className="flex space-x-2 pt-3">
            <Button variant="outline" size="sm">
              Reschedule
            </Button>
            <Button variant="outline" size="sm">
              Cancel
            </Button>
            {appointment.type === 'video' && (
              <Button size="sm" className="ml-auto">
                <Video className="w-4 h-4 mr-2" />
                Join Session
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {newAppointment && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <p>Ready to schedule with {newAppointment.specialistName}? Contact them to book your appointment.</p>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingAppointments.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past Sessions ({pastAppointments.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4 mt-6">
          {upcomingAppointments.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No upcoming appointments</h3>
                <p className="text-muted-foreground">
                  Schedule your first session to get started on your mental health journey.
                </p>
              </CardContent>
            </Card>
          ) : (
            upcomingAppointments.map(appointment => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-4 mt-6">
          {pastAppointments.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No past sessions</h3>
                <p className="text-muted-foreground">
                  Your completed therapy sessions will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            pastAppointments.map(appointment => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}