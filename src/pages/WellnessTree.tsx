import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TreePine, 
  Leaf, 
  Award, 
  Star, 
  Zap,
  Target,
  Calendar,
  TrendingUp,
  Gift
} from "lucide-react";
import { cn } from "@/lib/utils";

const WellnessTree = () => {
  const [selectedAchievement, setSelectedAchievement] = useState<string | null>(null);
  
  const treeLevel = 5;
  const currentXP = 2450;
  const nextLevelXP = 3000;
  const weeklyStreak = 12;
  
  const achievements = [
    {
      id: "first-checkin",
      title: "First Steps",
      description: "Complete your first mood check-in",
      icon: Star,
      unlocked: true,
      date: "March 1, 2024"
    },
    {
      id: "week-streak",
      title: "Week Warrior",
      description: "7 consecutive days of check-ins",
      icon: Zap,
      unlocked: true,
      date: "March 8, 2024"
    },
    {
      id: "assessment-complete",
      title: "Self Aware",
      description: "Complete your first assessment",
      icon: Award,
      unlocked: true,
      date: "March 10, 2024"
    },
    {
      id: "month-streak",
      title: "Consistency King",
      description: "30 consecutive days of wellness activities",
      icon: Target,
      unlocked: false,
      progress: 20
    },
    {
      id: "ai-friend",
      title: "AI Buddy",
      description: "Have 10 conversations with AI support",
      icon: Gift,
      unlocked: false,
      progress: 7
    }
  ];

  const wellnessActivities = [
    {
      activity: "Daily mood check-in",
      xp: 50,
      streak: 12,
      icon: "🌞"
    },
    {
      activity: "AI chat session",
      xp: 75,
      streak: 8,
      icon: "💬"
    },
    {
      activity: "Assessment completion",
      xp: 200,
      streak: 2,
      icon: "🧠"
    },
    {
      activity: "Wellness resource read",
      xp: 25,
      streak: 5,
      icon: "📚"
    }
  ];

  const TreeVisualization = () => {
    const leaves = Array.from({ length: Math.min(treeLevel * 3, 15) }, (_, i) => i);
    
    return (
      <div className="relative flex flex-col items-center p-8">
        {/* Crown/Leaves */}
        <div className="relative mb-4">
          <div className="grid grid-cols-3 gap-1 mb-2">
            {leaves.slice(0, 9).map((leaf) => (
              <Leaf 
                key={leaf} 
                className={cn(
                  "h-8 w-8 transition-all duration-300",
                  leaf < treeLevel * 1.8 ? "text-success animate-pulse" : "text-success/30"
                )} 
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-1 justify-center">
            {leaves.slice(9, 15).map((leaf) => (
              <Leaf 
                key={leaf} 
                className={cn(
                  "h-6 w-6 transition-all duration-300",
                  leaf < treeLevel * 1.8 ? "text-success animate-pulse" : "text-success/30"
                )} 
              />
            ))}
          </div>
        </div>
        
        {/* Trunk */}
        <div className="w-4 h-16 bg-gradient-to-b from-amber-600 to-amber-800 rounded-sm shadow-lg"></div>
        
        {/* Roots */}
        <div className="flex space-x-2 mt-2">
          <div className="w-8 h-2 bg-amber-700 rounded-full transform -rotate-12"></div>
          <div className="w-8 h-2 bg-amber-700 rounded-full transform rotate-12"></div>
        </div>
        
        {/* Tree Stats */}
        <div className="mt-4 text-center">
          <div className="text-2xl font-bold text-success">Level {treeLevel}</div>
          <div className="text-sm text-muted-foreground">Wellness Tree</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-wellness mb-2">
            Your Wellness Tree
          </h1>
          <p className="text-xl text-muted-foreground">
            Watch your mental health journey grow
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Tree Visualization */}
          <Card className="lg:col-span-1 shadow-wellness">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <TreePine className="h-6 w-6 text-success" />
                <span>Wellness Tree</span>
              </CardTitle>
              <CardDescription>
                Growing stronger with every action
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TreeVisualization />
              
              {/* XP Progress */}
              <div className="space-y-3 mt-6">
                <div className="flex justify-between text-sm">
                  <span>Experience Points</span>
                  <span>{currentXP} / {nextLevelXP} XP</span>
                </div>
                <Progress value={(currentXP / nextLevelXP) * 100} className="h-3" />
                <div className="text-center">
                  <Badge variant="outline" className="text-success border-success">
                    {nextLevelXP - currentXP} XP to next level
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Overview */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                <span>Wellness Journey Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-success-light rounded-lg">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-success" />
                  <div className="text-2xl font-bold text-success">{weeklyStreak}</div>
                  <div className="text-sm text-success-foreground">Day Streak</div>
                </div>
                
                <div className="text-center p-4 bg-primary-light rounded-lg">
                  <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-primary">{treeLevel}</div>
                  <div className="text-sm text-primary-foreground">Tree Level</div>
                </div>
                
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <Award className="h-8 w-8 mx-auto mb-2 text-secondary-accent" />
                  <div className="text-2xl font-bold text-secondary-accent">
                    {achievements.filter(a => a.unlocked).length}
                  </div>
                  <div className="text-sm text-secondary-foreground">Achievements</div>
                </div>
                
                <div className="text-center p-4 bg-warning-light rounded-lg">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-warning" />
                  <div className="text-2xl font-bold text-warning">{currentXP}</div>
                  <div className="text-sm text-warning-foreground">Total XP</div>
                </div>
              </div>
              
              {/* Activity Breakdown */}
              <div className="mt-6 space-y-3">
                <h3 className="text-lg font-semibold">Recent Activities</h3>
                {wellnessActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{activity.icon}</span>
                      <div>
                        <div className="font-medium">{activity.activity}</div>
                        <div className="text-sm text-muted-foreground">{activity.streak} day streak</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-success border-success">
                      +{activity.xp} XP
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-6 w-6 text-warning" />
              <span>Achievements</span>
            </CardTitle>
            <CardDescription>
              Unlock badges as you progress on your wellness journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={achievement.id}
                    className={cn(
                      "p-4 rounded-lg border-2 cursor-pointer transition-all",
                      achievement.unlocked 
                        ? "border-success bg-success-light hover:shadow-glow" 
                        : "border-muted bg-muted/50",
                      selectedAchievement === achievement.id && "ring-2 ring-primary"
                    )}
                    onClick={() => setSelectedAchievement(
                      selectedAchievement === achievement.id ? null : achievement.id
                    )}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        achievement.unlocked ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className={cn(
                          "font-semibold",
                          achievement.unlocked ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {achievement.description}
                        </p>
                        
                        {achievement.unlocked ? (
                          <Badge variant="outline" className="text-success border-success">
                            Unlocked {achievement.date}
                          </Badge>
                        ) : achievement.progress !== undefined ? (
                          <div className="space-y-1">
                            <Progress value={(achievement.progress / 10) * 100} className="h-2" />
                            <span className="text-xs text-muted-foreground">
                              {achievement.progress}/10 progress
                            </span>
                          </div>
                        ) : (
                          <Badge variant="outline">
                            Locked
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WellnessTree;