import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useEducationFlow } from '../hooks/useEducationFlow';
import { AssessmentConfig, Question, EducationLevel } from '../types/education';
import { 
  Brain, 
  Clock, 
  Target, 
  CheckCircle, 
  Award,
  BookOpen,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';

export function DynamicAssessment() {
  const { level } = useParams<{ level: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { studentProfile, getDashboardRoute } = useEducationFlow();
  
  const [assessmentConfig, setAssessmentConfig] = useState<AssessmentConfig | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeStarted, setTimeStarted] = useState<Date>(new Date());
  const [sectionTimeStarted, setSectionTimeStarted] = useState<Date>(new Date());
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    loadAssessmentConfig();
  }, [level]);

  const loadAssessmentConfig = async () => {
    try {
      const configModule = await import(`../config/assessments/assessment-${level}.json`);
      setAssessmentConfig(configModule.default);
    } catch (error) {
      console.error('Failed to load assessment config:', error);
      // Fallback to mock config
      setAssessmentConfig(getMockConfig(level as EducationLevel));
    }
  };

  const getMockConfig = (level: EducationLevel): AssessmentConfig => {
    const configs = {
      '10th': {
        level: '10th' as EducationLevel,
        duration: 30,
        passingScore: 60,
        sections: [
          {
            id: 'aptitude',
            title: 'Basic Aptitude',
            description: 'Test your logical thinking abilities',
            questions: [
              {
                id: 'apt_1',
                type: 'multiple-choice' as const,
                question: 'If 5 books cost ₹250, how much will 8 books cost?',
                options: ['₹300', '₹350', '₹400', '₹450'],
                category: 'numerical',
                weight: 1
              },
              {
                id: 'apt_2',
                type: 'multiple-choice' as const,
                question: 'Complete the series: 2, 6, 12, 20, ?',
                options: ['28', '30', '32', '36'],
                category: 'logical',
                weight: 1
              }
            ]
          },
          {
            id: 'interests',
            title: 'Subject Interests',
            description: 'Discover your subject preferences',
            questions: [
              {
                id: 'int_1',
                type: 'rating' as const,
                question: 'How much do you enjoy Mathematics?',
                options: ['1', '2', '3', '4', '5'],
                category: 'subject_interest',
                weight: 1
              }
            ]
          }
        ]
      },
      '12th': {
        level: '12th' as EducationLevel,
        duration: 45,
        passingScore: 65,
        sections: [
          {
            id: 'stream_aptitude',
            title: 'Stream Aptitude',
            description: 'Test your stream-specific knowledge',
            questions: [
              {
                id: 'stream_1',
                type: 'multiple-choice' as const,
                question: 'What is the derivative of x²?',
                options: ['x', '2x', 'x²', '2x²'],
                category: 'mathematics',
                weight: 1
              }
            ]
          }
        ]
      },
      'graduation': {
        level: 'graduation' as EducationLevel,
        duration: 60,
        passingScore: 70,
        sections: [
          {
            id: 'technical_skills',
            title: 'Technical Skills',
            description: 'Assess your technical competencies',
            questions: [
              {
                id: 'tech_1',
                type: 'rating' as const,
                question: 'Rate your programming skills',
                options: ['1', '2', '3', '4', '5'],
                category: 'programming',
                weight: 2
              }
            ]
          }
        ]
      },
      'post-graduation': {
        level: 'post-graduation' as EducationLevel,
        duration: 45,
        passingScore: 75,
        sections: [
          {
            id: 'leadership',
            title: 'Leadership Skills',
            description: 'Assess your leadership capabilities',
            questions: [
              {
                id: 'lead_1',
                type: 'rating' as const,
                question: 'Rate your leadership experience',
                options: ['1', '2', '3', '4', '5'],
                category: 'leadership',
                weight: 2
              }
            ]
          }
        ]
      }
    };

    return configs[level];
  };

  if (!assessmentConfig) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <Card>
          <CardContent className="pt-12 pb-12">
            <div className="text-center">
              <Brain className="h-12 w-12 mx-auto mb-4 text-indigo-600 animate-pulse" />
              <h3 className="text-xl font-semibold mb-2">Loading Assessment</h3>
              <p className="text-gray-600">Preparing your personalized assessment...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentSection = assessmentConfig.sections[currentSectionIndex];
  const currentQuestion = currentSection.questions[currentQuestionIndex];
  const totalQuestions = assessmentConfig.sections.reduce((sum, section) => sum + section.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (currentSectionIndex < assessmentConfig.sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
      setCurrentQuestionIndex(0);
      setSectionTimeStarted(new Date());
    } else {
      completeAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
      const prevSection = assessmentConfig.sections[currentSectionIndex - 1];
      setCurrentQuestionIndex(prevSection.questions.length - 1);
    }
  };

  const completeAssessment = () => {
    setIsComplete(true);
    
    const results = {
      level: level as EducationLevel,
      answers,
      timeCompleted: new Date().toISOString(),
      timeTaken: Math.round((new Date().getTime() - timeStarted.getTime()) / 1000 / 60),
      score: calculateScore(),
      recommendations: generateRecommendations()
    };

    localStorage.setItem('assessment_results', JSON.stringify(results));
    
    // Navigate to appropriate dashboard after a delay
    setTimeout(() => {
      navigate(getDashboardRoute(level as EducationLevel));
    }, 2000);
  };

  const calculateScore = () => {
    let totalScore = 0;
    let maxScore = 0;

    assessmentConfig.sections.forEach(section => {
      section.questions.forEach(question => {
        const answer = answers[question.id];
        if (answer !== undefined) {
          if (question.type === 'rating') {
            totalScore += parseInt(answer) * question.weight;
            maxScore += 5 * question.weight;
          } else if (question.type === 'multiple-choice' || question.type === 'single-choice') {
            // Assume correct answers for demo
            totalScore += 1 * question.weight;
            maxScore += 1 * question.weight;
          }
        }
      });
    });

    return maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
  };

  const generateRecommendations = () => {
    const level = assessmentConfig.level;
    const score = calculateScore();
    
    const recommendations = {
      '10th': [
        'Consider Science stream if you enjoy Math and Science',
        'Explore engineering and medical career paths',
        'Start preparing for competitive exams early',
        'Develop strong foundation in core subjects'
      ],
      '12th': [
        'Focus on your chosen competitive exam preparation',
        'Research colleges and courses thoroughly',
        'Consider backup options and alternative paths',
        'Start building relevant skills for your target field'
      ],
      'graduation': [
        'Build a strong portfolio of projects',
        'Apply for internships in your field of interest',
        'Consider pursuing relevant certifications',
        'Network with professionals in your target industry'
      ],
      'post-graduation': [
        'Focus on leadership skill development',
        'Consider executive education programs',
        'Build strategic thinking capabilities',
        'Expand your professional network'
      ]
    };

    return recommendations[level] || [];
  };

  const renderQuestion = () => {
    const answer = answers[currentQuestion.id];

    switch (currentQuestion.type) {
      case 'multiple-choice':
      case 'single-choice':
        return (
          <RadioGroup value={answer?.toString() || ''} onValueChange={(value) => handleAnswer(parseInt(value))}>
            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        );

      case 'rating':
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Not at all</span>
              <span>Extremely</span>
            </div>
            <RadioGroup value={answer?.toString() || ''} onValueChange={(value) => handleAnswer(parseInt(value))}>
              <div className="flex justify-between">
                {currentQuestion.options?.map((option, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <RadioGroupItem value={(index + 1).toString()} id={`rating-${index}`} />
                    <Label htmlFor={`rating-${index}`} className="cursor-pointer text-sm">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        );

      default:
        return null;
    }
  };

  if (isComplete) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <Card>
          <CardContent className="pt-12 pb-12">
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 mx-auto text-green-600" />
              <h2 className="text-2xl font-bold">Assessment Complete!</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Generating your personalized career insights...
              </p>
              <div className="max-w-md mx-auto">
                <Progress value={100} className="w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getSectionIcon = (sectionId: string) => {
    const icons = {
      'aptitude': Brain,
      'interests': BookOpen,
      'stream_aptitude': Award,
      'competitive_readiness': Target,
      'technical_skills': Zap,
      'career_readiness': TrendingUp,
      'leadership_skills': Users,
      'career_advancement': TrendingUp
    };
    return icons[sectionId as keyof typeof icons] || Brain;
  };

  const SectionIcon = getSectionIcon(currentSection.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SectionIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <div>
                <CardTitle>
                  {level?.toUpperCase()} Student Assessment
                </CardTitle>
                <CardDescription>
                  {currentSection.description}
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary">
              Section {currentSectionIndex + 1} of {assessmentConfig.sections.length}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {answeredQuestions} of {totalQuestions} questions
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </CardContent>
      </Card>

      {/* Section Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {assessmentConfig.sections.map((section, index) => {
          const isActive = index === currentSectionIndex;
          const isCompleted = index < currentSectionIndex;
          const SectionIcon = getSectionIcon(section.id);
          
          return (
            <Card key={section.id} className={`${isActive ? 'ring-2 ring-indigo-500' : ''}`}>
              <CardContent className="p-4 text-center">
                <SectionIcon className={`h-6 w-6 mx-auto mb-2 ${
                  isActive ? 'text-indigo-600 dark:text-indigo-400' :
                  isCompleted ? 'text-green-600 dark:text-green-400' :
                  'text-gray-400 dark:text-gray-500'
                }`} />
                <h3 className="font-medium text-sm mb-1">{section.title}</h3>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {section.questions.length} questions
                </div>
                {section.timeLimit && (
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-1">
                    <Clock className="h-3 w-3" />
                    {section.timeLimit} min
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Current Question */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">{currentSection.title}</CardTitle>
              <CardDescription>
                Question {currentQuestionIndex + 1} of {currentSection.questions.length}
              </CardDescription>
            </div>
            <Badge variant="outline">
              {currentQuestion.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
            {renderQuestion()}
          </div>

          {currentQuestion.explanation && answers[currentQuestion.id] !== undefined && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Explanation:</h4>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentSectionIndex === 0 && currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={answers[currentQuestion.id] === undefined}
            >
              {currentSectionIndex === assessmentConfig.sections.length - 1 && 
               currentQuestionIndex === currentSection.questions.length - 1 
                ? 'Complete Assessment' 
                : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Time Indicator */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Total Time: {assessmentConfig.duration} minutes</span>
            </div>
            {currentSection.timeLimit && (
              <div className="flex items-center gap-1">
                <Target className="h-4 w-4" />
                <span>Section Time: {currentSection.timeLimit} minutes</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}