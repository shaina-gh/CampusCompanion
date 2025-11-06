import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { Target, ArrowLeft, Plus, TrendingUp, Clock, CheckCircle } from "lucide-react";

interface Skill {
  id: number;
  name: string;
  category: string;
  progress: number;
  target: number;
  unit: string;
  priority: 'high' | 'medium' | 'low';
  deadline?: string;
}

const Skills = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: 1,
      name: "Data Structures & Algorithms",
      category: "Technical",
      progress: 45,
      target: 100,
      unit: "problems",
      priority: "high",
      deadline: "2024-04-15"
    },
    {
      id: 2,
      name: "System Design",
      category: "Technical",
      progress: 3,
      target: 10,
      unit: "topics",
      priority: "high",
      deadline: "2024-04-01"
    },
    {
      id: 3,
      name: "React Development",
      category: "Framework",
      progress: 8,
      target: 15,
      unit: "projects",
      priority: "medium"
    },
    {
      id: 4,
      name: "Communication Skills",
      category: "Soft Skills",
      progress: 6,
      target: 12,
      unit: "sessions",
      priority: "medium"
    },
    {
      id: 5,
      name: "Machine Learning",
      category: "Technical",
      progress: 2,
      target: 8,
      unit: "courses",
      priority: "low"
    }
  ]);

  const updateProgress = (skillId: number, increment: number = 1) => {
    setSkills(skills.map(skill => 
      skill.id === skillId 
        ? { ...skill, progress: Math.max(0, Math.min(skill.progress + increment, skill.target)) }
        : skill
    ));
  };

  const getProgressPercentage = (skill: Skill) => {
    return Math.round((skill.progress / skill.target) * 100);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technical': return 'text-primary';
      case 'Framework': return 'text-secondary';
      case 'Soft Skills': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getTimeLeft = (deadline?: string) => {
    if (!deadline) return null;
    const days = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

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
                Skill Development
              </h1>
              <p className="text-muted-foreground mt-2">
                Track and manage your skill-building goals
              </p>
            </div>
            <Link to="/add-goal">
              <Button variant="hero">
                <Plus className="h-4 w-4 mr-2" />
                Add New Goal
              </Button>
            </Link>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card shadow-custom-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Goals</p>
                  <p className="text-2xl font-bold text-foreground">{skills.length}</p>
                </div>
                <Target className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card shadow-custom-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-success">
                    {skills.filter(s => getProgressPercentage(s) === 100).length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-custom-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-warning">
                    {skills.filter(s => getProgressPercentage(s) > 0 && getProgressPercentage(s) < 100).length}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-custom-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">High Priority</p>
                  <p className="text-2xl font-bold text-destructive">
                    {skills.filter(s => s.priority === 'high').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills List */}
        <div className="space-y-6">
          {skills.map((skill) => {
            const percentage = getProgressPercentage(skill);
            const timeLeft = getTimeLeft(skill.deadline);
            
            return (
              <Card key={skill.id} className="shadow-custom-md hover:shadow-custom-lg transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{skill.name}</h3>
                        <Badge className={getPriorityColor(skill.priority)}>
                          {skill.priority} priority
                        </Badge>
                        {timeLeft !== null && (
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 mr-1" />
                            {timeLeft > 0 ? `${timeLeft} days left` : 'Overdue'}
                          </Badge>
                        )}
                      </div>
                      <p className={`text-sm ${getCategoryColor(skill.category)} font-medium`}>
                        {skill.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">
                        {skill.progress}/{skill.target}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {skill.unit}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm font-medium text-foreground">{percentage}%</span>
                      </div>
                      <Progress value={percentage} className="h-3" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateProgress(skill.id, -1)}
                      disabled={skill.progress <= 0}
                    >
                      -1
                    </Button>
                    <Button 
                      variant="success" 
                      size="sm"
                      onClick={() => updateProgress(skill.id, 1)}
                      disabled={skill.progress >= skill.target}
                    >
                      +1 {skill.unit.slice(0, -1)}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateProgress(skill.id, 5)}
                      disabled={skill.progress >= skill.target}
                    >
                      +5
                    </Button>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      Edit Goal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Skills;