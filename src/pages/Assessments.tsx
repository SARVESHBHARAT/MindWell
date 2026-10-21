import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Brain, 
  Heart, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Calendar,
  BarChart
} from "lucide-react";

const Assessments = () => {
  const [activeAssessment, setActiveAssessment] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  // PHQ-9 Depression Screening Questions
  const phq9Questions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
    "Trouble concentrating on things, such as reading the newspaper or watching television",
    "Moving or speaking so slowly that other people could have noticed, or the opposite being so fidgety or restless that you have been moving around a lot more than usual",
    "Thoughts that you would be better off dead, or of hurting yourself"
  ];

  // GAD-7 Anxiety Screening Questions
  const gad7Questions = [
    "Feeling nervous, anxious, or on edge",
    "Not being able to stop or control worrying",
    "Worrying too much about different things",
    "Trouble relaxing",
    "Being so restless that it is hard to sit still",
    "Becoming easily annoyed or irritable",
    "Feeling afraid, as if something awful might happen"
  ];

  const assessmentOptions = [
    { value: 0, label: "Not at all" },
    { value: 1, label: "Several days" },
    { value: 2, label: "More than half the days" },
    { value: 3, label: "Nearly every day" }
  ];

  const getQuestions = () => {
    return activeAssessment === "phq9" ? phq9Questions : gad7Questions;
  };

  const handleAnswerSelect = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = parseInt(value);
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    const questions = getQuestions();
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    return answers.reduce((sum, answer) => sum + answer, 0);
  };

  const getScoreInterpretation = () => {
    const score = calculateScore();
    const isPHQ9 = activeAssessment === "phq9";
    
    if (isPHQ9) {
      if (score >= 20) return { level: "Severe", color: "destructive", description: "Severe depression. Immediate professional help recommended." };
      if (score >= 15) return { level: "Moderately Severe", color: "warning", description: "Moderately severe depression. Professional help strongly recommended." };
      if (score >= 10) return { level: "Moderate", color: "warning", description: "Moderate depression. Consider professional consultation." };
      if (score >= 5) return { level: "Mild", color: "secondary-accent", description: "Mild depression. Monitor symptoms and consider self-care strategies." };
      return { level: "Minimal", color: "success", description: "Minimal depression. Continue maintaining good mental health practices." };
    } else {
      if (score >= 15) return { level: "Severe", color: "destructive", description: "Severe anxiety. Immediate professional help recommended." };
      if (score >= 10) return { level: "Moderate", color: "warning", description: "Moderate anxiety. Professional help recommended." };
      if (score >= 5) return { level: "Mild", color: "secondary-accent", description: "Mild anxiety. Consider self-care and monitoring." };
      return { level: "Minimal", color: "success", description: "Minimal anxiety. Continue current wellness practices." };
    }
  };

  const resetAssessment = () => {
    setActiveAssessment(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const startAssessment = (type: string) => {
    setActiveAssessment(type);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    const interpretation = getScoreInterpretation();
    const maxScore = activeAssessment === "phq9" ? 27 : 21;

    return (
      <div className="min-h-screen bg-gradient-calm">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Card className="shadow-wellness">
            <CardHeader className="bg-gradient-wellness text-primary-foreground">
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-6 w-6" />
                <span>Assessment Results</span>
              </CardTitle>
              <CardDescription className="text-primary-foreground/80">
                {activeAssessment === "phq9" ? "PHQ-9 Depression Screening" : "GAD-7 Anxiety Screening"} Complete
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Score Display */}
                <div className="text-center">
                  <div className="text-6xl font-bold text-wellness mb-2">{score}</div>
                  <div className="text-xl text-muted-foreground mb-4">out of {maxScore}</div>
                  <Badge 
                    variant="outline" 
                    className={`text-lg px-4 py-2 border-${interpretation.color} text-${interpretation.color}`}
                  >
                    {interpretation.level}
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Risk Level</span>
                    <span>{Math.round((score / maxScore) * 100)}%</span>
                  </div>
                  <Progress value={(score / maxScore) * 100} className="h-3" />
                </div>

                {/* Interpretation */}
                <Card className="bg-muted">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className={`h-5 w-5 text-${interpretation.color} flex-shrink-0 mt-0.5`} />
                      <div>
                        <h3 className="font-semibold mb-2">What this means:</h3>
                        <p className="text-sm text-muted-foreground">{interpretation.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recommended Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {score >= 10 && (
                      <div className="p-4 bg-warning-light rounded-lg">
                        <p className="text-sm font-medium text-warning-foreground mb-2">
                          Professional Support Recommended
                        </p>
                        <Button variant="outline" className="w-full">
                          Schedule Counselor Appointment
                        </Button>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Button variant="outline" className="h-auto p-4 justify-start">
                        <div className="text-left">
                          <div className="font-medium">Wellness Resources</div>
                          <div className="text-xs text-muted-foreground">Self-help tools and strategies</div>
                        </div>
                      </Button>
                      
                      <Button variant="outline" className="h-auto p-4 justify-start">
                        <div className="text-left">
                          <div className="font-medium">Peer Support</div>
                          <div className="text-xs text-muted-foreground">Connect with others</div>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex space-x-3">
                  <Button variant="outline" onClick={resetAssessment} className="flex-1">
                    Take Another Assessment
                  </Button>
                  <Button className="flex-1 bg-gradient-wellness">
                    Save Results
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (activeAssessment) {
    const questions = getQuestions();
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-calm">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Card className="shadow-wellness">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-6 w-6" />
                  <span>{activeAssessment === "phq9" ? "PHQ-9" : "GAD-7"} Assessment</span>
                </CardTitle>
                <Badge variant="outline">
                  {currentQuestion + 1} of {questions.length}
                </Badge>
              </div>
              <CardDescription>
                Over the last 2 weeks, how often have you been bothered by the following?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Question */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium leading-relaxed">
                  {questions[currentQuestion]}
                </h3>

                <RadioGroup 
                  value={answers[currentQuestion]?.toString() || ""}
                  onValueChange={handleAnswerSelect}
                  className="space-y-3"
                >
                  {assessmentOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value.toString()} id={option.value.toString()} />
                      <Label htmlFor={option.value.toString()} className="flex-1 cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {answers[currentQuestion] === undefined && (
                  <p className="text-xs text-destructive/70 mt-2">
                    Please select an answer to continue.
                  </p>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={answers[currentQuestion] === undefined}
                  className="bg-gradient-wellness"
                >
                  {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Clinical Assessments
          </h1>
          <p className="text-xl text-muted-foreground">
            Professional mental health screening tools
          </p>
        </div>

        {/* Assessment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* PHQ-9 Depression */}
          <Card className="shadow-card hover:shadow-wellness transition-smooth cursor-pointer group">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-wellness rounded-xl flex items-center justify-center group-hover:shadow-glow transition-smooth">
                  <Brain className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xl font-bold">PHQ-9</div>
                  <div className="text-sm text-muted-foreground">Depression Screening</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The PHQ-9 is a validated tool for screening, diagnosing, monitoring and measuring the severity of depression.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Questions:</span>
                  <span className="font-medium">9 items</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Duration:</span>
                  <span className="font-medium">3-5 minutes</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Last taken:</span>
                  <span className="font-medium">2 weeks ago</span>
                </div>
              </div>

              <Button 
                onClick={() => startAssessment("phq9")}
                className="w-full bg-gradient-wellness hover:shadow-glow transition-smooth"
              >
                Start PHQ-9 Assessment
              </Button>
            </CardContent>
          </Card>

          {/* GAD-7 Anxiety */}
          <Card className="shadow-card hover:shadow-wellness transition-smooth cursor-pointer group">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-wellness rounded-xl flex items-center justify-center group-hover:shadow-glow transition-smooth">
                  <Heart className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xl font-bold">GAD-7</div>
                  <div className="text-sm text-muted-foreground">Anxiety Screening</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The GAD-7 is a reliable tool for screening for generalized anxiety disorder and measuring anxiety symptom severity.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Questions:</span>
                  <span className="font-medium">7 items</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Duration:</span>
                  <span className="font-medium">2-4 minutes</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Last taken:</span>
                  <span className="font-medium">Never</span>
                </div>
              </div>

              <Button 
                onClick={() => startAssessment("gad7")}
                className="w-full bg-gradient-wellness hover:shadow-glow transition-smooth"
              >
                Start GAD-7 Assessment
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Assessment History */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart className="h-6 w-6" />
              <span>Assessment History</span>
            </CardTitle>
            <CardDescription>
              Track your mental health screenings over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">PHQ-9 Depression Screening</div>
                    <div className="text-sm text-muted-foreground">March 15, 2024</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">Score: 8</Badge>
                  <div className="text-sm text-muted-foreground">Mild</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">GAD-7 Anxiety Screening</div>
                    <div className="text-sm text-muted-foreground">February 28, 2024</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">Score: 6</Badge>
                  <div className="text-sm text-muted-foreground">Mild</div>
                </div>
              </div>

              <div className="text-center py-4">
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Full History
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Assessments;