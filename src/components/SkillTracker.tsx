import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Code2, Target, TrendingUp, Plus } from "lucide-react";

interface Skill {
  id: number;
  name: string;
  category: string;
  progress: number;
  target: number;
  unit: string;
}

const SkillTracker = () => {
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: 1,
      name: "Data Structures & Algorithms",
      category: "Technical",
      progress: 45,
      target: 100,
      unit: "problems"
    },
    {
      id: 2,
      name: "System Design",
      category: "Technical",
      progress: 3,
      target: 10,
      unit: "topics"
    },
    {
      id: 3,
      name: "React Development",
      category: "Framework",
      progress: 8,
      target: 15,
      unit: "projects"
    },
    {
      id: 4,
      name: "Communication Skills",
      category: "Soft Skills",
      progress: 6,
      target: 12,
      unit: "sessions"
    }
  ]);

  const handleAddGoal = () => {
    console.log("Add new goal clicked");
    alert("Add Goal feature - would open a form to create new skill development goal");
  };

  const handleUpdateProgress = (skillId: number) => {
    console.log("Update progress for skill:", skillId);
    // In a real app, this would increment the progress
    setSkills(skills.map(skill => 
      skill.id === skillId 
        ? { ...skill, progress: Math.min(skill.progress + 1, skill.target) }
        : skill
    ));
  };

  const getProgressPercentage = (skill: Skill) => {
    return Math.round((skill.progress / skill.target) * 100);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technical': return 'text-primary';
      case 'Framework': return 'text-secondary';
      case 'Soft Skills': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card className="bg-gradient-card shadow-custom-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Skill Development Goals
          </CardTitle>
          <Button variant="success" size="sm" onClick={handleAddGoal}>
            <Plus className="h-4 w-4" />
            Add Goal
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {skills.map((skill) => (
            <div key={skill.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">{skill.name}</h3>
                  <p className={`text-sm ${getCategoryColor(skill.category)}`}>
                    {skill.category}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">
                    {skill.progress}/{skill.target} {skill.unit}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {getProgressPercentage(skill)}% complete
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Progress 
                  value={getProgressPercentage(skill)} 
                  className="h-2 flex-1"
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleUpdateProgress(skill.id)}
                  className="h-6 px-2 text-xs"
                >
                  +1
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-muted">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="text-sm font-medium text-foreground">This Week's Progress</span>
          </div>
          <p className="text-xs text-muted-foreground">
            You've completed 12 DSA problems and 1 system design topic. Keep it up!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillTracker;