import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { 
  Brain, 
  Heart, 
  Target, 
  Users, 
  Zap, 
  CheckCircle,
  Clock,
  TrendingUp,
  Star
} from 'lucide-react';

interface Question {
  id: string;
  category: string;
  dimension: 'orientation' | 'interest' | 'personality' | 'aptitude' | 'eq';
  type: 'likert' | 'multiple-choice' | 'ranking' | 'scenario' | 'slider';
  question: string;
  options?: string[];
  scenarios?: { situation: string; responses: string[] };
  min?: number;
  max?: number;
  labels?: string[];
}

interface Advanced5DAssessmentProps {
  onComplete: (results: any) => void;
}

const assessmentDimensions = [
  {
    id: 'orientation',
    titleKey: 'assessment.dimensions.orientation.title',
    descriptionKey: 'assessment.dimensions.orientation.description',
    icon: Target,
    color: 'text-blue-600 dark:text-blue-400'
  },
  {
    id: 'interest',
    titleKey: 'assessment.dimensions.interest.title',
    descriptionKey: 'assessment.dimensions.interest.description',
    icon: Heart,
    color: 'text-red-600 dark:text-red-400'
  },
  {
    id: 'personality',
    titleKey: 'assessment.dimensions.personality.title',
    descriptionKey: 'assessment.dimensions.personality.description',
    icon: Users,
    color: 'text-green-600 dark:text-green-400'
  },
  {
    id: 'aptitude',
    titleKey: 'assessment.dimensions.aptitude.title',
    descriptionKey: 'assessment.dimensions.aptitude.description',
    icon: Brain,
    color: 'text-purple-600 dark:text-purple-400'
  },
  {
    id: 'eq',
    titleKey: 'assessment.dimensions.eq.title',
    descriptionKey: 'assessment.dimensions.eq.description',
    icon: Zap,
    color: 'text-orange-600 dark:text-orange-400'
  }
];

// const psychometricQuestions: Question[] = [
//   // ======================
//   // ORIENTATION STYLE (10)
//   // ======================
//   {
//     id: "o1",
//     category: "Orientation Style",
//     dimension: "orientation",
//     type: "likert",
//     question: "I prefer working on tasks that have clear, structured guidelines.",
//     options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
//   },
//   {
//     id: "o2",
//     category: "Orientation Style",
//     dimension: "orientation",
//     type: "multiple-choice",
//     question: "When starting a new project, I typically:",
//     options: [
//       "Create a detailed plan before beginning",
//       "Start with a rough outline and adapt as I go",
//       "Jump right in and figure it out along the way",
//       "Research extensively before taking any action",
//     ],
//   },
//   {
//     id: "o3",
//     category: "Orientation Style",
//     dimension: "orientation",
//     type: "scenario",
//     question: "You're given a complex problem to solve at work:",
//     scenarios: {
//       situation: "Your manager assigns you a project with unclear requirements and a tight deadline.",
//       responses: [
//         "Ask for clarification and create a structured approach",
//         "Start working immediately and adjust based on feedback",
//         "Break it down into smaller, manageable tasks",
//         "Collaborate with colleagues to brainstorm solutions",
//       ],
//     },
//   },
//   {
//     id: "o4",
//     category: "Orientation Style",
//     dimension: "orientation",
//     type: "likert",
//     question: "I feel more comfortable following a set process than improvising.",
//     options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
//   },
//   // {
//   //   id: "o5",
//   //   category: "Orientation Style",
//   //   dimension: "orientation",
//   //   type: "ranking",
//   //   question: "Rank these work preferences from most to least important:",
//   //   options: ["Clear instructions", "Independence", "Collaboration", "Flexibility"],
//   // },
//   {
//     id: "o6",
//     category: "Orientation Style",
//     dimension: "orientation",
//     type: "multiple-choice",
//     question: "In group projects, my natural role is:",
//     options: ["Planner", "Executor", "Innovator", "Coordinator"],
//   },
//   {
//     id: "o7",
//     category: "Orientation Style",
//     dimension: "orientation",
//     type: "likert",
//     question: "I enjoy experimenting with new ways of doing things, even without a guide.",
//     options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
//   },
//   {
//     id: "o8",
//     category: "Orientation Style",
//     dimension: "orientation",
//     type: "scenario",
//     question: "Your manager asks for a report by tomorrow, but no template is provided.",
//     scenarios: {
//       situation: "You are tasked to prepare a report urgently, but no format/template is given.",
//       responses: [
//         "Request an example before proceeding",
//         "Draft your own structure and refine later",
//         "Focus only on the main points and deliver quickly",
//         "Ask colleagues how they would approach it",
//       ],
//     },
//   },
//   {
//     id: "o9",
//     category: "Orientation Style",
//     dimension: "orientation",
//     type: "slider",
//     question: "How structured do you like your work environment to be?",
//     labels: ["Very unstructured", "Highly structured"],
//     min: 1,
//     max: 10,
//   },
//   {
//     id: "o10",
//     category: "Orientation Style",
//     dimension: "orientation",
//     type: "likert",
//     question: "I prefer routine tasks over tasks that constantly change.",
//     options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
//   },

