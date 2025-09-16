import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { RealTimeJobData } from './RealTimeJobData';
import { jobMarketService } from '../services/jobMarketService';
import { 
  TrendingUp, 
  Star, 
  Users, 
  DollarSign, 
  MapPin, 
  Clock,
  ArrowRight,
  Award,
  Target,
  Lightbulb,
  Zap,
  RefreshCw
} from 'lucide-react';

interface CareerDashboardProps {
  userData: any;
  onExploreCareer: (career: any) => void;
}

export function CareerDashboard({ userData, onExploreCareer }: CareerDashboardProps) {
  const { t } = useTranslation();
  const { careerRecommendations, assessmentResults } = userData;
  const [realTimeData, setRealTimeData] = useState<any>(null);
  const [showJobData, setShowJobData] = useState(false);

  const overallMatch = careerRecommendations.length > 0 
    ? Math.round(careerRecommendations.reduce((sum: number, career: any) => sum + career.match, 0) / careerRecommendations.length)
    : 0;

  const strengthAreas = [
    { nameKey: 'dashboard.strengths.analytical_thinking', score: assessmentResults?.scores?.analytical || 85, color: 'text-blue-600' },
    { nameKey: 'dashboard.strengths.problem_solving', score: assessmentResults?.scores?.cognitive || 82, color: 'text-green-600' },
    { nameKey: 'dashboard.strengths.technical_aptitude', score: assessmentResults?.scores?.technical || 78, color: 'text-purple-600' },
    { nameKey: 'dashboard.strengths.communication', score: assessmentResults?.scores?.interpersonal || 80, color: 'text-orange-600' }
  ];

  const industryTrends = [
    { industry: 'Artificial Intelligence', growth: '+35%', demand: 'Very High', icon: '🤖' },
    { industry: 'Data Science', growth: '+22%', demand: 'High', icon: '📊' },
    { industry: 'Cybersecurity', growth: '+28%', demand: 'Very High', icon: '🔒' },
    { industry: 'Cloud Computing', growth: '+18%', demand: 'High', icon: '☁️' }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{overallMatch}%</p>
                <p className="text-sm text-gray-600">{t('dashboard.career_match')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Award className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{careerRecommendations.length}</p>
                <p className="text-sm text-gray-600">{t('dashboard.career_options')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-gray-600">{t('dashboard.skill_gaps')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">+25%</p>
                <p className="text-sm text-gray-600">{t('dashboard.avg_growth')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recommendations" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="recommendations">{t('dashboard.tabs.career_matches')}</TabsTrigger>
          <TabsTrigger value="strengths">{t('dashboard.tabs.strengths')}</TabsTrigger>
          <TabsTrigger value="market">{t('dashboard.tabs.live_job_market')}</TabsTrigger>
          <TabsTrigger value="trends">{t('dashboard.tabs.industry_trends')}</TabsTrigger>
          <TabsTrigger value="roadmap">{t('dashboard.tabs.quick_roadmap')}</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="space-y-4">
            {careerRecommendations.map((career, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <CardTitle className="text-xl">{career.title}</CardTitle>
                        <Badge 
                          variant={career.match >= 90 ? "default" : career.match >= 80 ? "secondary" : "outline"}
                          className="font-semibold"
                        >
                          {career.match}% Match
                        </Badge>
                      </div>
                      <CardDescription className="text-base">
                        {career.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">{career.salaryRange}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">{career.growth}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium">High Demand</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Required Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {career.requiredSkills.map((skill: string, skillIndex: number) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Top Companies:</p>
                    <div className="flex flex-wrap gap-2">
                      {career.companies.map((company: string, compIndex: number) => (
                        <Badge key={compIndex} variant="secondary" className="text-xs">
                          {company}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex items-center space-x-4">
                      <Progress value={career.match} className="w-24 h-2" />
                      <span className="text-sm text-gray-600">Match Score</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={() => onExploreCareer(career)} size="sm" variant="outline">
                        {t('common.explore')}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                      <Button 
                        onClick={() => setShowJobData(!showJobData)} 
                        size="sm"
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        {t('dashboard.live_data')}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <RealTimeJobData 
            role={careerRecommendations?.[0]?.title || 'Data Scientist'}
            location="San Francisco, CA"
            onDataUpdate={setRealTimeData}
          />
        </TabsContent>

        <TabsContent value="strengths" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.strengths.title')}</CardTitle>
              <CardDescription>
                {t('dashboard.strengths.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {strengthAreas.map((strength, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`font-medium ${strength.color}`}>{t(strength.nameKey)}</span>
                      <span className="text-sm font-semibold">{strength.score}%</span>
                    </div>
                    <Progress value={strength.score} className="h-3" />
                    <div className="text-xs text-gray-600">
                      {strength.score >= 85 ? t('dashboard.strengths.exceptional') :
                       strength.score >= 75 ? t('dashboard.strengths.strong') :
                       t('dashboard.strengths.improvement')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.personality_insights.title')}</CardTitle>
              <CardDescription>
                {t('dashboard.personality_insights.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">{t('dashboard.personality_insights.work_style')}</h4>
                  <p className="text-sm text-gray-600">
                    You work best in collaborative environments with structured processes and clear goals.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">{t('dashboard.personality_insights.leadership_potential')}</h4>
                  <p className="text-sm text-gray-600">
                    Strong analytical skills and communication abilities suggest good leadership potential.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">{t('dashboard.personality_insights.learning_style')}</h4>
                  <p className="text-sm text-gray-600">
                    You prefer hands-on learning with immediate practical applications.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">{t('dashboard.personality_insights.risk_tolerance')}</h4>
                  <p className="text-sm text-gray-600">
                    Moderate risk tolerance - comfortable with calculated risks and innovation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Industry Growth Trends</CardTitle>
              <CardDescription>
                Emerging fields with high growth potential and demand
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {industryTrends.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{trend.icon}</span>
                      <div>
                        <h4 className="font-medium">{trend.industry}</h4>
                        <p className="text-sm text-gray-600">Job Market Demand: {trend.demand}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{trend.growth}</p>
                      <p className="text-xs text-gray-600">Expected Growth</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Future-Proof Skills</CardTitle>
              <CardDescription>
                Skills that will remain valuable in the evolving job market
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'AI/Machine Learning',
                  'Data Analysis',
                  'Digital Marketing',
                  'Cloud Computing',
                  'Cybersecurity',
                  'UX/UI Design',
                  'Project Management',
                  'Critical Thinking',
                  'Emotional Intelligence'
                ].map((skill, index) => (
                  <Badge key={index} variant="outline" className="justify-center p-2">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.quick_plan.title')}</CardTitle>
              <CardDescription>
                {t('dashboard.quick_plan.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Skill Assessment & Gap Analysis</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Complete detailed skill evaluation and identify priority learning areas
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-600">Week 1-2</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold text-sm">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Start Targeted Learning</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Begin courses in Python programming and data analysis fundamentals
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-600">Week 3-8</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold text-sm">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Build Portfolio Projects</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Create 2-3 data analysis projects to showcase your skills
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-600">Week 9-12</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-semibold text-sm">
                    4
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Network & Apply</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Connect with professionals and start applying for entry-level positions
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-600">Month 3+</span>
                    </div>
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