import { useState } from "react";
import { Trophy, Award, Star, Calendar, Building2, Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAchievements } from "@/hooks/useAchievements";
import { format } from "date-fns";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Achievements = () => {
  const { achievements, loading } = useAchievements();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'certification': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'project': return 'bg-green-100 text-green-800 border-green-200';
      case 'award': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'publication': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'skill_milestone': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'interview_success': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'job_offer': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'certification': return <Award className="h-5 w-5" />;
      case 'project': return <Building2 className="h-5 w-5" />;
      case 'award': return <Trophy className="h-5 w-5" />;
      case 'publication': return <Star className="h-5 w-5" />;
      case 'skill_milestone': return <Star className="h-5 w-5" />;
      case 'interview_success': return <Trophy className="h-5 w-5" />;
      case 'job_offer': return <Award className="h-5 w-5" />;
      default: return <Star className="h-5 w-5" />;
    }
  };

  const filteredAchievements = achievements.filter(achievement => {
    const matchesSearch = achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         achievement.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         achievement.organization?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || achievement.achievement_type === typeFilter;
    return matchesSearch && matchesType;
  });

  const featuredAchievements = achievements.filter(a => a.is_featured).length;
  const thisYearAchievements = achievements.filter(a => 
    new Date(a.date_achieved).getFullYear() === new Date().getFullYear()
  ).length;
  const certifications = achievements.filter(a => a.achievement_type === 'certification').length;

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
            <h1 className="text-3xl font-bold text-foreground mb-2">Achievement Portfolio</h1>
            <p className="text-muted-foreground">
              Showcase your accomplishments and milestones
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Achievement
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Trophy className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{achievements.length}</p>
                  <p className="text-sm text-muted-foreground">Total Achievements</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{featuredAchievements}</p>
                  <p className="text-sm text-muted-foreground">Featured</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{thisYearAchievements}</p>
                  <p className="text-sm text-muted-foreground">This Year</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{certifications}</p>
                  <p className="text-sm text-muted-foreground">Certifications</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Input
              placeholder="Search achievements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="certification">Certification</SelectItem>
              <SelectItem value="project">Project</SelectItem>
              <SelectItem value="award">Award</SelectItem>
              <SelectItem value="publication">Publication</SelectItem>
              <SelectItem value="skill_milestone">Skill Milestone</SelectItem>
              <SelectItem value="interview_success">Interview Success</SelectItem>
              <SelectItem value="job_offer">Job Offer</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.length === 0 ? (
            <div className="col-span-full">
              <Card>
                <CardContent className="p-12 text-center">
                  <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No achievements found</h3>
                  <p className="text-muted-foreground mb-4">
                    {achievements.length === 0 
                      ? "Start documenting your achievements and milestones."
                      : "Try adjusting your search or filter criteria."
                    }
                  </p>
                  <Button>Add Your First Achievement</Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            filteredAchievements.map((achievement) => (
              <Card key={achievement.id} className={`transition-shadow hover:shadow-md ${achievement.is_featured ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2 bg-muted rounded-lg">
                      {getTypeIcon(achievement.achievement_type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                        {achievement.is_featured && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current ml-2 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {achievement.organization} • {format(new Date(achievement.date_achieved), 'MMM yyyy')}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <Badge className={getTypeColor(achievement.achievement_type)}>
                      {achievement.achievement_type.replace('_', ' ')}
                    </Badge>
                  </div>

                  {achievement.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {achievement.description}
                    </p>
                  )}

                  {achievement.skills_used && achievement.skills_used.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-foreground mb-2">Skills Used:</p>
                      <div className="flex flex-wrap gap-1">
                        {achievement.skills_used.slice(0, 4).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {achievement.skills_used.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{achievement.skills_used.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {achievement.impact_description && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-foreground mb-1">Impact:</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {achievement.impact_description}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    {achievement.verification_url && (
                      <Button variant="outline" size="sm" className="flex-1">
                        Verify
                      </Button>
                    )}
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

export default Achievements;