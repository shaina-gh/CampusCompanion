import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Database, Loader2, CheckCircle } from "lucide-react";

const SeedData = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSeedData = async () => {
    setLoading(true);
    setSuccess(false);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to seed data",
          variant: "destructive",
        });
        return;
      }

      // Call the seed function
      const { error } = await supabase.rpc('seed_user_sample_data');

      if (error) throw error;

      setSuccess(true);
      toast({
        title: "Success!",
        description: "Sample data has been added to your account",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error: any) {
      console.error("Error seeding data:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to seed data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <Navbar />
      
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Database className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>Populate Sample Data</CardTitle>
                  <CardDescription>
                    Add sample companies, interviews, goals, skills, achievements, reminders, templates, and contacts to explore all features
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <h4 className="font-semibold text-foreground">This will add:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• 3 sample companies (Google, Microsoft, Amazon)</li>
                  <li>• 3 sample interviews</li>
                  <li>• 5 sample skills (JavaScript, React, Python, etc.)</li>
                  <li>• 5 sample career goals</li>
                  <li>• 4 sample achievements</li>
                  <li>• 5 sample reminders</li>
                  <li>• 3 sample email/message templates</li>
                  <li>• 3 sample networking contacts</li>
                </ul>
              </div>

              {success ? (
                <div className="flex items-center justify-center gap-2 text-green-600 py-4">
                  <CheckCircle className="h-6 w-6" />
                  <span className="font-semibold">Sample data added successfully!</span>
                </div>
              ) : (
                <Button 
                  onClick={handleSeedData} 
                  disabled={loading} 
                  className="w-full"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Populating Data...
                    </>
                  ) : (
                    <>
                      <Database className="mr-2 h-5 w-5" />
                      Populate Sample Data
                    </>
                  )}
                </Button>
              )}

              <Button 
                variant="outline" 
                onClick={() => navigate("/dashboard")}
                className="w-full"
              >
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SeedData;
