import DashboardCard from "@/components/DashboardCard";
import CompanyTracker from "@/components/CompanyTracker";
import SkillTracker from "@/components/SkillTracker";
import CareerJournal from "@/components/CareerJournal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCompanies } from "@/hooks/useCompanies";
import { 
  Building2, 
  Target, 
  BookOpen, 
  TrendingUp,
  Calendar,
  Award,
  Users,
  Bell,
  Database
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { companies } = useCompanies();

  // Calculate statistics from real data
  const totalApplications = companies.length;
  const interviewsCount = companies.filter(c => c.status === 'interviewing').length;
  const offersCount = companies.filter(c => c.status === 'offered' || c.status === 'accepted').length;
  const successRate = totalApplications > 0 ? Math.round((offersCount / totalApplications) * 100) : 0;

  const handleQuickAction = (action: string) => {
    if (action === "Add New Application") {
      navigate("/add-company");
    } else if (action === "Set New Goal") {
      navigate("/add-goal");
    } else if (action === "Log Achievement") {
      navigate("/log-achievement");
    }
  };

  const handleNotification = () => {
    navigate("/reminders");
  };

  const handleConnectPeers = () => {
    navigate("/community");
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <Navbar />

      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section with Enhanced Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Button variant="ghost" size="sm" onClick={handleNotification} className="hover:scale-110 transition-transform">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="hero" size="sm" onClick={handleConnectPeers} className="gap-2">
              <Users className="h-4 w-4" />
              Connect with Peers
            </Button>
            {totalApplications === 0 && (
              <Button variant="outline" size="sm" onClick={() => navigate("/seed-data")} className="gap-2">
                <Database className="h-4 w-4" />
                Add Sample Data
              </Button>
            )}
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Good morning, Student! 👋
          </h2>
          <p className="text-muted-foreground">
            Track your placement journey and skill development progress
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Applications Sent"
            value={totalApplications}
            subtitle={totalApplications > 0 ? `${totalApplications} total applications` : "Start your journey!"}
            icon={Building2}
            trend={totalApplications > 0 ? { value: totalApplications, isPositive: true } : undefined}
            gradient
          />
          <DashboardCard
            title="Interview Scheduled"
            value={interviewsCount}
            subtitle={interviewsCount > 0 ? "In progress" : "Keep applying!"}
            icon={Calendar}
            trend={interviewsCount > 0 ? { value: 100, isPositive: true } : undefined}
          />
          <DashboardCard
            title="Offers Received"
            value={offersCount}
            subtitle={offersCount > 0 ? "Congratulations!" : "Stay positive!"}
            icon={Award}
            trend={offersCount > 0 ? { value: 100, isPositive: true } : undefined}
          />
          <DashboardCard
            title="Success Rate"
            value={`${successRate}%`}
            subtitle={totalApplications > 0 ? "Keep improving!" : "Start tracking"}
            icon={TrendingUp}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          <div className="space-y-8">
            <CompanyTracker />
          </div>
          <div className="space-y-8">
            <SkillTracker />
          </div>
        </div>

        {/* Career Journal */}
        <div className="mb-8">
          <CareerJournal />
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-card rounded-lg p-6 shadow-custom-md">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex-col gap-2 hover:scale-105 transition-transform group"
              onClick={() => handleQuickAction("Add New Application")}
            >
              <Building2 className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span>Add New Application</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex-col gap-2 hover:scale-105 transition-transform group"
              onClick={() => handleQuickAction("Set New Goal")}
            >
              <Target className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span>Set New Goal</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex-col gap-2 hover:scale-105 transition-transform group"
              onClick={() => handleQuickAction("Log Achievement")}
            >
              <Award className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span>Log Achievement</span>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;