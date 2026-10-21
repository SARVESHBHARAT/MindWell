import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Heart, 
  MessageSquare, 
  TrendingUp, 
  Calendar,
  Target,
  Award,
  TreePine,
  Smile,
  Meh,
  Frown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "mindwell_checkins";

const Dashboard = () => {
  const [currentMood, setCurrentMood] = useState(7);
  const [checkInSubmitted, setCheckInSubmitted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (history.length > 0) {
      const last = history[history.length - 1];
      setCurrentMood(last.mood);
    }
  }, []);

  const handleSubmitCheckIn = () => {
    const entry = { mood: currentMood, date: new Date().toISOString() };
    const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    history.push(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    setCheckInSubmitted(true);
    toast({
      title: "Check-in submitted",
      description: `Your mood (${currentMood}/10) has been recorded for today.`,
    });
  };

  const handleCheckAgain = () => {
    setCheckInSubmitted(false);
  };
  const moodHistory = [6, 7, 5, 8, 7, 6, 7]; // Last 7 days
  
  const wellnessScore = 75;
  const streakDays = 12;
  const weeklyGoal = 5; // check-ins per week
  const currentCheckins = 4;

  const moodIcons = {
    low: Frown,
    medium: Meh,
    high: Smile
  };

  const getMoodCategory = (mood: number) => {
    if (mood <= 3) return 'low';
    if (mood <= 6) return 'medium';
    return 'high';
  };

  const getMoodColor = (mood: number) => {
    if (mood <= 3) return 'text-warning';
    if (mood <= 6) return 'text-secondary-accent';
    return 'text-success';
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Welcome back, Alex! 
          </h1>
          <p className="text-xl text-muted-foreground">
            How are you feeling today?
          </p>
        </div>

        {/* Quick Mood Check-in */}
        <Card className="mb-8 shadow-card bg-gradient-wellness text-primary-foreground">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-6 w-6" />
              <span>Daily Mood Check-in</span>
            </CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Rate your current mood on a scale of 1-10
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">1 (Very Low)</span>
                <span className="text-sm">10 (Excellent)</span>
              </div>
              <div className="flex items-center space-x-2">
                {Array.from({ length: 10 }, (_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentMood === i + 1 ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "w-12 h-12 rounded-full text-lg font-semibold transition-bounce",
                      currentMood === i + 1 && "bg-primary-foreground text-primary shadow-glow"
                    )}
                    onClick={() => setCurrentMood(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
                            {checkInSubmitted ? (
                <div className="flex flex-col space-y-3">
                  <div className="p-4 bg-success-light rounded-lg border border-success/20">
                    <div className="font-medium text-success-foreground">
                      Check-in recorded for today
                    </div>
                    <div className="text-sm text-success-foreground/80">
                      Mood {currentMood}/10 saved - {new Date().toLocaleDateString(undefined, {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <Button variant="outline" onClick={handleCheckAgain} className="w-full">
                    Check again tomorrow
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleSubmitCheckIn}
                  variant="secondary"
                  className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  Submit Check-in
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Wellness Score */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Wellness Score</span>
                </span>
                <Badge variant="secondary" className="bg-success-light text-success">
                  Good
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-3xl font-bold text-wellness">{wellnessScore}%</div>
                <Progress value={wellnessScore} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Based on your recent activities and mood patterns
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Streak Counter */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-warning" />
                <span>Current Streak</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-3xl font-bold text-warning">{streakDays} days</div>
                <p className="text-sm text-muted-foreground">
                  Keep up the great work! Daily check-ins help track your progress.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Goal */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-secondary-accent" />
                <span>Weekly Goal</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-bold text-secondary-accent">{currentCheckins}</span>
                  <span className="text-xl text-muted-foreground">/ {weeklyGoal}</span>
                </div>
                <Progress value={(currentCheckins / weeklyGoal) * 100} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Weekly mood check-ins completed
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mood Trend & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mood Trend */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Mood Trend (7 Days)</span>
              </CardTitle>
              <CardDescription>
                Track your emotional patterns over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  {moodHistory.map((mood, index) => {
                    const MoodIcon = moodIcons[getMoodCategory(mood)];
                    return (
                      <div key={index} className="flex flex-col items-center space-y-1">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          mood <= 3 ? "bg-warning-light" : 
                          mood <= 6 ? "bg-secondary" : "bg-success-light"
                        )}>
                          <MoodIcon className={cn("h-4 w-4", getMoodColor(mood))} />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(Date.now() - (6 - index) * 24 * 60 * 60 * 1000).toLocaleDateString('en', { weekday: 'short' })}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Avg: 6.4</span>
                  <Badge variant="outline" className="text-success border-success">
                    +0.2 from last week
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-primary" />
                <span>Quick Actions</span>
              </CardTitle>
              <CardDescription>
                Access your wellness tools instantly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start space-x-3 h-12">
                <MessageSquare className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Chat with AI Support</div>
                  <div className="text-xs text-muted-foreground">Get instant mental health guidance</div>
                </div>
              </Button>
              
              <Button variant="outline" className="w-full justify-start space-x-3 h-12">
                <Brain className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Take Assessment</div>
                  <div className="text-xs text-muted-foreground">PHQ-9 or GAD-7 screening</div>
                </div>
              </Button>
              
              <Button variant="outline" className="w-full justify-start space-x-3 h-12">
                <TreePine className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Wellness Tree</div>
                  <div className="text-xs text-muted-foreground">View your progress garden</div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;