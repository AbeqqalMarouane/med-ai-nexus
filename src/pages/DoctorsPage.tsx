
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import DoctorCard from "@/components/doctors/DoctorCard";
import DoctorFilters from "@/components/doctors/DoctorFilters";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterX, Search } from "lucide-react";

// Mock data for doctors
const doctorsData = [
  {
    id: "doc1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    location: "New York, NY",
    distance: "2.5 miles",
    rating: 4.8,
    experience: "15 years experience",
    availability: "Available today",
  },
  {
    id: "doc2",
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    location: "New York, NY",
    distance: "3.2 miles",
    rating: 4.7,
    experience: "12 years experience",
    availability: "Available tomorrow",
  },
  {
    id: "doc3",
    name: "Dr. Jessica Patel",
    specialty: "Pulmonology",
    location: "Jersey City, NJ",
    distance: "5.7 miles",
    rating: 4.5,
    experience: "8 years experience",
    availability: "Available this week",
  },
  {
    id: "doc4",
    name: "Dr. Robert Williams",
    specialty: "Oncology",
    location: "Brooklyn, NY",
    distance: "4.3 miles",
    rating: 4.9,
    experience: "20 years experience",
    availability: "Available next week",
  },
  {
    id: "doc5",
    name: "Dr. Emily Rodriguez",
    specialty: "Rheumatology",
    location: "Queens, NY",
    distance: "6.1 miles",
    rating: 4.6,
    experience: "10 years experience",
    availability: "Available today",
  },
  {
    id: "doc6",
    name: "Dr. David Kim",
    specialty: "Dermatology",
    location: "New York, NY",
    distance: "1.8 miles",
    rating: 4.4,
    experience: "7 years experience",
    availability: "Available tomorrow",
  },
];

const DoctorsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<any>({});
  const [filteredDoctors, setFilteredDoctors] = useState(doctorsData);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filtered = doctorsData.filter(
      doctor => 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredDoctors(filtered);
  };

  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters);
    
    let filtered = [...doctorsData];
    
    // Apply specialty filter
    if (filters.specialty) {
      filtered = filtered.filter(
        doctor => doctor.specialty.toLowerCase() === filters.specialty.toLowerCase()
      );
    }
    
    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(
        doctor => doctor.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    // Apply availability filter
    if (filters.availability) {
      const availabilityMap: Record<string, string> = {
        'today': 'today',
        'tomorrow': 'tomorrow',
        'this-week': 'this week',
        'next-week': 'next week',
      };
      filtered = filtered.filter(
        doctor => doctor.availability.toLowerCase().includes(availabilityMap[filters.availability])
      );
    }
    
    // Apply rating filter
    if (filters.rating !== 'any') {
      const minRating = filters.rating === '4plus' ? 4.0 : 4.5;
      filtered = filtered.filter(doctor => doctor.rating >= minRating);
    }
    
    setFilteredDoctors(filtered);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Find Specialized Doctors</h1>
          <p className="text-muted-foreground">
            Search for doctors based on specialty and location to address your specific medical needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Filters (desktop) */}
          <Card className="p-6 border-border/50 h-fit hidden md:block">
            <h2 className="text-xl font-semibold mb-4">Filter Doctors</h2>
            <DoctorFilters onFilterChange={handleFilterChange} />
          </Card>
          
          {/* Main content */}
          <div className="md:col-span-2 lg:col-span-3 space-y-6">
            {/* Search and filter buttons */}
            <div className="flex flex-wrap gap-4">
              <form onSubmit={handleSearch} className="flex-1 flex">
                <Input
                  placeholder="Search by name, specialty, or location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-r-none"
                />
                <Button type="submit" className="rounded-l-none">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </form>
              
              <Button
                variant="outline"
                className="md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FilterX className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
            
            {/* Mobile filters */}
            {showFilters && (
              <Card className="p-6 border-border/50 md:hidden">
                <h2 className="text-xl font-semibold mb-4">Filter Doctors</h2>
                <DoctorFilters onFilterChange={handleFilterChange} />
              </Card>
            )}
            
            {/* Results */}
            {filteredDoctors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No doctors found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find available doctors
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorsPage;
