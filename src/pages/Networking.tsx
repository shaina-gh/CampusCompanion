import { useState } from "react";
import { Users, Mail, Phone, Linkedin, MapPin, Plus, Search, Filter, Star, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useContacts } from "@/hooks/useContacts";
import { format } from "date-fns";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Networking = () => {
  const { contacts, loading } = useContacts();
  const [searchTerm, setSearchTerm] = useState("");
  const [relationshipFilter, setRelationshipFilter] = useState<string>("all");
  const [strengthFilter, setStrengthFilter] = useState<string>("all");

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case 'recruiter': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'manager': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'employee': return 'bg-green-100 text-green-800 border-green-200';
      case 'alumni': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'mentor': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'hr': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'peer': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'strong': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'weak': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.position?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRelationship = relationshipFilter === 'all' || contact.relationship === relationshipFilter;
    const matchesStrength = strengthFilter === 'all' || contact.connection_strength === strengthFilter;
    return matchesSearch && matchesRelationship && matchesStrength;
  });

  const strongConnections = contacts.filter(c => c.connection_strength === 'strong').length;
  const referralPotential = contacts.filter(c => c.referral_potential).length;
  const recruiters = contacts.filter(c => c.relationship === 'recruiter').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-background">
        <Navbar />
        <main className="container mx-auto px-6 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      <Navbar />
      
      <main className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Network Management</h1>
            <p className="text-muted-foreground">
              Build and maintain your professional network
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Contact
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{contacts.length}</p>
                  <p className="text-sm text-muted-foreground">Total Contacts</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{strongConnections}</p>
                  <p className="text-sm text-muted-foreground">Strong Connections</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{referralPotential}</p>
                  <p className="text-sm text-muted-foreground">Referral Potential</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{recruiters}</p>
                  <p className="text-sm text-muted-foreground">Recruiters</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          </div>
          <Select value={relationshipFilter} onValueChange={setRelationshipFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Relationship" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Relationships</SelectItem>
              <SelectItem value="recruiter">Recruiter</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="employee">Employee</SelectItem>
              <SelectItem value="alumni">Alumni</SelectItem>
              <SelectItem value="mentor">Mentor</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
              <SelectItem value="peer">Peer</SelectItem>
            </SelectContent>
          </Select>
          <Select value={strengthFilter} onValueChange={setStrengthFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Connection Strength" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Strengths</SelectItem>
              <SelectItem value="strong">Strong</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="weak">Weak</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.length === 0 ? (
            <div className="col-span-full">
              <Card>
                <CardContent className="p-12 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No contacts found</h3>
                  <p className="text-muted-foreground mb-4">
                    {contacts.length === 0 
                      ? "Start building your professional network."
                      : "Try adjusting your search or filter criteria."
                    }
                  </p>
                  <Button>Add Your First Contact</Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            filteredContacts.map((contact) => (
              <Card key={contact.id} className="transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(contact.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{contact.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {contact.position} {contact.position && contact.company && 'at'} {contact.company}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className={`h-2 w-2 rounded-full ${getStrengthColor(contact.connection_strength)}`} />
                        <span className={`text-xs font-medium ${getStrengthColor(contact.connection_strength)}`}>
                          {contact.connection_strength} connection
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className={getRelationshipColor(contact.relationship)}>
                      {contact.relationship}
                    </Badge>
                    {contact.referral_potential && (
                      <Badge variant="outline" className="text-green-700 border-green-300">
                        Referral Potential
                      </Badge>
                    )}
                  </div>

                  {contact.tags && contact.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {contact.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {contact.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{contact.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="flex justify-between items-center text-xs text-muted-foreground mb-4">
                    <span>
                      Last contacted: {contact.last_contacted 
                        ? format(new Date(contact.last_contacted), 'MMM dd, yyyy')
                        : 'Never'
                      }
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {contact.email && (
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <Mail className="h-3 w-3" />
                        Email
                      </Button>
                    )}
                    {contact.linkedin_url && (
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <Linkedin className="h-3 w-3" />
                        LinkedIn
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <MapPin className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Networking;