
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  distance: string;
  rating: number;
  availability: string;
  imageUrl?: string;
  experience: string;
}

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <Card className="h-full border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <div className="h-full w-full rounded-full bg-secondary/80 flex items-center justify-center text-xl font-bold">
              {doctor.name.charAt(0)}
            </div>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{doctor.name}</h3>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {doctor.specialty}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
            <span className="text-muted-foreground">{doctor.location} • <span className="text-accent">{doctor.distance}</span></span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-2" />
            <span>{doctor.rating.toFixed(1)} • {doctor.experience}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-muted-foreground mr-2" />
            <span className="text-muted-foreground">{doctor.availability}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex space-x-2 w-full">
          <Button variant="outline" size="sm" className="flex-1">
            View Profile
          </Button>
          <Button size="sm" className="flex-1">
            Book Appointment
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
