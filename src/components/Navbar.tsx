import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { 
  Home,
  Building2, 
  Target, 
  BookOpen, 
  TrendingUp,
  UserPlus,
  LogIn,
  LogOut,
  Award,
  Plus,
  Calendar,
  Bell,
  FileText,
  Users,
  FolderOpen,
  Trophy
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/add-company", label: "Applications", icon: Building2 },
    { path: "/interviews", label: "Interviews", icon: Target },
    { path: "/networking", label: "Network", icon: UserPlus },
    { path: "/analytics", label: "Analytics", icon: TrendingUp },
    { path: "/skills", label: "Skills", icon: Award },
    { path: "/goals", label: "Goals", icon: Calendar },
    { path: "/reminders", label: "Reminders", icon: Bell },
    { path: "/achievements", label: "Achievements", icon: Trophy },
    { path: "/documents", label: "Documents", icon: FolderOpen },
    { path: "/templates", label: "Templates", icon: FileText },
    { path: "/community", label: "Community", icon: Users },
    { path: "/journal", label: "Journal", icon: BookOpen },
  ];

  return (
    <nav className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link to="/" aria-label="Campus Companion home" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-campus rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Campus Companion
            </h1>
          </Link>

          {/* Navigation Links - Only show if authenticated */}
          {user && (
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    size="sm"
                    className="gap-2 hover:scale-105 transition-transform"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          )}

          {/* Auth Buttons */}
          <div className="flex items-center space-x-2">
            {user ? (
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2 hover:scale-105 transition-transform"
                onClick={signOut}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="gap-2 hover:scale-105 transition-transform">
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="hero" size="sm" className="gap-2">
                    <UserPlus className="h-4 w-4" />
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation - Only show if authenticated */}
        {user && (
          <div className="md:hidden mt-3 flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  className="gap-1 text-xs hover:scale-105 transition-transform"
                >
                  <item.icon className="h-3 w-3" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
