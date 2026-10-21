import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Heart, 
  BarChart3, 
  MessageSquare, 
  Shield, 
  Menu, 
  X,
  TreePine,
  UserCog
} from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/", label: "Home", icon: Heart },
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/chat", label: "AI Support", icon: MessageSquare },
    { href: "/assessments", label: "Assessments", icon: Brain },
    { href: "/wellness", label: "Wellness Tree", icon: TreePine },
    { href: "/admin", label: "Admin", icon: UserCog },
  ];

  return (
    <nav className="bg-card border-b border-border shadow-card sticky top-0 z-50 backdrop-blur-md bg-card/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-wellness rounded-xl flex items-center justify-center shadow-wellness transition-smooth group-hover:shadow-glow">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-wellness">MindWell</h1>
              <p className="text-xs text-muted-foreground -mt-1">Campus Mental Health</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link key={href} to={href}>
                <Button
                  variant={location.pathname === href ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "flex items-center space-x-2 transition-smooth",
                    location.pathname === href && "bg-gradient-wellness shadow-wellness text-primary-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-border bg-gradient-calm py-4">
            <div className="space-y-2">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link key={href} to={href} onClick={() => setIsOpen(false)}>
                  <Button
                    variant={location.pathname === href ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "w-full justify-start space-x-3 transition-smooth",
                      location.pathname === href && "bg-gradient-wellness shadow-wellness text-primary-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;