//   // ======================
//   // CAREER INTERESTS (10)
//   // ======================
//   // {
//   //   id: "i1",
//   //   category: "Career Interests",
//   //   dimension: "interest",
//   //   type: "ranking",
//   //   question: "Rank these activities from most to least appealing:",
//   //   options: [
//   //     "Analyzing data and finding patterns",
//   //     "Creating and designing visual content",
//   //     "Leading and motivating teams",
//   //     "Helping and counseling others",
//   //     "Solving technical problems",
//   //   ],
//   // },
//   {
//     id: "i2",
//     category: "Career Interests",
//     dimension: "interest",
//     type: "likert",
//     question: "I enjoy working with cutting-edge technology and innovation.",
//     options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
//   },
//   {
//     id: "i3",
//     category: "Career Interests",
//     dimension: "interest",
//     type: "multiple-choice",
//     question: "In your ideal work environment, you would be:",
//     options: [
//       "Working independently on focused tasks",
//       "Collaborating with diverse teams",
//       "Leading projects and making strategic decisions",
//       "Mentoring and developing others",
//     ],
//   },
//   {
//     id: "i4",
//     category: "Career Interests",
//     dimension: "interest",
//     type: "likert",
//     question: "I enjoy solving real-world problems that impact people's lives.",
//     options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
//   },
//   {
//     id: "i5",
//     category: "Career Interests",
//     dimension: "interest",
//     type: "scenario",
//     question: "You have free time on the weekend. You'd rather:",
//     scenarios: {
//       situation: "It's the weekend and you have no urgent tasks.",
//       responses: [
//         "Work on a creative hobby (art, music, design)",
//         "Read about science/technology",
//         "Volunteer for a social cause",
//         "Plan and organize a community event",
//       ],
//     },
//   },
//   {
//     id: "i6",
//     category: "Career Interests",
//     dimension: "interest",
//     type: "likert",
//     question: "I like taking leadership roles in projects and initiatives.",
//     options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
//   },
//   {
//     id: "i7",
//     category: "Career Interests",
//     dimension: "interest",
//     type: "multiple-choice",
//     question: "Which activity excites you the most?",
//     options: [
//       "Designing something creative",
//       "Solving analytical problems",
//       "Helping people",
//       "Managing and organizing projects",
//     ],
//   },
//   {
//     id: "i8",
//     category: "Career Interests",
//     dimension: "interest",
//     type: "slider",
//     question: "How much do you enjoy working with people versus working alone?",
//     labels: ["Prefer working alone", "Prefer working with people"],
//     min: 1,
//     max: 10,
//   },
//   {
//     id: "i9",
//     category: "Career Interests",
//     dimension: "interest",
//     type: "likert",
//     question: "I get satisfaction from mentoring and guiding others.",
//     options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
//   },
//   {
//     id: "i10",
//     category: "Career Interests",
//     dimension: "interest",
//     type: "scenario",
//     question: "Your manager offers you two projects: one involves coding an AI tool, the other involves leading a client team. You'd choose:",
//     scenarios: {
//       situation: "You have to pick between two projects.",
//       responses: ["AI tool coding", "Leading the client team"],
//     },
//   },

