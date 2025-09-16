import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  Play, 
  Clock, 
  Users, 
  Award, 
  Star, 
  CheckCircle, 
  Lock,
  BookOpen,
  Video,
  FileText,
  Download,
  Calendar,
  TrendingUp,
  Building2,
  Code,
  Palette,
  BarChart3,
  Briefcase
} from 'lucide-react';

interface VirtualInternship {
  id: string;
  title: string;
  company: string;
  industry: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  skills: string[];
  modules: Module[];
  certification: boolean;
  prerequisites: string[];
  rating: number;
  completions: number;
  icon: any;
  color: string;
}

interface Module {
  id: string;
  title: string;
  type: 'video' | 'simulation' | 'project' | 'quiz' | 'reading';
  duration: string;
  completed: boolean;
  locked: boolean;
  content?: string;
}

const virtualInternships: VirtualInternship[] = [
  {
    id: 'data-science-google',
    title: 'Data Science Virtual Experience',
    company: 'Google',
    industry: 'Technology',
    duration: '4 weeks',
    difficulty: 'Intermediate',
    description: 'Experience the day-to-day work of a Google data scientist through real-world projects and simulations.',
    skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization', 'Statistical Analysis'],
    certification: true,
    prerequisites: ['Basic Python', 'Statistics fundamentals'],
    rating: 4.8,
    completions: 12543,
    icon: BarChart3,
    color: 'text-blue-600 dark:text-blue-400',
    modules: [
      { id: 'intro', title: 'Introduction to Google\'s Data Science Culture', type: 'video', duration: '15 min', completed: true, locked: false },
      { id: 'exploration', title: 'Exploratory Data Analysis Simulation', type: 'simulation', duration: '45 min', completed: true, locked: false },
      { id: 'modeling', title: 'Build a Recommendation System', type: 'project', duration: '2 hours', completed: false, locked: false },
      { id: 'presentation', title: 'Present Insights to Stakeholders', type: 'simulation', duration: '30 min', completed: false, locked: true },
      { id: 'assessment', title: 'Final Assessment', type: 'quiz', duration: '30 min', completed: false, locked: true }
    ]
  },
  {
    id: 'product-design-apple',
    title: 'Product Design Internship',
    company: 'Apple',
    industry: 'Technology',
    duration: '3 weeks',
    difficulty: 'Intermediate',
    description: 'Learn Apple\'s design philosophy and create user-centered product experiences.',
    skills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping', 'Design Thinking'],
    certification: true,
    prerequisites: ['Basic design principles', 'Figma familiarity'],
    rating: 4.9,
    completions: 8967,
    icon: Palette,
    color: 'text-purple-600 dark:text-purple-400',
    modules: [
      { id: 'design-thinking', title: 'Apple Design Philosophy', type: 'video', duration: '20 min', completed: false, locked: false },
      { id: 'user-research', title: 'Conduct User Research', type: 'simulation', duration: '1 hour', completed: false, locked: false },
      { id: 'wireframing', title: 'Create App Wireframes', type: 'project', duration: '2 hours', completed: false, locked: true },
      { id: 'prototyping', title: 'Interactive Prototype', type: 'project', duration: '3 hours', completed: false, locked: true },
      { id: 'critique', title: 'Design Critique Session', type: 'simulation', duration: '45 min', completed: false, locked: true }
    ]
  },
  {
    id: 'software-dev-microsoft',
    title: 'Software Development Program',
    company: 'Microsoft',
    industry: 'Technology',
    duration: '6 weeks',
    difficulty: 'Advanced',
    description: 'Develop real software solutions using Microsoft\'s development practices and technologies.',
    skills: ['C#', '.NET', 'Azure', 'DevOps', 'Agile Development'],
    certification: true,
    prerequisites: ['Programming experience', 'Object-oriented concepts'],
    rating: 4.7,
    completions: 6234,
    icon: Code,
    color: 'text-green-600 dark:text-green-400',
    modules: [
      { id: 'onboarding', title: 'Microsoft Development Culture', type: 'video', duration: '25 min', completed: false, locked: false },
      { id: 'coding', title: 'Code Review Simulation', type: 'simulation', duration: '1.5 hours', completed: false, locked: false },
      { id: 'feature', title: 'Implement New Feature', type: 'project', duration: '4 hours', completed: false, locked: true },
      { id: 'testing', title: 'Testing & QA Process', type: 'simulation', duration: '1 hour', completed: false, locked: true },
      { id: 'deployment', title: 'Deploy to Azure', type: 'project', duration: '2 hours', completed: false, locked: true }
    ]
  },
  {
    id: 'consulting-mckinsey',
    title: 'Management Consulting Experience',
    company: 'McKinsey & Company',
    industry: 'Consulting',
    duration: '5 weeks',
    difficulty: 'Advanced',
    description: 'Solve real business problems using McKinsey\'s structured problem-solving approach.',
    skills: ['Strategic Thinking', 'Case Analysis', 'Client Communication', 'Excel Modeling', 'Presentation'],
    certification: true,
    prerequisites: ['Business fundamentals', 'Analytical thinking'],
    rating: 4.8,
    completions: 4567,
    icon: Briefcase,
    color: 'text-orange-600 dark:text-orange-400',
    modules: [
      { id: 'framework', title: 'McKinsey Problem-Solving Framework', type: 'video', duration: '30 min', completed: false, locked: false },
      { id: 'case-study', title: 'Client Case Simulation', type: 'simulation', duration: '2 hours', completed: false, locked: false },
      { id: 'analysis', title: 'Data Analysis & Modeling', type: 'project', duration: '3 hours', completed: false, locked: true },
      { id: 'recommendation', title: 'Strategic Recommendations', type: 'project', duration: '2 hours', completed: false, locked: true },
      { id: 'presentation', title: 'Client Presentation', type: 'simulation', duration: '1 hour', completed: false, locked: true }
    ]
  }
];

