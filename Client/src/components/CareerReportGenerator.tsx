import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  FileText, 
  Download, 
  Share2, 
  Target, 
  TrendingUp, 
  Users, 
  Brain, 
  Zap,
  Star,
  CheckCircle,
  AlertCircle,
  Calendar,
  MapPin,
  DollarSign,
  BookOpen,
  Award
} from 'lucide-react';

interface CareerReportProps {
  assessmentResults: any;
  userProfile: any;
}

export function CareerReportGenerator({ assessmentResults, userProfile }: CareerReportProps) {
  const [reportData, setReportData] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    generateComprehensiveReport();
  }, [assessmentResults, userProfile]);

  const generateComprehensiveReport = async () => {
    setIsGenerating(true);
    
    // Simulate AI report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const report = {
      executiveSummary: generateExecutiveSummary(),
      personalityAnalysis: generatePersonalityAnalysis(),
      careerRecommendations: generateDetailedRecommendations(),
      skillsAnalysis: generateSkillsAnalysis(),
      developmentPlan: generateDevelopmentPlan(),
      careerPathways: generateCareerPathways(),
      industryInsights: generateIndustryInsights(),
      actionPlan: generateActionPlan(),
      resources: generateResources()
    };
    
    setReportData(report);
    setIsGenerating(false);
  };

  const generateExecutiveSummary = () => {
    const { dimensionScores, personalityProfile } = assessmentResults;
    const topStrengths = personalityProfile?.strengths || [];
    const workStyle = personalityProfile?.workStyle || 'Balanced Professional';
    
    return {
      overallFitScore: Math.round(Object.values(dimensionScores).reduce((a: any, b: any) => a + b, 0) / 5),
      keyStrengths: topStrengths.slice(0, 3),
      workStyle,
      primaryCareerCluster: getCareerCluster(dimensionScores),
      confidenceLevel: 'High',
      summaryText: `Based on your comprehensive 5-D assessment, you demonstrate strong alignment with ${getCareerCluster(dimensionScores)} careers. Your ${workStyle.toLowerCase()} approach, combined with strengths in ${topStrengths.slice(0, 2).join(' and ')}, positions you well for leadership roles in your chosen field.`
    };
  };

  const generatePersonalityAnalysis = () => {
    const { dimensionScores } = assessmentResults;
    
    return {
      orientationStyle: {
        score: dimensionScores.orientation,
        description: dimensionScores.orientation > 70 ? 
          "You prefer structured, methodical approaches with clear guidelines and systematic processes." :
          "You thrive in flexible environments that allow for creativity and adaptability.",
        implications: ["Project management roles", "Strategic planning positions", "Quality assurance roles"]
      },
      interestProfile: {
        score: dimensionScores.interest,
        primaryInterests: ["Technology & Innovation", "Problem Solving", "Leadership"],
        motivators: ["Achievement", "Autonomy", "Impact"],
        workEnvironment: "Dynamic, collaborative environment with growth opportunities"
      },
      personalityTraits: {
        score: dimensionScores.personality,
        traits: {
          extraversion: dimensionScores.personality > 60 ? 'High' : 'Moderate',
          conscientiousness: dimensionScores.orientation > 70 ? 'High' : 'Moderate',
          openness: dimensionScores.interest > 65 ? 'High' : 'Moderate',
          agreeableness: dimensionScores.eq > 70 ? 'High' : 'Moderate',
          neuroticism: 'Low'
        }
      },
      aptitudeProfile: {
        score: dimensionScores.aptitude,
        strengths: ["Analytical thinking", "Pattern recognition", "Problem solving"],
        cognitiveStyle: "Detail-oriented with strong logical reasoning"
      },
      emotionalIntelligence: {
        score: dimensionScores.eq,
        components: {
          selfAwareness: dimensionScores.eq,
          selfRegulation: Math.min(dimensionScores.eq + 5, 100),
          motivation: dimensionScores.interest,
          empathy: Math.min(dimensionScores.eq + 3, 100),
          socialSkills: dimensionScores.personality
        }
      }
    };
  };

  const generateDetailedRecommendations = () => {
    return [
      {
        title: "Data Scientist",
        match: 94,
        salaryRange: "$95,000 - $165,000",
        growth: "35% (Much faster than average)",
        description: "Analyze complex data to help organizations make informed business decisions using statistical analysis and machine learning.",
        responsibilities: [
          "Develop predictive models and algorithms",
          "Clean and preprocess large datasets",
          "Create data visualizations and reports",
          "Collaborate with cross-functional teams"
        ],
        requiredSkills: ["Python", "R", "SQL", "Machine Learning", "Statistics"],
        education: "Bachelor's in Computer Science, Statistics, or related field",
        pathway: {
          immediate: "Gain proficiency in Python and SQL",
          shortTerm: "Complete machine learning specialization",
          longTerm: "Pursue advanced degree or specialized certifications"
        },
        companies: ["Google", "Microsoft", "Netflix", "Uber", "Airbnb"],
        advantages: ["High demand", "Excellent salary", "Remote work options"],
        challenges: ["Requires continuous learning", "Complex technical requirements"]
      },
      {
        title: "Product Manager",
        match: 89,
        salaryRange: "$110,000 - $180,000",
        growth: "19% (Much faster than average)",
        description: "Lead product development from conception to launch, working with engineering, design, and business teams.",
        responsibilities: [
          "Define product strategy and roadmap",
          "Gather and prioritize requirements",
          "Work with design and engineering teams",
          "Analyze market trends and user feedback"
        ],
        requiredSkills: ["Strategic thinking", "Communication", "Data analysis", "Project management"],
        education: "Bachelor's in Business, Engineering, or related field",
        pathway: {
          immediate: "Develop project management skills",
          shortTerm: "Gain experience with product management tools",
          longTerm: "Build portfolio of successful product launches"
        },
        companies: ["Apple", "Google", "Amazon", "Meta", "Salesforce"],
        advantages: ["High impact role", "Cross-functional experience", "Leadership opportunities"],
        challenges: ["High responsibility", "Balancing stakeholder needs"]
      },
      {
        title: "UX Research Manager",
        match: 86,
        salaryRange: "$85,000 - $145,000",
        growth: "13% (Faster than average)",
        description: "Lead user research initiatives to inform product design and improve user experiences.",
        responsibilities: [
          "Plan and conduct user research studies",
          "Analyze user behavior and feedback",
          "Present insights to design and product teams",
          "Manage research operations and team"
        ],
        requiredSkills: ["Research methodologies", "Data analysis", "Communication", "Psychology"],
        education: "Bachelor's in Psychology, HCI, or related field",
        pathway: {
          immediate: "Learn research methodologies",
          shortTerm: "Build portfolio of research projects",
          longTerm: "Develop team leadership skills"
        },
        companies: ["Adobe", "Spotify", "Dropbox", "Slack", "Figma"],
        advantages: ["User-focused work", "Research variety", "Growing field"],
        challenges: ["Communicating research value", "Balancing speed vs. depth"]
      }
    ];
  };

  const generateSkillsAnalysis = () => {
    return {
      currentSkills: [
        { skill: "Communication", level: 85, category: "Soft Skills" },
        { skill: "Problem Solving", level: 90, category: "Cognitive" },
        { skill: "Leadership", level: 75, category: "Soft Skills" },
        { skill: "Data Analysis", level: 70, category: "Technical" },
        { skill: "Project Management", level: 65, category: "Professional" }
      ],
      skillGaps: [
        { skill: "Python Programming", current: 30, required: 85, priority: "High", timeToAcquire: "6-8 months" },
        { skill: "Machine Learning", current: 20, required: 80, priority: "High", timeToAcquire: "8-12 months" },
        { skill: "SQL", current: 45, required: 75, priority: "Medium", timeToAcquire: "3-4 months" },
        { skill: "Statistical Analysis", current: 55, required: 80, priority: "Medium", timeToAcquire: "4-6 months" }
      ],
      emergingSkills: [
        "Artificial Intelligence",
        "Cloud Computing",
        "Cybersecurity",
        "Digital Marketing",
        "Blockchain"
      ],
      industrySpecificSkills: {
        "Technology": ["DevOps", "Cloud Architecture", "API Development"],
        "Finance": ["Financial Modeling", "Risk Management", "Regulatory Compliance"],
        "Healthcare": ["Healthcare Analytics", "HIPAA Compliance", "Clinical Research"]
      }
    };
  };

  const generateDevelopmentPlan = () => {
    return {
      immediate: [
        {
          action: "Complete Python fundamentals course",
          timeline: "4 weeks",
          platform: "Coursera - Python for Everybody",
          cost: "Free",
          priority: "High"
        },
        {
          action: "Practice SQL with real datasets",
          timeline: "3 weeks",
          platform: "SQLBolt + Kaggle datasets",
          cost: "Free",
          priority: "High"
        }
      ],
      shortTerm: [
        {
          action: "Machine Learning Specialization",
          timeline: "3-4 months",
          platform: "Coursera - Andrew Ng's ML Course",
          cost: "$49/month",
          priority: "High"
        },
        {
          action: "Data Science Portfolio Development",
          timeline: "2-3 months",
          platform: "GitHub + Kaggle competitions",
          cost: "Free",
          priority: "Medium"
        }
      ],
      longTerm: [
        {
          action: "Advanced ML and AI Certification",
          timeline: "6-8 months",
          platform: "edX - MIT Introduction to Machine Learning",
          cost: "$300",
          priority: "Medium"
        },
        {
          action: "Industry Networking and Mentorship",
          timeline: "Ongoing",
          platform: "LinkedIn, Tech meetups, Conferences",
          cost: "Variable",
          priority: "High"
        }
      ]
    };
  };

  const generateCareerPathways = () => {
    return [
      {
        pathway: "Technical Track",
        stages: [
          { level: "Junior Data Analyst", timeline: "0-2 years", skills: ["Excel", "SQL", "Basic Python"] },
          { level: "Data Scientist", timeline: "2-5 years", skills: ["Machine Learning", "Statistics", "R/Python"] },
          { level: "Senior Data Scientist", timeline: "5-8 years", skills: ["Advanced ML", "Leadership", "Business Strategy"] },
          { level: "Principal Data Scientist / VP of Data", timeline: "8+ years", skills: ["Org Leadership", "Tech Vision", "Strategic Planning"] }
        ]
      },
      {
        pathway: "Management Track",
        stages: [
          { level: "Data Analyst", timeline: "0-2 years", skills: ["Analytics", "Communication", "Business Understanding"] },
          { level: "Senior Analyst / Team Lead", timeline: "2-4 years", skills: ["Team Management", "Project Management", "Stakeholder Management"] },
          { level: "Analytics Manager", timeline: "4-7 years", skills: ["Strategic Thinking", "Budget Management", "Cross-functional Leadership"] },
          { level: "Director of Analytics / Chief Data Officer", timeline: "7+ years", skills: ["Executive Leadership", "Business Strategy", "Data Governance"] }
        ]
      }
    ];
  };

  const generateIndustryInsights = () => {
    return {
      marketTrends: [
        "AI and ML adoption increasing by 35% annually",
        "Remote work becoming standard in tech industry",
        "Data privacy regulations driving compliance roles",
        "Green technology creating new career opportunities"
      ],
      salaryTrends: {
        dataScience: { growth: "+15% YoY", medianSalary: "$125,000", topPercentile: "$200,000+" },
        productManagement: { growth: "+12% YoY", medianSalary: "$145,000", topPercentile: "$250,000+" },
        uxResearch: { growth: "+18% YoY", medianSalary: "$110,000", topPercentile: "$180,000+" }
      },
      geographicOpportunities: [
        { location: "San Francisco Bay Area", avgSalary: "$165,000", opportunities: "High", livingCost: "Very High" },
        { location: "Seattle", avgSalary: "$145,000", opportunities: "High", livingCost: "High" },
        { location: "Austin", avgSalary: "$125,000", opportunities: "Medium-High", livingCost: "Medium" },
        { location: "Remote", avgSalary: "$135,000", opportunities: "High", livingCost: "Variable" }
      ]
    };
  };

  const generateActionPlan = () => {
    return {
      next30Days: [
        "Complete Python basics course",
        "Set up GitHub profile and first repository",
        "Join 3 relevant LinkedIn groups",
        "Start daily coding practice (1 hour/day)"
      ],
      next90Days: [
        "Complete first machine learning project",
        "Apply to 5 data science positions",
        "Attend 2 industry networking events",
        "Complete SQL certification"
      ],
      next12Months: [
        "Land first data science role",
        "Build portfolio of 3-5 projects",
        "Complete advanced ML specialization",
        "Establish mentor relationship"
      ]
    };
  };

  const generateResources = () => {
    return {
      learningPlatforms: [
        { name: "Coursera", type: "Online Courses", cost: "$39-79/month", focus: "University-level content" },
        { name: "Udacity", type: "Nanodegrees", cost: "$399/month", focus: "Career-focused programs" },
        { name: "edX", type: "Online Courses", cost: "Free-$300", focus: "University partnerships" },
        { name: "Kaggle Learn", type: "Micro-courses", cost: "Free", focus: "Practical data science" }
      ],
      books: [
        "Hands-On Machine Learning by Aurélien Géron",
        "The Data Science Handbook by Field Cady",
        "Python for Data Analysis by Wes McKinney",
        "Designing Data-Intensive Applications by Martin Kleppmann"
      ],
      communities: [
        "r/MachineLearning", "Data Science Central", "Kaggle Community", "LinkedIn Data Science Groups"
      ],
      tools: [
        { name: "Python", category: "Programming", cost: "Free" },
        { name: "R Studio", category: "Analytics", cost: "Free" },
        { name: "Tableau", category: "Visualization", cost: "$70/month" },
        { name: "Jupyter Notebooks", category: "Development", cost: "Free" }
      ]
    };
  };

  if (isGenerating) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="pt-12 pb-12">
          <div className="text-center space-y-4">
            <Brain className="h-12 w-12 mx-auto text-indigo-600 dark:text-indigo-400 animate-pulse" />
            <h3 className="text-xl font-semibold">Generating Your Comprehensive Career Report</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Our AI is analyzing your assessment results to create a personalized career development plan...
            </p>
            <div className="max-w-md mx-auto">
              <Progress value={75} className="w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                Your Comprehensive Career Report
              </CardTitle>
              <CardDescription>
                Personalized insights and development plan based on your 5-D assessment
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Executive Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                {reportData.executiveSummary.overallFitScore}%
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Overall Career Fit</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold mb-2">
                {reportData.executiveSummary.workStyle}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Work Style</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold mb-2">
                {reportData.executiveSummary.primaryCareerCluster}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Primary Career Cluster</p>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {reportData.executiveSummary.summaryText}
          </p>
        </CardContent>
      </Card>

      {/* Main Report Tabs */}
      <Tabs defaultValue="recommendations" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="recommendations">Careers</TabsTrigger>
          <TabsTrigger value="personality">Personality</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="development">Development</TabsTrigger>
          <TabsTrigger value="pathways">Pathways</TabsTrigger>
          <TabsTrigger value="insights">Market</TabsTrigger>
          <TabsTrigger value="action">Action Plan</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Top Career Recommendations</h3>
          {reportData.careerRecommendations.map((career: any, index: number) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {career.title}
                      <Badge variant="secondary">{career.match}% match</Badge>
                    </CardTitle>
                    <CardDescription>{career.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600 dark:text-green-400">{career.salaryRange}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{career.growth}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Key Responsibilities</h4>
                    <ul className="text-sm space-y-1">
                      {career.responsibilities.map((resp: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {career.requiredSkills.map((skill: string, i: number) => (
                        <Badge key={i} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                    <h4 className="font-medium mb-2 mt-4">Top Companies</h4>
                    <div className="flex flex-wrap gap-2">
                      {career.companies.map((company: string, i: number) => (
                        <Badge key={i} variant="secondary">{company}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="personality" className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Personality Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(reportData.personalityAnalysis).map(([key, analysis]: [string, any]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span>Score</span>
                      <span className="font-semibold">{analysis.score}%</span>
                    </div>
                    <Progress value={analysis.score} />
                  </div>
                  {analysis.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {analysis.description}
                    </p>
                  )}
                  {analysis.traits && (
                    <div className="space-y-2">
                      {Object.entries(analysis.traits).map(([trait, level]: [string, any]) => (
                        <div key={trait} className="flex justify-between text-sm">
                          <span className="capitalize">{trait}</span>
                          <Badge variant={level === 'High' ? 'default' : 'secondary'}>{level}</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Skills Analysis</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportData.skillsAnalysis.currentSkills.map((skill: any, index: number) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.skill}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skill Gaps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportData.skillsAnalysis.skillGaps.map((gap: any, index: number) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{gap.skill}</span>
                        <Badge variant={gap.priority === 'High' ? 'destructive' : 'secondary'}>
                          {gap.priority}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <span>Current: {gap.current}%</span>
                        <span>Required: {gap.required}%</span>
                      </div>
                      <Progress value={(gap.current / gap.required) * 100} />
                      <p className="text-xs text-gray-500 mt-2">Time to acquire: {gap.timeToAcquire}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="development" className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Development Plan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(reportData.developmentPlan).map(([timeframe, actions]: [string, any]) => (
              <Card key={timeframe}>
                <CardHeader>
                  <CardTitle className="capitalize">{timeframe.replace(/([A-Z])/g, ' $1').trim()}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {actions.map((action: any, index: number) => (
                      <div key={index} className="border rounded-lg p-3">
                        <h4 className="font-medium mb-2">{action.action}</h4>
                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {action.timeline}
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            {action.platform}
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            {action.cost}
                          </div>
                        </div>
                        <Badge variant={action.priority === 'High' ? 'default' : 'secondary'} className="mt-2">
                          {action.priority} Priority
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pathways" className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Career Pathways</h3>
          {reportData.careerPathways.map((pathway: any, index: number) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{pathway.pathway}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pathway.stages.map((stage: any, stageIndex: number) => (
                    <div key={stageIndex} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                        {stageIndex + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{stage.level}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{stage.timeline}</p>
                        <div className="flex flex-wrap gap-2">
                          {stage.skills.map((skill: string, skillIndex: number) => (
                            <Badge key={skillIndex} variant="outline">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Market Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {reportData.industryInsights.marketTrends.map((trend: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-sm">{trend}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reportData.industryInsights.geographicOpportunities.map((location: any, index: number) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{location.location}</h4>
                        <Badge variant="outline">{location.opportunities}</Badge>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <p>Avg Salary: {location.avgSalary}</p>
                        <p>Living Cost: {location.livingCost}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="action" className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Action Plan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(reportData.actionPlan).map(([timeframe, actions]: [string, any]) => (
              <Card key={timeframe}>
                <CardHeader>
                  <CardTitle className="capitalize">{timeframe.replace(/([A-Z])/g, ' $1').trim()}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {actions.map((action: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-sm">{action}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Learning Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Platforms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reportData.resources.learningPlatforms.map((platform: any, index: number) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{platform.name}</h4>
                        <Badge variant="outline">{platform.cost}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{platform.type}</p>
                      <p className="text-xs text-gray-500">{platform.focus}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Books</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {reportData.resources.books.map((book: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <BookOpen className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                      <span className="text-sm">{book}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function getCareerCluster(dimensionScores: Record<string, number>) {
  if (dimensionScores.aptitude > 75 && dimensionScores.orientation > 65) {
    return "Technology & Data Science";
  } else if (dimensionScores.eq > 75 && dimensionScores.personality > 65) {
    return "Leadership & Management";
  } else if (dimensionScores.interest > 70) {
    return "Creative & Innovation";
  } else {
    return "Professional Services";
  }
}