//   // ======================
//   // PERSONALITY TRAITS (10)
//   // ======================
//   {
//     id: "p1",
//     category: "Personality Traits",
//     dimension: "personality",
//     type: "likert",
//     question: "I feel energized when working in groups and social settings.",
//     options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
//   },
//   {
//     id: "p2",
//     category: "Personality Traits",
//     dimension: "personality",
//     type: "slider",
//     question: "How do you handle stress and pressure?",
//     labels: ["Struggle significantly", "Thrive under pressure"],
//     min: 1,
//     max: 10,
//   },
//   {
//     id: "p3",
//     category: "Personality Traits",
//     dimension: "personality",
//     type: "scenario",
//     question: "At a team meeting, you typically:",
//     scenarios: {
//       situation: "You're in a brainstorming session with conflicting ideas.",
//       responses: [
//         "Listen and synthesize different viewpoints",
//         "Contribute your own ideas actively",
//         "Ask probing questions",
//         "Focus on practical implementation",
//       ],
//     },
//   },
//   {
//     id: "p4",
//     category: "Personality Traits",
//     dimension: "personality",
//     type: "likert",
//     question: "I adapt quickly to unexpected changes.",
//     options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
//   },
//   {
//     id: "p5",
//     category: "Personality Traits",
//     dimension: "personality",
//     type: "multiple-choice",
//     question: "Which trait describes you best?",
//     options: ["Organized", "Creative", "Analytical", "Empathetic"],
//   },
//   // {
//   //   id: "p6",
//   //   category: "Personality Traits",
//   //   dimension: "personality",
//   //   type: "ranking",
//   //   question: "Rank these personal qualities:",
//   //   options: ["Ambition", "Patience", "Creativity", "Discipline"],
//   // },
//   {
//     id: "p7",
//     category: "Personality Traits",
//     dimension: "personality",
//     type: "likert",
//     question: "I enjoy being the center of attention.",
//     options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
//   },
//   {
//     id: "p8",
//     category: "Personality Traits",
//     dimension: "personality",
//     type: "slider",
//     question: "How introverted or extroverted do you consider yourself?",
//     labels: ["Highly introverted", "Highly extroverted"],
//     min: 1,
//     max: 10,
//   },
//   {
//     id: "p9",
//     category: "Personality Traits",
//     dimension: "personality",
//     type: "likert",
//     question: "I prefer following rules rather than questioning them.",
//     options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
//   },
//   {
//     id: "p10",
//     category: "Personality Traits",
//     dimension: "personality",
//     type: "scenario",
//     question: "You receive constructive criticism from a supervisor. You:",
//     scenarios: {
//       situation: "A manager gives you detailed feedback on your work.",
//       responses: [
//         "Appreciate it and apply feedback",
//         "Feel defensive but reflect later",
//         "Ignore it and continue as usual",
//         "Ask for specific improvement steps",
//       ],
//     },
//   },