export function VirtualInternships() {
  const { t } = useTranslation();
  const [selectedInternship, setSelectedInternship] = useState<VirtualInternship | null>(null);
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [userProgress, setUserProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    // Load user progress from localStorage
    const savedProgress = localStorage.getItem('virtualInternshipProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  const startInternship = (internship: VirtualInternship) => {
    setSelectedInternship(internship);
    // Initialize progress if not exists
    if (!userProgress[internship.id]) {
      const newProgress = { ...userProgress };
      newProgress[internship.id] = 0;
      setUserProgress(newProgress);
      localStorage.setItem('virtualInternshipProgress', JSON.stringify(newProgress));
    }
  };

  const completeModule = (internshipId: string, moduleId: string) => {
    const internship = virtualInternships.find(i => i.id === internshipId);
    if (!internship) return;

    // Mark module as completed
    const moduleIndex = internship.modules.findIndex(m => m.id === moduleId);
    if (moduleIndex !== -1) {
      internship.modules[moduleIndex].completed = true;
      
      // Unlock next module
      if (moduleIndex < internship.modules.length - 1) {
        internship.modules[moduleIndex + 1].locked = false;
      }
    }

    // Update progress
    const completedModules = internship.modules.filter(m => m.completed).length;
    const progress = (completedModules / internship.modules.length) * 100;
    
    const newProgress = { ...userProgress };
    newProgress[internshipId] = progress;
    setUserProgress(newProgress);
    localStorage.setItem('virtualInternshipProgress', JSON.stringify(newProgress));
  };

  const generateCertificate = (internship: VirtualInternship) => {
    // Simulate certificate generation
    const certificateData = {
      internshipTitle: internship.title,
      company: internship.company,
      completionDate: new Date().toLocaleDateString(),
      skills: internship.skills,
      duration: internship.duration
    };
    
    // In a real app, this would generate a PDF certificate
    console.log('Certificate generated:', certificateData);
    alert(`Congratulations! Your certificate for ${internship.title} has been generated.`);
  };

  const InternshipCard = ({ internship }: { internship: VirtualInternship }) => {
    const Icon = internship.icon;
    const progress = userProgress[internship.id] || 0;
    const isCompleted = progress === 100;

    return (
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center`}>
                <Icon className={`h-6 w-6 ${internship.color}`} />
              </div>
              <div>
                <CardTitle className="text-lg">{internship.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  {internship.company}
                </CardDescription>
              </div>
            </div>
            <div className="text-right">
              <Badge variant={internship.difficulty === 'Beginner' ? 'secondary' : 
                            internship.difficulty === 'Intermediate' ? 'default' : 'destructive'}>
                {internship.difficulty}
              </Badge>
              {isCompleted && (
                <Badge variant="outline" className="mt-1 text-green-600 border-green-600">
                  <Award className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{internship.description}</p>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {internship.duration}
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {internship.completions.toLocaleString()} completed
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {internship.rating}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {internship.skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {internship.skills.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{internship.skills.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button 
              className="flex-1" 
              onClick={() => startInternship(internship)}
              variant={progress > 0 ? "default" : "default"}
            >
              {progress > 0 ? t('virtual_internships.continue_internship') : t('virtual_internships.start_internship')}
            </Button>
            {isCompleted && internship.certification && (
              <Button 
                variant="outline" 
                onClick={() => generateCertificate(internship)}
                className="flex-shrink-0"
              >
                <Download className="h-4 w-4 mr-2" />
                {t('common.download')}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const ModuleContent = ({ module, internship }: { module: Module; internship: VirtualInternship }) => {
    const getModuleIcon = (type: string) => {
      switch (type) {
        case 'video': return Video;
        case 'simulation': return Play;
        case 'project': return Code;
        case 'quiz': return CheckCircle;
        case 'reading': return BookOpen;
        default: return FileText;
      }
    };

    const Icon = getModuleIcon(module.type);

    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <div>
              <CardTitle>{module.title}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {module.duration}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {module.type === 'video' && (
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Play className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-400">Video content would be embedded here</p>
                </div>
              </div>
            )}

            {module.type === 'simulation' && (
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <Play className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <h3 className="font-semibold mb-2">Interactive Simulation</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Experience real-world scenarios in a safe, simulated environment
                </p>
                <Button>{t('virtual_internships.launch_simulation')}</Button>
              </div>
            )}

            {module.type === 'project' && (
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <Code className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <h3 className="font-semibold mb-2">Hands-on Project</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Apply your skills to solve real business problems
                </p>
                <Button>{t('virtual_internships.start_project')}</Button>
              </div>
            )}

            <div className="flex justify-between">
              <Button variant="outline">{t('virtual_internships.previous_module')}</Button>
              <Button 
                onClick={() => completeModule(internship.id, module.id)}
                disabled={module.completed}
              >
                {module.completed ? t('virtual_internships.completed') : t('virtual_internships.mark_complete')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (selectedInternship) {
    const progress = userProgress[selectedInternship.id] || 0;
    const isCompleted = progress === 100;

    return (
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="outline" onClick={() => setSelectedInternship(null)}>
                  ← {t('common.back')}
                </Button>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {selectedInternship.title}
                    {isCompleted && <Award className="h-5 w-5 text-yellow-500" />}
                  </CardTitle>
                  <CardDescription>{selectedInternship.company} • {selectedInternship.duration}</CardDescription>
                </div>
              </div>
              {isCompleted && selectedInternship.certification && (
                <Button onClick={() => generateCertificate(selectedInternship)}>
                  <Download className="h-4 w-4 mr-2" />
                  {t('virtual_internships.download_certificate')}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">{t('assessment.overall_progress')}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </CardContent>
        </Card>

        {/* Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Module List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>{t('virtual_internships.modules')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedInternship.modules.map((module, index) => {
                  const Icon = module.type === 'video' ? Video :
                              module.type === 'simulation' ? Play :
                              module.type === 'project' ? Code :
                              module.type === 'quiz' ? CheckCircle : BookOpen;

                  return (
                    <div
                      key={module.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        module.locked ? 'bg-gray-50 dark:bg-gray-800 opacity-50' :
                        module.completed ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' :
                        activeModule?.id === module.id ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' :
                        'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => !module.locked && setActiveModule(module)}
                    >
                      <div className="flex items-center gap-3">
                        {module.locked ? (
                          <Lock className="h-4 w-4 text-gray-400" />
                        ) : module.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{module.title}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{module.duration}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Module Content */}
          <div className="lg:col-span-2">
            {activeModule ? (
              <ModuleContent module={activeModule} internship={selectedInternship} />
            ) : (
              <Card>
                <CardContent className="pt-12 pb-12">
                  <div className="text-center">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold mb-2">{t('virtual_internships.select_module')}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {t('virtual_internships.select_module_description')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Play className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            {t('virtual_internships.title')}
          </CardTitle>
          <CardDescription>
            {t('virtual_internships.description')}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">50+</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('virtual_internships.available_programs')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">95%</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('virtual_internships.completion_rate')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">4.8★</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('virtual_internships.average_rating')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">100%</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('virtual_internships.free_certificates')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Internship Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {virtualInternships.map((internship) => (
          <InternshipCard key={internship.id} internship={internship} />
        ))}
      </div>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <CardContent className="pt-8 pb-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Ready to Start Your Virtual Career Journey?</h3>
            <p className="text-indigo-100 mb-6">
              Join thousands of students who have kickstarted their careers through our virtual internship programs
            </p>
            <Button variant="secondary" size="lg">
              Browse All Programs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}