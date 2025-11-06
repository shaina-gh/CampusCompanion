import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="border-t bg-gradient-card mt-12">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            Copyright © 2025 Shaina - Software Engineering Project
          </p>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform">
              Help
            </Button>
            <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform">
              Settings
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;