//   // ======================
//   // COGNITIVE APTITUDE (10)
//   // ======================
//   {
//     id: "a1",
//     category: "Cognitive Aptitude",
//     dimension: "aptitude",
//     type: "multiple-choice",
//     question: "If the pattern is 2, 6, 18, 54, what comes next?",
//     options: ["108", "162", "216", "324"],
//   },
//   {
//     id: "a2",
//     category: "Cognitive Aptitude",
//     dimension: "aptitude",
//     type: "likert",
//     question: "I can quickly identify logical inconsistencies in arguments.",
//     options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
//   },
//   {
//     id: "a3",
//     category: "Cognitive Aptitude",
//     dimension: "aptitude",
//     type: "scenario",
//     question: "You need to learn a new software tool for your job:",
//     scenarios: {
//       situation: "Your company is implementing a new project management system.",
//       responses: [
//         "Read the manual before using it",
//         "Experiment and learn by doing",
//         "Take a structured course",
//         "Ask colleagues for tips",
//       ],
//     },
//   },
//   {
//     id: "a4",
//     category: "Cognitive Aptitude",
//     dimension: "aptitude",
//     type: "multiple-choice",
//     question: "What is 15% of 240?",
//     options: ["24", "30", "36", "40"],
//   },
//   {
//     id: "a5",
//     category: "Cognitive Aptitude",
//     dimension: "aptitude",
//     type: "slider",
//     question: "Rate your numerical problem-solving skills.",
//     labels: ["Low", "High"],
//     min: 1,
//     max: 10,
//   },
//   {
//     id: "a6",
//     category: "Cognitive Aptitude",
//     dimension: "aptitude",
//     type: "likert",
//     question: "I find abstract puzzles enjoyable.",
//     options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
//   },
//   {
//     id: "a7",
//     category: "Cognitive Aptitude",
//     dimension: "aptitude",
//     type: "scenario",
//     question: "You encounter an unfamiliar formula in a report:",
//     scenarios: {
//       situation: "You're reading a report and see a formula you don't know.",
//       responses: [
//         "Look it up online",
//         "Skip it and focus on what you know",
//         "Try to deduce its meaning",
//         "Ask an expert immediately",
//       ],
//     },
//   },
//   {
//     id: "a8",
//     category: "Cognitive Aptitude",
//     dimension: "aptitude",
//     type: "likert",
//     question: "I can quickly switch between different tasks and mental processes.",
//     options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
//   },
//   {
//     id: "a9",
//     category: "Cognitive Aptitude",
//     dimension: "aptitude",
//     type: "multiple-choice",
//     question: "If A = 1, B = 2 ... Z = 26, what is the sum of C + A + T?",
//     options: ["20", "22", "24", "26"],
//   },
//   // {
//   //   id: "a10",
//   //   category: "Cognitive Aptitude",
//   //   dimension: "aptitude",
//   //   type: "ranking",
//   //   question: "Rank these problem-solving strategies:",
//   //   options: ["Trial and error", "Logical reasoning", "Step-by-step breakdown", "Intuition"],
//   // },

