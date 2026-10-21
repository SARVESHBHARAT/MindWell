import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Heart, 
  Shield, 
  MessageSquare, 
  BarChart3,
  TreePine,
  Users,
  Zap,
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "AI Mental Health Assistant",
      description: "24/7 conversational support with crisis detection and personalized guidance",
      color: "text-primary"
    },
    {
      icon: Heart,
      title: "Intelligent Mood Tracking",
      description: "Daily check-ins, emotional diary, and trend visualization with insights",
      color: "text-success"
    },
    {
      icon: Brain,
      title: "Clinical Assessment Tools",
      description: "PHQ-9 depression and GAD-7 anxiety screenings with automated analysis",
      color: "text-secondary-accent"
    },
    {
      icon: TreePine,
      title: "Gamified Wellness Tree",
      description: "Watch your mental health journey grow with achievements and rewards",
      color: "text-warning"
    },
    {
      icon: Shield,
      title: "Privacy & Security First",
      description: "Encrypted data, anonymization options, and FERPA-compliant infrastructure",
      color: "text-destructive"
    },
    {
      icon: BarChart3,
      title: "Institutional Analytics",
      description: "Campus-wide mental health insights for administrators and counselors",
      color: "text-primary"
    }
  ];

  const stats = [
    { value: "24/7", label: "AI Support Available", icon: Zap },
    { value: "2,500+", label: "Students Supported", icon: Users },
    { value: "98%", label: "Privacy Protected", icon: Shield },
    { value: "15min", label: "Average Response", icon: MessageSquare }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-24 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-primary-foreground/20 rounded-2xl flex items-center justify-center shadow-glow">
                <Brain className="h-12 w-12 text-primary-foreground" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              MindWell
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-primary-foreground/90">
              Campus Mental Health Platform
            </p>
            <p className="text-lg mb-8 text-primary-foreground/80 max-w-2xl mx-auto">
              AI-powered mental health support, clinical assessments, and wellness tracking 
              designed specifically for educational institutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/dashboard">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6 h-auto shadow-wellness">
                  <Heart className="h-5 w-5 mr-2" />
                  Start Your Journey
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              
              <Link to="/chat">
                <Button size="lg" variant="ghost" className="text-lg px-8 py-6 h-auto border border-primary-foreground/20 hover:bg-primary-foreground/10">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Try AI Support
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <Icon className="h-8 w-8 mx-auto mb-2 text-primary-foreground/80" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-primary-foreground/70">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-calm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Comprehensive Mental Health Support
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything students and institutions need for effective mental health care and prevention
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-card hover:shadow-wellness transition-all group cursor-pointer">
                  <CardHeader>
                    <div className="w-14 h-14 bg-gradient-wellness rounded-xl flex items-center justify-center mb-4 group-hover:shadow-glow transition-smooth">
                      <Icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Why Choose MindWell?
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-success-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Evidence-Based Approach</h3>
                    <p className="text-muted-foreground">
                      Built using validated clinical assessment tools (PHQ-9, GAD-7) and best practices in mental health care.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-success-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Crisis Prevention & Intervention</h3>
                    <p className="text-muted-foreground">
                      Real-time crisis detection with automatic escalation to professional counselors and emergency resources.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-success-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Institutional Insights</h3>
                    <p className="text-muted-foreground">
                      Aggregate analytics help administrators understand campus mental health trends and allocate resources effectively.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="shadow-wellness bg-gradient-wellness text-primary-foreground">
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-4">
                    <Star className="h-6 w-6" />
                    <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                      Demo Available
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl text-primary-foreground">
                    Ready to Experience MindWell?
                  </CardTitle>
                  <CardDescription className="text-primary-foreground/80">
                    Try our interactive demo with sample data and features
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-primary-foreground/90">✓ AI Chat with Crisis Detection</p>
                    <p className="text-sm text-primary-foreground/90">✓ Clinical Assessment Tools</p>
                    <p className="text-sm text-primary-foreground/90">✓ Wellness Tree Gamification</p>
                    <p className="text-sm text-primary-foreground/90">✓ Admin Analytics Dashboard</p>
                  </div>
                  
                  <Link to="/dashboard">
                    <Button 
                      variant="secondary" 
                      className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                      size="lg"
                    >
                      Launch Demo
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-wellness text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Transform Your Campus Mental Health Support
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join educational institutions already using MindWell to support their students' mental health and wellbeing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/assessments">
              <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <Brain className="h-5 w-5 mr-2" />
                Try Assessment Tools
              </Button>
            </Link>
            
            <Link to="/admin">
              <Button size="lg" variant="ghost" className="border border-primary-foreground/20 hover:bg-primary-foreground/10">
                <BarChart3 className="h-5 w-5 mr-2" />
                View Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
