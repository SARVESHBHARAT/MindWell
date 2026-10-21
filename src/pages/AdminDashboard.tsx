import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Brain,
  Heart,
  Shield,
  Download,
  Eye,
  Calendar,
  BarChart3,
  UserCheck,
  Phone
} from "lucide-react";
import { cn } from "@/lib/utils";

const AdminDashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  // Mock data for institutional analytics
  const campusStats = {
    totalUsers: 2547,
    activeUsers: 1823,
    weeklyEngagement: 78,
    riskAlerts: 12,
    avgWellnessScore: 72
  };

  const riskAlerts = [
    {
      id: "1",
      studentId: "S12345",
      name: "Anonymous Student A",
      riskLevel: "High",
      lastActivity: "2 hours ago",
      flags: ["Depression screening: Severe", "Crisis keywords detected"],
      priority: "immediate"
    },
    {
      id: "2",
      studentId: "S67890",
      name: "Anonymous Student B", 
      riskLevel: "Medium",
      lastActivity: "1 day ago",
      flags: ["Anxiety screening: Moderate", "Missed check-ins"],
      priority: "follow-up"
    },
    {
      id: "3",
      studentId: "S24680",
      name: "Anonymous Student C",
      riskLevel: "Medium",
      lastActivity: "3 days ago",
      flags: ["Declining mood trend", "Low engagement"],
      priority: "monitor"
    }
  ];

  const weeklyTrends = [
    { week: "Week 1", depression: 15, anxiety: 23, wellness: 68 },
    { week: "Week 2", depression: 18, anxiety: 21, wellness: 71 },
    { week: "Week 3", depression: 12, anxiety: 19, wellness: 74 },
    { week: "Week 4", depression: 14, anxiety: 17, wellness: 72 }
  ];

  const departmentStats = [
    { name: "Computer Science", users: 432, avgScore: 68, riskCount: 3 },
    { name: "Psychology", users: 298, avgScore: 78, riskCount: 1 },
    { name: "Engineering", users: 387, avgScore: 65, riskCount: 4 },
    { name: "Business", users: 345, avgScore: 74, riskCount: 2 },
    { name: "Arts & Sciences", users: 521, avgScore: 71, riskCount: 2 }
  ];

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'secondary-accent';
      default: return 'muted';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'immediate': return AlertTriangle;
      case 'follow-up': return UserCheck;
      case 'monitor': return Eye;
      default: return Users;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Campus Mental Health Analytics & Management
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-primary">{campusStats.totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold text-success">{campusStats.activeUsers}</p>
                </div>
                <Heart className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Weekly Engagement</p>
                  <p className="text-2xl font-bold text-secondary-accent">{campusStats.weeklyEngagement}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-secondary-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Risk Alerts</p>
                  <p className="text-2xl font-bold text-destructive">{campusStats.riskAlerts}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Wellness</p>
                  <p className="text-2xl font-bold text-wellness">{campusStats.avgWellnessScore}%</p>
                </div>
                <Brain className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="alerts">Risk Alerts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Risk Alerts Tab */}
          <TabsContent value="alerts">
            <Card className="shadow-wellness">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                  <span>High Priority Risk Alerts</span>
                  <Badge variant="destructive">{riskAlerts.length} Active</Badge>
                </CardTitle>
                <CardDescription>
                  Students requiring immediate attention or follow-up
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskAlerts.map((alert) => {
                    const PriorityIcon = getPriorityIcon(alert.priority);
                    return (
                      <div
                        key={alert.id}
                        className={cn(
                          "p-4 rounded-lg border-l-4 bg-card",
                          alert.priority === 'immediate' && "border-l-destructive bg-destructive/5",
                          alert.priority === 'follow-up' && "border-l-warning bg-warning/5",
                          alert.priority === 'monitor' && "border-l-secondary-accent bg-secondary"
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <PriorityIcon className={cn(
                              "h-5 w-5 mt-0.5",
                              alert.priority === 'immediate' && "text-destructive",
                              alert.priority === 'follow-up' && "text-warning",
                              alert.priority === 'monitor' && "text-secondary-accent"
                            )} />
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <span className="font-semibold">{alert.name}</span>
                                <Badge 
                                  variant="outline" 
                                  className={`border-${getRiskColor(alert.riskLevel)} text-${getRiskColor(alert.riskLevel)}`}
                                >
                                  {alert.riskLevel} Risk
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  ID: {alert.studentId}
                                </span>
                              </div>
                              
                              <div className="space-y-1 mb-3">
                                {alert.flags.map((flag, index) => (
                                  <div key={index} className="text-sm text-muted-foreground flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-destructive rounded-full"></div>
                                    <span>{flag}</span>
                                  </div>
                                ))}
                              </div>
                              
                              <p className="text-sm text-muted-foreground">
                                Last activity: {alert.lastActivity}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View Profile
                            </Button>
                            {alert.priority === 'immediate' && (
                              <Button size="sm" variant="destructive">
                                <Phone className="h-4 w-4 mr-1" />
                                Contact
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Trends */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Weekly Mental Health Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyTrends.map((trend, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{trend.week}</span>
                          <span className="text-muted-foreground">Wellness: {trend.wellness}%</span>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span>Depression Risk</span>
                            <span className="text-destructive">{trend.depression}%</span>
                          </div>
                          <Progress 
                            value={trend.depression} 
                            className="h-2 bg-destructive/10" 
                          />
                          
                          <div className="flex items-center justify-between text-xs">
                            <span>Anxiety Risk</span>
                            <span className="text-warning">{trend.anxiety}%</span>
                          </div>
                          <Progress 
                            value={trend.anxiety} 
                            className="h-2 bg-warning/10" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* User Engagement */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Platform Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-success mb-2">
                        {Math.round((campusStats.activeUsers / campusStats.totalUsers) * 100)}%
                      </div>
                      <p className="text-muted-foreground">Daily Active Users</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Mood Check-ins</span>
                        <span className="text-sm font-medium">1,247 today</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">AI Chat Sessions</span>
                        <span className="text-sm font-medium">892 today</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Assessments Completed</span>
                        <span className="text-sm font-medium">234 this week</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Counselor Appointments</span>
                        <span className="text-sm font-medium">47 scheduled</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-6 w-6" />
                  <span>Department Overview</span>
                </CardTitle>
                <CardDescription>
                  Mental health metrics by academic department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 font-medium">Department</th>
                        <th className="text-right py-3 font-medium">Users</th>
                        <th className="text-right py-3 font-medium">Avg Wellness</th>
                        <th className="text-right py-3 font-medium">Risk Alerts</th>
                        <th className="text-right py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departmentStats.map((dept, index) => (
                        <tr key={index} className="border-b border-border/50">
                          <td className="py-4 font-medium">{dept.name}</td>
                          <td className="text-right py-4">{dept.users}</td>
                          <td className="text-right py-4">
                            <div className="flex items-center justify-end space-x-2">
                              <span>{dept.avgScore}%</span>
                              <Progress value={dept.avgScore} className="w-12 h-2" />
                            </div>
                          </td>
                          <td className="text-right py-4">
                            {dept.riskCount > 0 ? (
                              <Badge variant="destructive">{dept.riskCount}</Badge>
                            ) : (
                              <Badge variant="outline" className="text-success border-success">0</Badge>
                            )}
                          </td>
                          <td className="text-right py-4">
                            <Badge 
                              variant="outline" 
                              className={cn(
                                dept.avgScore >= 75 ? "text-success border-success" :
                                dept.avgScore >= 65 ? "text-warning border-warning" :
                                "text-destructive border-destructive"
                              )}
                            >
                              {dept.avgScore >= 75 ? "Good" : dept.avgScore >= 65 ? "Fair" : "Needs Attention"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Download className="h-5 w-5" />
                    <span>Export Reports</span>
                  </CardTitle>
                  <CardDescription>
                    Generate reports for institutional analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Weekly Mental Health Summary
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Department Risk Analysis
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    User Engagement Report
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Crisis Intervention Log
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>AI Assistant Status</span>
                    <Badge variant="outline" className="text-success border-success">Online</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Crisis Detection</span>
                    <Badge variant="outline" className="text-success border-success">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Data Backup</span>
                    <Badge variant="outline" className="text-success border-success">Up to date</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Privacy Compliance</span>
                    <Badge variant="outline" className="text-success border-success">FERPA Compliant</Badge>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      Last system update: March 20, 2024
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;