//   // ======================
//   // EMOTIONAL INTELLIGENCE (10)
//   // ======================
//   {
//     id: "e1",
//     category: "Emotional Intelligence",
//     dimension: "eq",
//     type: "likert",
//     question: "I can easily recognize and understand others' emotions.",
//     options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
//   },
//   {
//     id: "e2",
//     category: "Emotional Intelligence",
//     dimension: "eq",
//     type: "scenario",
//     question: "A colleague seems upset after a meeting. You:",
//     scenarios: {
//       situation: "You notice a team member looking distressed after receiving feedback.",
//       responses: [
//         "Offer private support",
//         "Give them space and check later",
//         "Suggest speaking with the manager",
//         "Share a similar experience to relate",
//       ],
//     },
//   },
//   {
//     id: "e3",
//     category: "Emotional Intelligence",
//     dimension: "eq",
//     type: "slider",
//     question: "How well do you manage your emotions in challenging situations?",
//     labels: ["Very difficult", "Very well"],
//     min: 1,
//     max: 10,
//   },
//   {
//     id: "e4",
//     category: "Emotional Intelligence",
//     dimension: "eq",
//     type: "likert",
//     question: "I can stay calm even when under pressure.",
//     options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
//   },
//   {
//     id: "e5",
//     category: "Emotional Intelligence",
//     dimension: "eq",
//     type: "multiple-choice",
//     question: "When resolving conflicts, I usually:",
//     options: [
//       "Look for compromise",
//       "Stand firm on my position",
//       "Defer to the other person",
//       "Seek outside mediation",
//     ],
//   },
//   // {
//   //   id: "e6",
//   //   category: "Emotional Intelligence",
//   //   dimension: "eq",
//   //   type: "ranking",
//   //   question: "Rank these emotional skills by importance:",
//   //   options: ["Self-awareness", "Empathy", "Self-control", "Relationship-building"],
//   // },
//   {
//     id: "e7",
//     category: "Emotional Intelligence",
//     dimension: "eq",
//     type: "likert",
//     question: "I can motivate others when they are feeling low.",
//     options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
//   },
//   {
//     id: "e8",
//     category: "Emotional Intelligence",
//     dimension: "eq",
//     type: "scenario",
//     question: "A teammate takes credit for your work. You:",
//     scenarios: {
//       situation: "Your colleague presents your work as their own.",
//       responses: [
//         "Confront them immediately",
//         "Talk privately later",
//         "Report to manager",
//         "Ignore it",
//       ],
//     },
//   },
//   {
//     id: "e9",
//     category: "Emotional Intelligence",
//     dimension: "eq",
//     type: "likert",
//     question: "I can easily let go of negative emotions after conflicts.",
//     options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
//   },
//   {
//     id: "e10",
//     category: "Emotional Intelligence",
//     dimension: "eq",
//     type: "slider",
//     question: "How empathetic are you towards others?",
//     labels: ["Low empathy", "High empathy"],
//     min: 1,
//     max: 10,
//   },
// ];
const psychometricQuestions: Question[] = [
  // ======================
  // ORIENTATION STYLE (3)
  // ======================
  {
    id: "o1",
    category: "Orientation Style",
    dimension: "orientation",
    type: "likert",
    question: "I prefer working on tasks that have clear, structured guidelines.",
    options: ["assessment.likert_scale.strongly_disagree", "assessment.likert_scale.disagree", "assessment.likert_scale.neutral", "assessment.likert_scale.agree", "assessment.likert_scale.strongly_agree"],
  },
  {
    id: "o3",
    category: "Orientation Style",
    dimension: "orientation",
    type: "scenario",
    question: "You're given a complex problem to solve at work:",
    scenarios: {
      situation: "Your manager assigns you a project with unclear requirements and a tight deadline.",
      responses: [
        "Ask for clarification and create a structured approach",
        "Start working immediately and adjust based on feedback",
        "Break it down into smaller, manageable tasks",
        "Collaborate with colleagues to brainstorm solutions",
      ],
    },
  },
  {
    id: "o6",
    category: "Orientation Style",
    dimension: "orientation",
    type: "multiple-choice",
    question: "In group projects, my natural role is:",
    options: ["Planner", "Executor", "Innovator", "Coordinator"],
  },

  // ======================
  // CAREER INTERESTS (3)
  // ======================
  {
    id: "i2",
    category: "Career Interests",
    dimension: "interest",
    type: "likert",
    question: "I enjoy working with cutting-edge technology and innovation.",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
  },
  {
    id: "i3",
    category: "Career Interests",
    dimension: "interest",
    type: "multiple-choice",
    question: "In your ideal work environment, you would be:",
    options: [
      "Working independently on focused tasks",
      "Collaborating with diverse teams",
      "Leading projects and making strategic decisions",
      "Mentoring and developing others",
    ],
  },
  {
    id: "i5",
    category: "Career Interests",
    dimension: "interest",
    type: "scenario",
    question: "You have free time on the weekend. You'd rather:",
    scenarios: {
      situation: "It's the weekend and you have no urgent tasks.",
      responses: [
        "Work on a creative hobby (art, music, design)",
        "Read about science/technology",
        "Volunteer for a social cause",
        "Plan and organize a community event",
      ],
    },
  },

  // ======================
  // PERSONALITY TRAITS (3)
  // ======================
  {
    id: "p1",
    category: "Personality Traits",
    dimension: "personality",
    type: "likert",
    question: "I feel energized when working in groups and social settings.",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
  },
  {
    id: "p3",
    category: "Personality Traits",
    dimension: "personality",
    type: "scenario",
    question: "At a team meeting, you typically:",
    scenarios: {
      situation: "You're in a brainstorming session with conflicting ideas.",
      responses: [
        "Listen and synthesize different viewpoints",
        "Contribute your own ideas actively",
        "Ask probing questions",
        "Focus on practical implementation",
      ],
    },
  },
  {
    id: "p5",
    category: "Personality Traits",
    dimension: "personality",
    type: "multiple-choice",
    question: "Which trait describes you best?",
    options: ["Organized", "Creative", "Analytical", "Empathetic"],
  },

  // ======================
  // COGNITIVE APTITUDE (3)
  // ======================
  {
    id: "a1",
    category: "Cognitive Aptitude",
    dimension: "aptitude",
    type: "multiple-choice",
    question: "If the pattern is 2, 6, 18, 54, what comes next?",
    options: ["108", "162", "216", "324"],
  },
  {
    id: "a2",
    category: "Cognitive Aptitude",
    dimension: "aptitude",
    type: "likert",
    question: "I can quickly identify logical inconsistencies in arguments.",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
  },
  {
    id: "a5",
    category: "Cognitive Aptitude",
    dimension: "aptitude",
    type: "slider",
    question: "Rate your numerical problem-solving skills.",
    labels: ["Low", "High"],
    min: 1,
    max: 10,
  },

  // ======================
  // EMOTIONAL INTELLIGENCE (3)
  // ======================
  {
    id: "e1",
    category: "Emotional Intelligence",
    dimension: "eq",
    type: "likert",
    question: "I can easily recognize and understand others' emotions.",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
  },
  {
    id: "e2",
    category: "Emotional Intelligence",
    dimension: "eq",
    type: "scenario",
    question: "A colleague seems upset after a meeting. You:",
    scenarios: {
      situation: "You notice a team member looking distressed after receiving feedback.",
      responses: [
        "Offer private support",
        "Give them space and check later",
        "Suggest speaking with the manager",
        "Share a similar experience to relate",
      ],
    },
  },
  {
    id: "e10",
    category: "Emotional Intelligence",
    dimension: "eq",
    type: "slider",
    question: "How empathetic are you towards others?",
    labels: ["Low empathy", "High empathy"],
    min: 1,
    max: 10,
  },
];




