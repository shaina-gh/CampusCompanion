import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Plus, Star, MessageCircle } from "lucide-react";

interface JournalEntry {
  id: number;
  title: string;
  date: string;
  type: 'interview' | 'reflection' | 'achievement' | 'learning';
  content: string;
  rating?: number;
}

const CareerJournal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: 1,
      title: "Google Technical Interview Experience",
      date: "2024-03-12",
      type: "interview",
      content: "First round went well. Asked about binary trees and system design. Need to practice more on scalability questions.",
      rating: 4
    },
    {
      id: 2,
      title: "Daily Learning Reflection",
      date: "2024-03-11",
      type: "reflection",
      content: "Completed 5 LeetCode problems today. Struggling with dynamic programming. Plan to focus on this area tomorrow.",
      rating: 3
    },
    {
      id: 3,
      title: "Portfolio Project Completion",
      date: "2024-03-10",
      type: "achievement",
      content: "Successfully deployed my React portfolio website. Learned a lot about performance optimization and responsive design.",
      rating: 5
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

  const handleAddEntry = () => {
    console.log("Add new journal entry clicked");
    alert("New Entry feature - would open a form to create new journal entry");
  };

  const handleViewEntry = (entryId: number) => {
    console.log("View entry:", entryId);
    alert(`View full details for journal entry ID: ${entryId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="bg-gradient-card shadow-custom-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Career Journal
          </CardTitle>
          <Button variant="hero" size="sm" onClick={handleAddEntry}>
            <Plus className="h-4 w-4" />
            New Entry
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="p-4 rounded-lg border bg-card/50 hover:bg-card transition-smooth"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-foreground">{entry.title}</h3>
                    <Badge className={getTypeColor(entry.type)}>
                      {entry.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {formatDate(entry.date)}
                  </p>
                </div>
                {entry.rating && (
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < entry.rating! ? 'text-warning fill-warning' : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {entry.content}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2"
                  onClick={() => handleViewEntry(entry.id)}
                >
                  <MessageCircle className="h-3 w-3" />
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-muted text-center">
          <p className="text-sm text-muted-foreground">
            Regular journaling helps track your growth and identify areas for improvement.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerJournal;