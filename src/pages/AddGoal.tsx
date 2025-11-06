import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Target, ArrowLeft, Calendar, TrendingUp } from "lucide-react";

const AddGoal = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    currentProgress: 0,
    targetValue: 0,
    unit: "",
    priority: "",
    deadline: "",
    description: "",
    weeklyTarget: 0,
    resources: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding new goal:", formData);
    alert("New skill development goal added successfully!");
    navigate("/skills");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate("/skills")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Skills
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Set New Goal
          </h1>
          <p className="text-muted-foreground mt-2">
            Create a new skill development goal to track your progress
          </p>
        </div>

        <Card className="max-w-2xl shadow-custom-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Goal Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-2">
                <Label htmlFor="name">Goal Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Master Data Structures & Algorithms"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technical">Technical Skills</SelectItem>
                      <SelectItem value="Framework">Framework/Library</SelectItem>
                      <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                      <SelectItem value="Domain">Domain Knowledge</SelectItem>
                      <SelectItem value="Certification">Certification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level *</Label>
                  <Select onValueChange={(value) => setFormData({...formData, priority: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="low">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Progress Tracking */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentProgress">Current Progress</Label>
                  <Input
                    id="currentProgress"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.currentProgress}
                    onChange={(e) => setFormData({...formData, currentProgress: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetValue">Target Value *</Label>
                  <Input
                    id="targetValue"
                    type="number"
                    min="1"
                    placeholder="100"
                    value={formData.targetValue}
                    onChange={(e) => setFormData({...formData, targetValue: parseInt(e.target.value) || 0})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit *</Label>
                  <Select onValueChange={(value) => setFormData({...formData, unit: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="problems">Problems</SelectItem>
                      <SelectItem value="projects">Projects</SelectItem>
                      <SelectItem value="hours">Hours</SelectItem>
                      <SelectItem value="courses">Courses</SelectItem>
                      <SelectItem value="topics">Topics</SelectItem>
                      <SelectItem value="sessions">Sessions</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                      <SelectItem value="articles">Articles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weeklyTarget">Weekly Target</Label>
                  <div className="relative">
                    <TrendingUp className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="weeklyTarget"
                      type="number"
                      min="1"
                      placeholder="5"
                      value={formData.weeklyTarget}
                      onChange={(e) => setFormData({...formData, weeklyTarget: parseInt(e.target.value) || 0})}
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    How many {formData.unit || 'units'} per week?
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Target Deadline</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your goal, what you want to achieve, and why it's important..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resources">Learning Resources</Label>
                <Textarea
                  id="resources"
                  placeholder="List books, courses, websites, or other resources you'll use..."
                  value={formData.resources}
                  onChange={(e) => setFormData({...formData, resources: e.target.value})}
                  rows={3}
                />
              </div>

              {/* Progress Preview */}
              {formData.targetValue > 0 && (
                <div className="p-4 bg-muted/30 rounded-lg border">
                  <h4 className="font-medium text-foreground mb-2">Goal Preview</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      <strong>Progress:</strong> {formData.currentProgress}/{formData.targetValue} {formData.unit}
                    </p>
                    {formData.weeklyTarget > 0 && formData.targetValue > 0 && (
                      <p>
                        <strong>Estimated completion:</strong> ~
                        {Math.ceil((formData.targetValue - formData.currentProgress) / formData.weeklyTarget)} weeks
                      </p>
                    )}
                    {formData.deadline && (
                      <p>
                        <strong>Deadline:</strong> {new Date(formData.deadline).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Button type="submit" variant="hero" className="flex-1">
                  Create Goal
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate("/skills")}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddGoal;