import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { learningResourceService } from '../services/learningResourceService';
import { 
  BookOpen, 
  Play, 
  Award, 
  Clock, 
  Star, 
  Users, 
  ExternalLink,
  Filter,
  Search,
  TrendingUp,
  CheckCircle,
  Globe,
  Video,
  Zap,
  RefreshCw,
  Target
} from 'lucide-react';

interface LearningResourcesProps {
  skillGaps: any[];
  recommendations: any[];
}

interface Course {
  id: string;
  title: string;
  provider: string;
  type: 'course' | 'bootcamp' | 'certification' | 'tutorial';
  skill: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  rating: number;
  students: number;
  price: 'free' | 'paid' | 'freemium';
  description: string;
  url: string;
  features: string[];
  priority: 'high' | 'medium' | 'low';
}

export function LearningResources({ skillGaps, recommendations }: LearningResourcesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSkill, setFilterSkill] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [realTimeCourses, setRealTimeCourses] = useState<any[]>([]);
  const [learningPath, setLearningPath] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fetch real-time course data
  useEffect(() => {
    fetchRealTimeCourses();
  }, [skillGaps]);

  const fetchRealTimeCourses = async () => {
    setLoading(true);
    try {
      const [courses, path] = await Promise.all([
        learningResourceService.getPersonalizedCourses(skillGaps, { 
          careerGoal: recommendations?.[0]?.title || 'Data Scientist' 
        }),
        learningResourceService.generateLearningPath(skillGaps, 'Data Scientist', '8-12 months')
      ]);
      
      setRealTimeCourses(courses);
      setLearningPath(path);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      // Fallback to mock data
      setRealTimeCourses(mockCourses);
    } finally {
      setLoading(false);
    }
  };

  // Mock learning resources data (fallback)
  const mockCourses: Course[] = [
    {
      id: '1',
      title: 'Python for Data Science and Machine Learning Bootcamp',
      provider: 'Udemy',
      type: 'course',
      skill: 'Python',
      level: 'beginner',
      duration: '25 hours',
      rating: 4.6,
      students: 450000,
      price: 'paid',
      description: 'Learn how to use NumPy, Pandas, Seaborn, Matplotlib, Plotly, Scikit-Learn, Machine Learning, Tensorflow, and more!',
      url: '#',
      features: ['Hands-on projects', 'Certificate', 'Lifetime access', 'Q&A support'],
      priority: 'high'
    },
    {
      id: '2',
      title: 'Machine Learning Course by Andrew Ng',
      provider: 'Coursera',
      type: 'course',
      skill: 'Machine Learning',
      level: 'intermediate',
      duration: '11 weeks',
      rating: 4.9,
      students: 4800000,
      price: 'freemium',
      description: 'Learn machine learning algorithms, theory, and implementation from Stanford University.',
      url: '#',
      features: ['University-level content', 'Practical assignments', 'Peer interaction', 'Certificate'],
      priority: 'high'
    },
    {
      id: '3',
      title: 'SQL for Data Science',
      provider: 'Coursera',
      type: 'course',
      skill: 'SQL',
      level: 'beginner',
      duration: '4 weeks',
      rating: 4.5,
      students: 250000,
      price: 'freemium',
      description: 'Learn SQL basics and advanced queries for data analysis and data science.',
      url: '#',
      features: ['Hands-on practice', 'Real datasets', 'Certificate', 'Flexible schedule'],
      priority: 'high'
    },
    {
      id: '4',
      title: 'Data Visualization with Python',
      provider: 'edX',
      type: 'course',
      skill: 'Data Visualization',
      level: 'intermediate',
      duration: '6 weeks',
      rating: 4.4,
      students: 180000,
      price: 'freemium',
      description: 'Master data visualization using matplotlib, seaborn, and plotly.',
      url: '#',
      features: ['Interactive plots', 'Portfolio projects', 'Industry examples', 'Certificate'],
      priority: 'medium'
    },
    {
      id: '5',
      title: 'Statistics for Data Science',
      provider: 'Khan Academy',
      type: 'course',
      skill: 'Statistics',
      level: 'beginner',
      duration: '20 hours',
      rating: 4.7,
      students: 520000,
      price: 'free',
      description: 'Learn fundamental statistics concepts essential for data science.',
      url: '#',
      features: ['Interactive exercises', 'Progress tracking', 'Mobile friendly', 'Free forever'],
      priority: 'medium'
    },
    {
      id: '6',
      title: 'Effective Communication in Tech',
      provider: 'LinkedIn Learning',
      type: 'course',
      skill: 'Communication',
      level: 'beginner',
      duration: '3 hours',
      rating: 4.3,
      students: 95000,
      price: 'paid',
      description: 'Develop communication skills for technical professionals.',
      url: '#',
      features: ['Professional insights', 'Real-world scenarios', 'Certificate', 'Mobile access'],
      priority: 'low'
    },
    {
      id: '7',
      title: 'Fast.ai Deep Learning Course',
      provider: 'Fast.ai',
      type: 'course',
      skill: 'Machine Learning',
      level: 'advanced',
      duration: '7 weeks',
      rating: 4.8,
      students: 150000,
      price: 'free',
      description: 'Practical deep learning for coders - state-of-the-art results with minimal code.',
      url: '#',
      features: ['Cutting-edge techniques', 'Practical approach', 'Community support', 'Free'],
      priority: 'medium'
    },
    {
      id: '8',
      title: 'Google Data Analytics Certificate',
      provider: 'Coursera',
      type: 'certification',
      skill: 'Data Visualization',
      level: 'beginner',
      duration: '6 months',
      rating: 4.6,
      students: 320000,
      price: 'paid',
      description: 'Professional certificate program from Google covering data analytics fundamentals.',
      url: '#',
      features: ['Google credential', 'Job placement support', 'Hands-on projects', 'Industry recognition'],
      priority: 'high'
    }
  ];

  // Indian specific resources
  const indianResources = [
    {
      id: 'in1',
      title: 'NPTEL Data Science Course',
      provider: 'NPTEL',
      type: 'course',
      skill: 'Python',
      level: 'intermediate',
      duration: '12 weeks',
      rating: 4.4,
      students: 45000,
      price: 'free',
      description: 'Comprehensive data science course by IIT professors.',
      url: '#',
      features: ['IIT quality', 'Hindi/English', 'Certificate', 'Government recognized'],
      priority: 'high'
    },
    {
      id: 'in2',
      title: 'SWAYAM AI/ML Course',
      provider: 'SWAYAM',
      type: 'course',
      skill: 'Machine Learning',
      level: 'intermediate',
      duration: '16 weeks',
      rating: 4.5,
      students: 35000,
      price: 'free',
      description: 'Government initiative for AI and Machine Learning education.',
      url: '#',
      features: ['Government platform', 'Regional languages', 'Free certification', 'Industry aligned'],
      priority: 'high'
    },
    {
      id: 'in3',
      title: 'Skill India Digital Platform',
      provider: 'Skill India',
      type: 'certification',
      skill: 'Communication',
      level: 'beginner',
      duration: '40 hours',
      rating: 4.2,
      students: 125000,
      price: 'free',
      description: 'Develop workplace communication and soft skills.',
      url: '#',
      features: ['Government certified', 'Job linkage', 'Free training', 'Multiple languages'],
      priority: 'medium'
    }
  ];

  const allResources = realTimeCourses.length > 0 ? realTimeCourses : [...mockCourses, ...indianResources];

  // Filter courses based on skill gaps
  const prioritySkills = skillGaps
    .filter(gap => (gap.required - gap.current) >= 15)
    .map(gap => gap.skill);

  const filteredCourses = allResources.filter((course: any) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.skill.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = filterSkill === 'all' || course.skill === filterSkill;
    const matchesLevel = filterLevel === 'all' || course.level === filterLevel;
    const matchesType = filterType === 'all' || course.type === filterType;
    
    return matchesSearch && matchesSkill && matchesLevel && matchesType;
  });

  const recommendedCourses = filteredCourses.filter(course => 
    prioritySkills.includes(course.skill) || course.priority === 'high'
  );

  const formatStudents = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
    return count.toString();
  };

  const CourseCard = ({ course }: { course: any }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
            <CardDescription className="mt-1">
              {course.provider} • {course.type}
            </CardDescription>
          </div>
          <Badge variant={course.priority === 'high' ? 'default' : course.priority === 'medium' ? 'secondary' : 'outline'}>
            {course.priority === 'high' ? 'Recommended' : course.priority === 'medium' ? 'Useful' : 'Optional'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {course.level}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>{course.rating} ({formatStudents(course.students)})</span>
          </div>
          <div className="flex items-center space-x-2">
            {course.price === 'free' ? (
              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">Free</Badge>
            ) : course.price === 'freemium' ? (
              <Badge variant="outline" className="text-xs">Freemium</Badge>
            ) : (
              <Badge variant="outline" className="text-xs">Paid</Badge>
            )}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Features:</p>
          <div className="flex flex-wrap gap-1">
            {course.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
            {course.features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{course.features.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="outline" size="sm">
            <BookOpen className="h-4 w-4 mr-2" />
            Learn More
          </Button>
          <Button size="sm">
            Start Course
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span>AI-Powered Learning Resources</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={fetchRealTimeCourses}
                disabled={loading}
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                Refresh
              </Button>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Target className="h-3 w-3 mr-1" />
                Personalized
              </Badge>
            </div>
          </CardTitle>
          <CardDescription>
            Real-time course recommendations from multiple platforms based on your skill gaps
            {lastUpdated && (
              <span className="block text-xs text-gray-500 mt-1">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search courses, skills, providers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filterSkill} onValueChange={setFilterSkill}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skills</SelectItem>
                {Array.from(new Set(allResources.map(c => c.skill))).map(skill => (
                  <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="course">Course</SelectItem>
                <SelectItem value="bootcamp">Bootcamp</SelectItem>
                <SelectItem value="certification">Certification</SelectItem>
                <SelectItem value="tutorial">Tutorial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="recommended" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="path">Learning Path</TabsTrigger>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="indian">Indian Platforms</TabsTrigger>
        </TabsList>

        <TabsContent value="recommended" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recommendedCourses.length > 0 ? (
              recommendedCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <div className="col-span-2 text-center py-8">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No recommended courses found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="path" className="space-y-6">
          {learningPath ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <span>{learningPath.title}</span>
                </CardTitle>
                <CardDescription>
                  {learningPath.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        {learningPath.duration}
                      </Badge>
                      <Badge variant="secondary">
                        {learningPath.difficulty}
                      </Badge>
                    </div>
                    <div className="text-right text-sm">
                      <p className="font-medium text-green-600">
                        ROI: {learningPath.roi?.avgSalaryIncrease}% salary increase
                      </p>
                      <p className="text-gray-600">
                        {learningPath.roi?.jobPlacementRate}% job placement rate
                      </p>
                    </div>
                  </div>
                  <Progress value={0} className="h-2" />
                  <p className="text-sm text-gray-600 mt-2">0% Complete • Ready to start</p>
                </div>

                <div className="space-y-6">
                  {learningPath.milestones?.map((milestone: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">{milestone.title}</h4>
                        <Badge variant="secondary">{milestone.estimatedTime}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{milestone.description}</p>
                      
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium">Deliverables:</h5>
                        <ul className="text-sm text-gray-600">
                          {milestone.deliverables?.map((deliverable: string, idx: number) => (
                            <li key={idx} className="flex items-center space-x-2">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              <span>{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium mb-2">Skills You'll Gain</h3>
                  <div className="flex flex-wrap gap-2">
                    {learningPath.skillsGained?.map((skill: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center space-y-4">
                  <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mx-auto" />
                  <div>
                    <h3 className="font-semibold">Generating Learning Path</h3>
                    <p className="text-sm text-gray-600">
                      Creating personalized curriculum based on your goals...
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="indian" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-orange-600" />
                <span>Indian Learning Platforms</span>
              </CardTitle>
              <CardDescription>
                Government and Indian educational platforms for affordable, quality learning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {indianResources.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Benefits of Indian Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Free or very affordable</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Government recognized certificates</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Available in regional languages</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Job placement assistance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Industry-aligned curriculum</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Quality education from IITs/IIMs</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}