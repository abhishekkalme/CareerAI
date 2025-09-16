import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  TrendingUp, 
  Target, 
  BookOpen, 
  Clock,
  AlertTriangle,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface SkillGapAnalysisProps {
  skillGaps: any[];
}

export function SkillGapAnalysis({ skillGaps }: SkillGapAnalysisProps) {
  const skillsByCategory = skillGaps.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, any[]>);

  const gapSizes = skillGaps.map(skill => ({
    name: skill.skill,
    gap: skill.required - skill.current,
    current: skill.current,
    required: skill.required,
    category: skill.category
  })).sort((a, b) => b.gap - a.gap);

  const prioritySkills = gapSizes.filter(skill => skill.gap >= 20);
  const moderateSkills = gapSizes.filter(skill => skill.gap >= 10 && skill.gap < 20);
  const minorSkills = gapSizes.filter(skill => skill.gap < 10);

  const radarData = Object.keys(skillsByCategory).map(category => {
    const categorySkills = skillsByCategory[category];
    const avgCurrent = categorySkills.reduce((sum, skill) => sum + skill.current, 0) / categorySkills.length;
    const avgRequired = categorySkills.reduce((sum, skill) => sum + skill.required, 0) / categorySkills.length;
    
    return {
      category,
      current: Math.round(avgCurrent),
      required: Math.round(avgRequired)
    };
  });

  const getSkillPriorityColor = (gap: number) => {
    if (gap >= 20) return 'text-red-600 bg-red-50 border-red-200';
    if (gap >= 10) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const getSkillPriorityLabel = (gap: number) => {
    if (gap >= 20) return 'High Priority';
    if (gap >= 10) return 'Medium Priority';
    return 'Low Priority';
  };

  const getSkillIcon = (gap: number) => {
    if (gap >= 20) return <AlertTriangle className="h-4 w-4" />;
    if (gap >= 10) return <Target className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  const estimatedLearningTime = (gap: number) => {
    // Rough estimation: 1 week per 10 skill points
    const weeks = Math.ceil(gap / 10);
    if (weeks <= 4) return `${weeks} weeks`;
    const months = Math.ceil(weeks / 4);
    return `${months} months`;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{prioritySkills.length}</p>
                <p className="text-sm text-gray-600">High Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{moderateSkills.length}</p>
                <p className="text-sm text-gray-600">Medium Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{minorSkills.length}</p>
                <p className="text-sm text-gray-600">Low Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">6-12</p>
                <p className="text-sm text-gray-600">Months Est.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="gaps" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="gaps">Skill Gaps</TabsTrigger>
          <TabsTrigger value="charts">Visual Analysis</TabsTrigger>
          <TabsTrigger value="categories">By Category</TabsTrigger>
          <TabsTrigger value="roadmap">Learning Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="gaps" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skill Gap Analysis</CardTitle>
              <CardDescription>
                Comparison between your current skill level and required level for target career
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {gapSizes.map((skill, index) => (
                  <div key={index} className={`p-4 border rounded-lg ${getSkillPriorityColor(skill.gap)}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getSkillIcon(skill.gap)}
                        <div>
                          <h4 className="font-medium text-lg">{skill.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {skill.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={skill.gap >= 20 ? "destructive" : skill.gap >= 10 ? "default" : "secondary"}>
                          {getSkillPriorityLabel(skill.gap)}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">
                          Gap: {skill.gap} points
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current Level: {skill.current}%</span>
                        <span>Target Level: {skill.required}%</span>
                      </div>
                      <div className="relative">
                        <Progress value={skill.required} className="h-3 bg-gray-200" />
                        <Progress 
                          value={skill.current} 
                          className="h-3 absolute top-0 left-0" 
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">
                          Estimated learning time: {estimatedLearningTime(skill.gap)}
                        </span>
                        <Button size="sm" variant="outline">
                          Find Courses
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Skill Gap Comparison</CardTitle>
                <CardDescription>Current vs Required skill levels</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={gapSizes.slice(0, 6)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      fontSize={12}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="current" fill="#8884d8" name="Current Level" />
                    <Bar dataKey="required" fill="#82ca9d" name="Required Level" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills by Category</CardTitle>
                <CardDescription>Radar chart showing skill distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" fontSize={12} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} fontSize={10} />
                    <Radar
                      name="Current"
                      dataKey="current"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="Required"
                      dataKey="required"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.3}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          {Object.entries(skillsByCategory).map(([category, skills]) => {
            const avgGap = skills.reduce((sum, skill) => sum + (skill.required - skill.current), 0) / skills.length;
            
            return (
              <Card key={category}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="capitalize">{category} Skills</CardTitle>
                    <Badge variant={avgGap >= 20 ? "destructive" : avgGap >= 10 ? "default" : "secondary"}>
                      Avg Gap: {Math.round(avgGap)} points
                    </Badge>
                  </div>
                  <CardDescription>
                    Skills in the {category} category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skills.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{skill.skill}</h4>
                          <div className="flex justify-between text-sm text-gray-600 mt-1">
                            <span>Current: {skill.current}%</span>
                            <span>Required: {skill.required}%</span>
                          </div>
                          <Progress 
                            value={(skill.current / skill.required) * 100} 
                            className="mt-2 h-2" 
                          />
                        </div>
                        <div className="ml-4 text-right">
                          <Badge variant="outline">
                            {skill.required - skill.current} gap
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Learning Sequence</CardTitle>
              <CardDescription>
                Prioritized learning plan to address your skill gaps effectively
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-red-600">Phase 1: Critical Skills (Weeks 1-8)</h3>
                  <div className="space-y-3">
                    {prioritySkills.slice(0, 3).map((skill, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border-l-4 border-red-500 bg-red-50 rounded-r-lg">
                        <div>
                          <h4 className="font-medium">{skill.name}</h4>
                          <p className="text-sm text-gray-600">Gap: {skill.gap} points</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{estimatedLearningTime(skill.gap)}</p>
                          <Button size="sm" variant="outline" className="mt-1">
                            <BookOpen className="h-3 w-3 mr-1" />
                            Start Learning
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-yellow-600">Phase 2: Important Skills (Weeks 9-16)</h3>
                  <div className="space-y-3">
                    {moderateSkills.slice(0, 3).map((skill, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg">
                        <div>
                          <h4 className="font-medium">{skill.name}</h4>
                          <p className="text-sm text-gray-600">Gap: {skill.gap} points</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{estimatedLearningTime(skill.gap)}</p>
                          <Button size="sm" variant="outline" className="mt-1">
                            <BookOpen className="h-3 w-3 mr-1" />
                            Plan Learning
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-green-600">Phase 3: Enhancement Skills (Weeks 17+)</h3>
                  <div className="space-y-3">
                    {minorSkills.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                        <div>
                          <h4 className="font-medium">{skill.name}</h4>
                          <p className="text-sm text-gray-600">Gap: {skill.gap} points</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{estimatedLearningTime(skill.gap)}</p>
                          <Button size="sm" variant="outline" className="mt-1">
                            <BookOpen className="h-3 w-3 mr-1" />
                            Future Learning
                          </Button>
                        </div>
                      </div>
                    ))}
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