import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Award, ArrowLeft, Star, Calendar, Hash, Plus, X } from "lucide-react";

const LogAchievement = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    date: new Date().toISOString().split('T')[0],
    content: "",
    company: "",
    relatedSkill: "",
    impact: "",
    lessonsLearned: "",
    nextSteps: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entryData = {
      ...formData,
      rating,
      tags
    };
    console.log("Adding journal entry:", entryData);
    alert("Achievement logged successfully!");
    navigate("/journal");
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate("/journal")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Journal
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Log Achievement
          </h1>
          <p className="text-muted-foreground mt-2">
            Document your career milestones and learnings
          </p>
        </div>

        <Card className="max-w-2xl shadow-custom-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              New Journal Entry
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-2">
                <Label htmlFor="title">Entry Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Successfully completed Google interview, Deployed first full-stack app"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Entry Type *</Label>
                  <Select onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="interview">Interview Experience</SelectItem>
                      <SelectItem value="achievement">Achievement</SelectItem>
                      <SelectItem value="learning">Learning Session</SelectItem>
                      <SelectItem value="reflection">Daily Reflection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Optional Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company (if applicable)</Label>
                  <Input
                    id="company"
                    placeholder="Google, Microsoft, etc."
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relatedSkill">Related Skill</Label>
                  <Input
                    id="relatedSkill"
                    placeholder="DSA, System Design, etc."
                    value={formData.relatedSkill}
                    onChange={(e) => setFormData({...formData, relatedSkill: e.target.value})}
                  />
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <Label>Experience Rating</Label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:bg-muted rounded transition-colors"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= rating ? 'text-warning fill-warning' : 'text-muted-foreground'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    {rating === 0 ? 'No rating' : `${rating}/5 stars`}
                  </span>
                </div>
              </div>

              {/* Main Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Description *</Label>
                <Textarea
                  id="content"
                  placeholder="Describe what happened, how you felt, what you learned..."
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={6}
                  required
                />
              </div>

              {/* Additional Sections */}
              <div className="space-y-2">
                <Label htmlFor="impact">Impact & Results</Label>
                <Textarea
                  id="impact"
                  placeholder="What was the outcome? How did this affect your goals or progress?"
                  value={formData.impact}
                  onChange={(e) => setFormData({...formData, impact: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lessonsLearned">Key Lessons Learned</Label>
                <Textarea
                  id="lessonsLearned"
                  placeholder="What insights did you gain? What would you do differently?"
                  value={formData.lessonsLearned}
                  onChange={(e) => setFormData({...formData, lessonsLearned: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nextSteps">Next Steps</Label>
                <Textarea
                  id="nextSteps"
                  placeholder="What are your action items? How will you build on this experience?"
                  value={formData.nextSteps}
                  onChange={(e) => setFormData({...formData, nextSteps: e.target.value})}
                  rows={3}
                />
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative flex-1">
                    <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Add tags (e.g., interview, technical, behavioral)"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pl-10"
                    />
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={addTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="pr-1">
                        #{tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" variant="hero" className="flex-1">
                  Save Entry
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate("/journal")}>
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

export default LogAchievement;