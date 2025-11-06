import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, ArrowLeft, Plus, Star, Search, Filter, Calendar } from "lucide-react";

interface JournalEntry {
  id: number;
  title: string;
  date: string;
  type: 'interview' | 'reflection' | 'achievement' | 'learning';
  content: string;
  rating?: number;
  tags: string[];
  company?: string;
}

const Journal = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  
  const [entries] = useState<JournalEntry[]>([
    {
      id: 1,
      title: "Google Technical Interview Experience",
      date: "2024-03-12",
      type: "interview",
      content: "First round went well. Asked about binary trees and system design. Need to practice more on scalability questions. The interviewer was very friendly and gave me time to think through the problems.",
      rating: 4,
      tags: ["technical", "system-design", "binary-trees"],
      company: "Google"
    },
    {
      id: 2,
      title: "Daily Learning Reflection",
      date: "2024-03-11",
      type: "reflection",
      content: "Completed 5 LeetCode problems today. Struggling with dynamic programming. Plan to focus on this area tomorrow. Need to practice more medium-level problems before moving to hard ones.",
      rating: 3,
      tags: ["leetcode", "dynamic-programming", "practice"]
    },
    {
      id: 3,
      title: "Portfolio Project Completion",
      date: "2024-03-10",
      type: "achievement",
      content: "Successfully deployed my React portfolio website. Learned a lot about performance optimization and responsive design. Got positive feedback from 3 seniors who reviewed it.",
      rating: 5,
      tags: ["portfolio", "react", "deployment", "achievement"]
    },
    {
      id: 4,
      title: "Microsoft Behavioral Interview",
      date: "2024-03-08",
      type: "interview",
      content: "Behavioral interview focused on leadership and teamwork. Used STAR method for responses. Felt confident about my answers but could have prepared better examples for conflict resolution questions.",
      rating: 3,
      tags: ["behavioral", "leadership", "teamwork"],
      company: "Microsoft"
    },
    {
      id: 5,
      title: "System Design Study Session",
      date: "2024-03-07",
      type: "learning",
      content: "Studied load balancing and caching strategies. Watched 3 YouTube videos on distributed systems. Need to practice drawing diagrams and explaining trade-offs more clearly.",
      rating: 4,
      tags: ["system-design", "load-balancing", "caching"]
    }
  ]);

  const getTypeColor = (type: JournalEntry['type']) => {
    switch (type) {
      case 'interview': return 'bg-primary text-primary-foreground';
      case 'reflection': return 'bg-secondary text-secondary-foreground';
      case 'achievement': return 'bg-success text-success-foreground';
      case 'learning': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === "all" || entry.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getTypeStats = () => {
    const stats = {
      interview: entries.filter(e => e.type === 'interview').length,
      reflection: entries.filter(e => e.type === 'reflection').length,
      achievement: entries.filter(e => e.type === 'achievement').length,
      learning: entries.filter(e => e.type === 'learning').length,
    };
    return stats;
  };

  const stats = getTypeStats();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate("/")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Career Journal
              </h1>
              <p className="text-muted-foreground mt-2">
                Document your journey and reflect on your experiences
              </p>
            </div>
            <Link to="/log-achievement">
              <Button variant="hero">
                <Plus className="h-4 w-4 mr-2" />
                New Entry
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card shadow-custom-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Interviews</p>
                  <p className="text-2xl font-bold text-primary">{stats.interview}</p>
                </div>
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card shadow-custom-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Reflections</p>
                  <p className="text-2xl font-bold text-secondary">{stats.reflection}</p>
                </div>
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <BookOpen className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-custom-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Achievements</p>
                  <p className="text-2xl font-bold text-success">{stats.achievement}</p>
                </div>
                <div className="bg-success/10 p-2 rounded-lg">
                  <Star className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-custom-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Learning</p>
                  <p className="text-2xl font-bold text-accent">{stats.learning}</p>
                </div>
                <div className="bg-accent/10 p-2 rounded-lg">
                  <BookOpen className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6 shadow-custom-md">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search entries, tags, or content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="interview">Interviews</SelectItem>
                    <SelectItem value="reflection">Reflections</SelectItem>
                    <SelectItem value="achievement">Achievements</SelectItem>
                    <SelectItem value="learning">Learning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Journal Entries */}
        <div className="space-y-6">
          {filteredEntries.length === 0 ? (
            <Card className="shadow-custom-md">
              <CardContent className="p-12 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No entries found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || filterType !== "all" 
                    ? "Try adjusting your search or filter criteria."
                    : "Start documenting your career journey by creating your first entry."
                  }
                </p>
                <Link to="/log-achievement">
                  <Button variant="hero">
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Entry
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            filteredEntries.map((entry) => (
              <Card key={entry.id} className="shadow-custom-md hover:shadow-custom-lg transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{entry.title}</h3>
                        <Badge className={getTypeColor(entry.type)}>
                          {entry.type}
                        </Badge>
                        {entry.company && (
                          <Badge variant="outline">
                            {entry.company}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {formatDate(entry.date)}
                      </p>
                    </div>
                    {entry.rating && (
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < entry.rating! ? 'text-warning fill-warning' : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-foreground leading-relaxed mb-4">
                    {entry.content}
                  </p>
                  
                  {entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {entry.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      Edit Entry
                    </Button>
                    <Button variant="ghost" size="sm">
                      Add Tags
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;