interface PersonalityProfile {
  strengths: string[];
  workStyle: string;
  careerFit: string[];
  developmentAreas: string[];
  insights: string[];
}
interface AssessmentResults {
  timestamp: string;
  timeTaken: number;
  dimensionScores: Record<string, number>;
  personalityProfile: PersonalityProfile;
  answers: Record<string, any>;
  rawScores: Record<string, number>;
  overallScore: number;
}

export function Advanced5DAssessment({ onComplete }: Advanced5DAssessmentProps) {
  const { t } = useTranslation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [currentDimension, setCurrentDimension] = useState<string>('orientation');
  const [timeStarted, setTimeStarted] = useState<Date>(new Date());
  const [dimensionProgress, setDimensionProgress] = useState<Record<string, number>>({});

  const currentQuestion = psychometricQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / psychometricQuestions.length) * 100;

  useEffect(() => {
    // Update dimension progress
    const newProgress = { ...dimensionProgress };
    assessmentDimensions.forEach(dim => {
      const dimensionQuestions = psychometricQuestions.filter(q => q.dimension === dim.id);
      const answeredCount = dimensionQuestions.filter(q => answers[q.id] !== undefined).length;
      newProgress[dim.id] = (answeredCount / dimensionQuestions.length) * 100;
    });
    setDimensionProgress(newProgress);

    // Update current dimension
    if (currentQuestion) {
      setCurrentDimension(currentQuestion.dimension);
    }
  }, [currentQuestionIndex, answers]);

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < psychometricQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    const timeCompleted = new Date();
    const timeTaken = Math.round((timeCompleted.getTime() - timeStarted.getTime()) / 1000 / 60); // minutes

    // Calculate dimension scores
    const dimensionScores = assessmentDimensions.reduce((scores, dimension) => {
      const dimensionQuestions = psychometricQuestions.filter(q => q.dimension === dimension.id);
      let totalScore = 0;
      let maxScore = 0;

      dimensionQuestions.forEach(question => {
        const answer = answers[question.id];
        if (answer !== undefined) {
          if (question.type === 'likert') {
            totalScore += answer;
            maxScore += 4; // 0-4 scale
          } else if (question.type === 'slider') {
            totalScore += answer;
            maxScore += question.max || 10;
          } else if (question.type === 'multiple-choice' || question.type === 'scenario') {
            totalScore += answer === 0 ? 4 : answer === 1 ? 3 : answer === 2 ? 2 : 1;
            maxScore += 4;
          }
        }
      });

      scores[dimension.id] = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
      return scores;
    }, {} as Record<string, number>);

    // Generate personality insights
    const personalityProfile = generatePersonalityProfile(dimensionScores, answers);
    
    const results = {
      timestamp: timeCompleted.toISOString(),
      timeTaken,
      dimensionScores,
      personalityProfile,
      answers,
      rawScores: dimensionScores,
      overallScore: Math.round(Object.values(dimensionScores).reduce((a, b) => a + b, 0) / 5)
    };

    onComplete(results);
  };

  const renderQuestion = () => {
    const answer = answers[currentQuestion.id];

    switch (currentQuestion.type) {
      case 'likert':
        return (
          <RadioGroup value={answer?.toString() || ''} onValueChange={(value) => handleAnswer(parseInt(value))}>
            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="cursor-pointer">
                    {option.startsWith('assessment.') ? t(option) : option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        );

      case 'multiple-choice':
        return (
          <RadioGroup value={answer?.toString() || ''} onValueChange={(value) => handleAnswer(parseInt(value))}>
            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="cursor-pointer">
                    {option.startsWith('assessment.') ? t(option) : option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        );

      case 'scenario':
  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-blue-900 dark:text-blue-100">
          <strong>Scenario:</strong> {currentQuestion.scenarios?.situation}
        </p>
      </div>
      <RadioGroup
        value={answer?.toString() || ''}
        onValueChange={(value) => handleAnswer(parseInt(value))}
      >
        <div className="space-y-3">
          {currentQuestion.scenarios?.responses.map((response, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={index.toString()} id={`response-${index}`} />
              <Label htmlFor={`response-${index}`} className="cursor-pointer">
                {response}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );


      case 'slider':
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>{currentQuestion.labels?.[0]}</span>
              <span>{currentQuestion.labels?.[1]}</span>
            </div>
            <Slider
              value={[answer || currentQuestion.min || 1]}
              onValueChange={(value) => handleAnswer(value[0])}
              min={currentQuestion.min || 1}
              max={currentQuestion.max || 10}
              step={1}
              className="w-full"
            />
            <div className="text-center">
              <Badge variant="secondary">{answer || currentQuestion.min || 1}</Badge>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const currentDimensionInfo = assessmentDimensions.find(d => d.id === currentDimension);
  const Icon = currentDimensionInfo?.icon || Brain;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Brain className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            {t('assessment.title')}
          </CardTitle>
          <CardDescription>
            {t('assessment.description')}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Overall Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">{t('assessment.overall_progress')}</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {currentQuestionIndex + 1} of {psychometricQuestions.length}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </CardContent>
      </Card>

      {/* Dimension Progress */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {assessmentDimensions.map((dimension) => {
          const DimIcon = dimension.icon;
          const isActive = dimension.id === currentDimension;
          const progress = dimensionProgress[dimension.id] || 0;
          
          return (
            <Card key={dimension.id} className={`${isActive ? 'ring-2 ring-indigo-500' : ''}`}>
              <CardContent className="p-4 text-center">
                <DimIcon className={`h-6 w-6 mx-auto mb-2 ${dimension.color}`} />
                <h3 className="font-medium text-sm mb-1">{t(dimension.titleKey)}</h3>
                <Progress value={progress} className="w-full h-2" />
                <span className="text-xs text-gray-600 dark:text-gray-400 mt-1 block">
                  {Math.round(progress)}%
                </span>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Current Question */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <Icon className={`h-8 w-8 ${currentDimensionInfo?.color}`} />
            <div>
              <CardTitle className="text-lg">{currentDimensionInfo ? t(currentDimensionInfo.titleKey) : ''}</CardTitle>
              <CardDescription>{currentDimensionInfo ? t(currentDimensionInfo.descriptionKey) : ''}</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="w-fit">
            Question {currentQuestionIndex + 1}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
            {renderQuestion()}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              {t('common.previous')}
            </Button>
            <Button
              onClick={handleNext}
              disabled={answers[currentQuestion.id] === undefined}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {currentQuestionIndex === psychometricQuestions.length - 1 ? t('assessment.complete_assessment') : t('common.next')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Time Indicator */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            {t('assessment.estimated_time', { minutes: Math.max(1, Math.round((psychometricQuestions.length - currentQuestionIndex - 1) * 0.5)) })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function generatePersonalityProfile(
  scores: Record<string, number>,
  answers: Record<string, any>
): PersonalityProfile {
  const insights: string[] = [];

  if (scores.orientation > 75) {
    insights.push("You prefer structured, methodical approaches to work and learning.");
  } else if (scores.orientation < 40) {
    insights.push("You thrive in flexible, adaptive environments with room for creativity.");
  }

  if (scores.personality > 70) {
    insights.push("You're energized by social interactions and collaborative environments.");
  } else if (scores.personality < 40) {
    insights.push("You work best in quiet, focused environments with minimal distractions.");
  }

  if (scores.eq > 80) {
    insights.push("You have strong emotional intelligence and interpersonal skills.");
  }

  if (scores.aptitude > 75) {
    insights.push("You demonstrate high cognitive ability and quick learning capacity.");
  }

  return {
    strengths: getTopStrengths(scores),
    workStyle: getWorkStyle(scores),
    careerFit: getCareerFit(scores),
    developmentAreas: getDevelopmentAreas(scores),
    insights
  };
}

function getTopStrengths(scores: Record<string, number>): string[] {
  const strengths: string[] = [];
  if (scores.orientation > 70) strengths.push("Strategic Planning");
  if (scores.interest > 70) strengths.push("Intrinsic Motivation");
  if (scores.personality > 70) strengths.push("Team Collaboration");
  if (scores.aptitude > 70) strengths.push("Problem Solving");
  if (scores.eq > 70) strengths.push("Emotional Intelligence");
  return strengths;
}

function getWorkStyle(scores: Record<string, number>): string {
  if (scores.personality > 60 && scores.eq > 60) return "Collaborative Leader";
  if (scores.aptitude > 70 && scores.orientation > 60) return "Analytical Strategist";
  if (scores.interest > 70 && scores.personality < 50) return "Independent Innovator";
  return "Balanced Professional";
}

function getCareerFit(scores: Record<string, number>): string[] {
  const fits: string[] = [];
  if (scores.aptitude > 70 && scores.orientation > 60) fits.push("Technical Roles");
  if (scores.eq > 70 && scores.personality > 60) fits.push("Leadership Positions");
  if (scores.interest > 70) fits.push("Creative Fields");
  if (scores.orientation > 70) fits.push("Project Management");
  return fits;
}

function getDevelopmentAreas(scores: Record<string, number>): string[] {
  const areas: string[] = [];
  if (scores.eq < 60) areas.push("Emotional Intelligence");
  if (scores.personality < 50) areas.push("Team Collaboration");
  if (scores.orientation < 50) areas.push("Strategic Planning");
  if (scores.aptitude < 60) areas.push("Analytical Skills");
  return areas;
}