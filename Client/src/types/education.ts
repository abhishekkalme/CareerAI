export type EducationLevel = '10th' | '12th' | 'graduation' | 'post-graduation';

export type Stream = 'science' | 'commerce' | 'arts' | 'agriculture' | 'vocational';

export type CompetitiveExam = 'jee' | 'neet' | 'nda' | 'cuet' | 'cat' | 'gate' | 'upsc' | 'other';

export interface StudentProfile {
  id: string;
  educationLevel: EducationLevel;
  currentClass?: string;
  stream?: Stream;
  subjects?: string[];
  interests?: string[];
  strengths?: string[];
  degree?: string;
  specialization?: string;
  workExperience?: string;
  currentRole?: string;
  skills?: string[];
  certifications?: string[];
  careerGoals?: string[];
  competitiveExams?: CompetitiveExam[];
  internships?: boolean;
  projects?: string[];
}

export interface AssessmentConfig {
  level: EducationLevel;
  sections: AssessmentSection[];
  duration: number;
  passingScore: number;
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit?: number;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'single-choice' | 'rating' | 'text' | 'ranking';
  question: string;
  options?: string[];
  category: string;
  weight: number;
  explanation?: string;
}

export interface DashboardConfig {
  level: EducationLevel;
  sections: DashboardSection[];
  recommendations: RecommendationType[];
}

export interface DashboardSection {
  id: string;
  title: string;
  component: string;
  data: any;
}

export type RecommendationType = 
  | 'career-awareness' 
  | 'stream-selection' 
  | 'graduation-programs' 
  | 'job-opportunities' 
  | 'higher-studies' 
  | 'skill-development' 
  | 'leadership-growth';