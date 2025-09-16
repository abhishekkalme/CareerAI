import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  TrendingUp, 
  MapPin, 
  Clock, 
  DollarSign, 
  Award, 
  Users,
  Target,
  ArrowRight,
  CheckCircle,
  Circle,
  Briefcase,
  GraduationCap,
  Building,
  Star
} from 'lucide-react';

interface ProgressionLadderProps {
  careerPath: any;
}

export function ProgressionLadder({ careerPath }: ProgressionLadderProps) {
  const [selectedStage, setSelectedStage] = useState(0);

  // Enhanced career progression data
  const careerProgression = {
    title: "Data Scientist Career Path",
    overview: "Transform from beginner to expert data scientist with this comprehensive career roadmap",
    totalTimeline: "5-7 years to senior level",
    stages: [
      {
        level: "Junior Data Analyst",
        duration: "0-18 months",
        salaryRange: "$50,000 - $70,000",
        requirements: {
          education: "Bachelor's degree in quantitative field",
          experience: "0-1 years",
          skills: ["Excel", "SQL", "Basic Statistics", "Data Visualization", "Business Intelligence Tools"]
        },
        responsibilities: [
          "Data cleaning and preprocessing",
          "Create basic reports and dashboards", 
          "Perform descriptive statistical analysis",
          "Support senior analysts with data requests",
          "Learn business domain and data sources"
        ],
        companies: ["Startups", "Mid-size companies", "Consulting firms"],
        nextSteps: [
          "Master Python/R programming",
          "Learn advanced SQL techniques",
          "Build 2-3 portfolio projects",
          "Get familiar with cloud platforms"
        ],
        currentSkillLevel: 60,
        keyMilestones: [
          "Complete first independent analysis project",
          "Present findings to stakeholders",
          "Master core BI tools (Tableau/Power BI)",
          "Understand business metrics and KPIs"
        ]
      },
      {
        level: "Data Analyst",
        duration: "1.5-3 years",
        salaryRange: "$70,000 - $95,000",
        requirements: {
          education: "Bachelor's degree + relevant certifications",
          experience: "1-3 years",
          skills: ["Python/R", "Advanced SQL", "Statistics", "Machine Learning Basics", "Data Visualization", "A/B Testing"]
        },
        responsibilities: [
          "Design and conduct complex analyses",
          "Build predictive models for business use cases",
          "Automate reporting processes",
          "Collaborate with cross-functional teams",
          "Mentor junior analysts"
        ],
        companies: ["Tech companies", "Financial services", "E-commerce", "Healthcare"],
        nextSteps: [
          "Deepen machine learning expertise",
          "Learn advanced statistical methods",
          "Gain domain expertise in specific industry",
          "Develop project management skills"
        ],
        currentSkillLevel: 75,
        keyMilestones: [
          "Deploy first ML model to production",
          "Lead a cross-functional analytics project",
          "Become go-to person for specific domain",
          "Start mentoring junior team members"
        ]
      },
      {
        level: "Data Scientist",
        duration: "3-5 years",
        salaryRange: "$95,000 - $140,000",
        requirements: {
          education: "Master's preferred or equivalent experience",
          experience: "3-5 years",
          skills: ["Advanced ML", "Deep Learning", "MLOps", "Cloud Platforms", "Statistical Modeling", "Feature Engineering"]
        },
        responsibilities: [
          "Develop complex machine learning solutions",
          "Design experiments and A/B tests",
          "Work on product features and recommendations",
          "Collaborate with engineering teams",
          "Present insights to executive leadership"
        ],
        companies: ["FAANG companies", "Unicorn startups", "Fortune 500", "Research institutions"],
        nextSteps: [
          "Specialize in specific ML domains (NLP, Computer Vision, etc.)",
          "Develop leadership and communication skills",
          "Learn business strategy and product management",
          "Build industry thought leadership"
        ],
        currentSkillLevel: 85,
        keyMilestones: [
          "Own end-to-end ML pipeline",
          "Influence product strategy with data insights",
          "Publish research or blog posts",
          "Speak at industry conferences"
        ]
      },
      {
        level: "Senior Data Scientist",
        duration: "5-7 years",
        salaryRange: "$140,000 - $180,000",
        requirements: {
          education: "Advanced degree or equivalent experience",
          experience: "5-7 years",
          skills: ["Advanced ML/AI", "Team Leadership", "Strategic Thinking", "Research", "System Design", "Business Acumen"]
        },
        responsibilities: [
          "Lead complex, multi-month projects",
          "Mentor and develop junior data scientists",
          "Drive data strategy for business units",
          "Research and implement cutting-edge techniques",
          "Interface with C-level executives"
        ],
        companies: ["Top-tier tech companies", "Consulting firms", "Research labs", "AI-first companies"],
        nextSteps: [
          "Consider management track vs individual contributor",
          "Develop expertise in emerging AI technologies",
          "Build external industry presence",
          "Consider founding a startup or consulting"
        ],
        currentSkillLevel: 95,
        keyMilestones: [
          "Lead a team of 3-5 data scientists",
          "Drive company-wide data initiatives",
          "Become recognized industry expert",
          "Generate significant business impact ($1M+ annually)"
        ]
      },
      {
        level: "Principal Data Scientist / Director",
        duration: "7+ years",
        salaryRange: "$180,000 - $300,000+",
        requirements: {
          education: "PhD preferred or exceptional experience",
          experience: "7+ years",
          skills: ["Technical Leadership", "Strategic Vision", "Team Building", "Innovation", "Research", "Executive Communication"]
        },
        responsibilities: [
          "Set technical vision and strategy",
          "Build and lead data science organizations",
          "Drive innovation and research initiatives",
          "Represent company at industry events",
          "Make high-level technical and business decisions"
        ],
        companies: ["Tech giants", "Unicorns", "Research institutions", "Consulting firms"],
        nextSteps: [
          "Chief Data Officer role",
          "VP of Data/AI positions",
          "Founded AI/ML startups",
          "Research professor positions"
        ],
        currentSkillLevel: 100,
        keyMilestones: [
          "Build data science org from ground up",
          "Drive company's AI/ML transformation",
          "Recognized thought leader in industry",
          "Board advisor or investor roles"
        ]
      }
    ]
  };

  const skillProgression = {
    technical: [
      { skill: "Programming (Python/R)", beginner: 60, intermediate: 80, advanced: 95, expert: 100 },
      { skill: "Statistics & Math", beginner: 50, intermediate: 70, advanced: 85, expert: 95 },
      { skill: "Machine Learning", beginner: 30, intermediate: 60, advanced: 85, expert: 95 },
      { skill: "Deep Learning", beginner: 10, intermediate: 40, advanced: 70, expert: 90 },
      { skill: "MLOps & Deployment", beginner: 5, intermediate: 30, advanced: 60, expert: 85 },
      { skill: "Cloud Platforms", beginner: 20, intermediate: 50, advanced: 75, expert: 90 }
    ],
    soft: [
      { skill: "Communication", beginner: 70, intermediate: 80, advanced: 90, expert: 95 },
      { skill: "Project Management", beginner: 40, intermediate: 65, advanced: 80, expert: 90 },
      { skill: "Leadership", beginner: 20, intermediate: 45, advanced: 70, expert: 90 },
      { skill: "Business Acumen", beginner: 30, intermediate: 55, advanced: 75, expert: 90 },
      { skill: "Strategic Thinking", beginner: 15, intermediate: 40, advanced: 65, expert: 85 }
    ]
  };

  const alternativePaths = [
    {
      title: "Data Engineering Track",
      description: "Focus on building data infrastructure and pipelines",
      timeline: "4-6 years to senior level",
      keySkills: ["Distributed Systems", "ETL/ELT", "Cloud Architecture", "Data Warehousing"],
      salaryPotential: "$120,000 - $250,000+"
    },
    {
      title: "Product Analytics Track", 
      description: "Specialize in product metrics and user behavior analysis",
      timeline: "3-5 years to senior level",
      keySkills: ["Product Metrics", "A/B Testing", "User Analytics", "Growth Hacking"],
      salaryPotential: "$100,000 - $200,000+"
    },
    {
      title: "ML Engineering Track",
      description: "Bridge between data science and software engineering",
      timeline: "4-6 years to senior level", 
      keySkills: ["MLOps", "Model Deployment", "Distributed Computing", "Software Engineering"],
      salaryPotential: "$130,000 - $270,000+"
    },
    {
      title: "Research Scientist Track",
      description: "Focus on advancing state-of-the-art in AI/ML research",
      timeline: "5-8 years to senior level",
      keySkills: ["Research Methods", "Publications", "Advanced Mathematics", "Innovation"],
      salaryPotential: "$150,000 - $400,000+"
    }
  ];

  const currentStage = careerProgression.stages[selectedStage];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <span>{careerProgression.title}</span>
          </CardTitle>
          <CardDescription>
            {careerProgression.overview}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="text-sm">{careerProgression.totalTimeline}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-gray-400" />
              <span className="text-sm">{careerProgression.stages.length} career stages</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-gray-400" />
              <span className="text-sm">$50K → $300K+ potential</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="roadmap" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="roadmap">Career Roadmap</TabsTrigger>
          <TabsTrigger value="skills">Skill Development</TabsTrigger>
          <TabsTrigger value="alternatives">Alternative Paths</TabsTrigger>
          <TabsTrigger value="timeline">Action Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="roadmap" className="space-y-6">
          {/* Visual Progression */}
          <Card>
            <CardHeader>
              <CardTitle>Career Progression Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gray-200"></div>
                
                <div className="space-y-8">
                  {careerProgression.stages.map((stage, index) => (
                    <div key={index} className="relative flex items-start space-x-4">
                      {/* Stage Circle */}
                      <div 
                        className={`w-16 h-16 rounded-full border-4 flex items-center justify-center cursor-pointer transition-all ${
                          selectedStage === index 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-300 bg-white hover:border-blue-300'
                        }`}
                        onClick={() => setSelectedStage(index)}
                      >
                        <span className="text-sm font-semibold">{index + 1}</span>
                      </div>
                      
                      {/* Stage Info */}
                      <div className="flex-1 min-w-0">
                        <div 
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            selectedStage === index 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedStage(index)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{stage.level}</h3>
                            <Badge variant="outline">{stage.duration}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{stage.salaryRange}</p>
                          <div className="flex flex-wrap gap-1">
                            {stage.requirements.skills.slice(0, 3).map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {stage.requirements.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{stage.requirements.skills.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Stage View */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{currentStage.level}</span>
                <div className="flex items-center space-x-2">
                  <Progress value={currentStage.currentSkillLevel} className="w-20" />
                  <span className="text-sm text-gray-600">{currentStage.currentSkillLevel}% skill level</span>
                </div>
              </CardTitle>
              <CardDescription>
                Detailed breakdown of requirements, responsibilities, and growth opportunities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Requirements */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Requirements
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Education:</span> {currentStage.requirements.education}</p>
                    <p><span className="font-medium">Experience:</span> {currentStage.requirements.experience}</p>
                    <p><span className="font-medium">Salary:</span> {currentStage.salaryRange}</p>
                  </div>
                </div>

                {/* Companies */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Building className="h-4 w-4 mr-2" />
                    Typical Companies
                  </h4>
                  <div className="space-y-1">
                    {currentStage.companies.map((company, index) => (
                      <Badge key={index} variant="outline" className="text-xs mr-1 mb-1">
                        {company}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Star className="h-4 w-4 mr-2" />
                    Key Skills
                  </h4>
                  <div className="space-y-1">
                    {currentStage.requirements.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs mr-1 mb-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Responsibilities */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-2">
                    {currentStage.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <Circle className="h-2 w-2 mt-2 text-gray-400 flex-shrink-0" />
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Next Steps */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Path to Next Level
                  </h4>
                  <ul className="space-y-2">
                    {currentStage.nextSteps.map((step, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Key Milestones */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  Key Milestones to Achieve
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentStage.keyMilestones.map((milestone, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 border rounded-lg">
                      <Circle className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{milestone}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Technical Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Technical Skills Progression</CardTitle>
                <CardDescription>
                  How technical skills develop across career stages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillProgression.technical.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{skill.skill}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div className="text-center">
                          <div className="h-2 bg-gray-200 rounded mb-1">
                            <div 
                              className="h-full bg-blue-500 rounded" 
                              style={{ width: `${skill.beginner}%` }}
                            ></div>
                          </div>
                          <span>Beginner</span>
                        </div>
                        <div className="text-center">
                          <div className="h-2 bg-gray-200 rounded mb-1">
                            <div 
                              className="h-full bg-green-500 rounded" 
                              style={{ width: `${skill.intermediate}%` }}
                            ></div>
                          </div>
                          <span>Intermediate</span>
                        </div>
                        <div className="text-center">
                          <div className="h-2 bg-gray-200 rounded mb-1">
                            <div 
                              className="h-full bg-orange-500 rounded" 
                              style={{ width: `${skill.advanced}%` }}
                            ></div>
                          </div>
                          <span>Advanced</span>
                        </div>
                        <div className="text-center">
                          <div className="h-2 bg-gray-200 rounded mb-1">
                            <div 
                              className="h-full bg-purple-500 rounded" 
                              style={{ width: `${skill.expert}%` }}
                            ></div>
                          </div>
                          <span>Expert</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Soft Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Leadership & Soft Skills</CardTitle>
                <CardDescription>
                  Professional skills that become increasingly important
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillProgression.soft.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{skill.skill}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div className="text-center">
                          <div className="h-2 bg-gray-200 rounded mb-1">
                            <div 
                              className="h-full bg-blue-500 rounded" 
                              style={{ width: `${skill.beginner}%` }}
                            ></div>
                          </div>
                          <span>Junior</span>
                        </div>
                        <div className="text-center">
                          <div className="h-2 bg-gray-200 rounded mb-1">
                            <div 
                              className="h-full bg-green-500 rounded" 
                              style={{ width: `${skill.intermediate}%` }}
                            ></div>
                          </div>
                          <span>Mid-level</span>
                        </div>
                        <div className="text-center">
                          <div className="h-2 bg-gray-200 rounded mb-1">
                            <div 
                              className="h-full bg-orange-500 rounded" 
                              style={{ width: `${skill.advanced}%` }}
                            ></div>
                          </div>
                          <span>Senior</span>
                        </div>
                        <div className="text-center">
                          <div className="h-2 bg-gray-200 rounded mb-1">
                            <div 
                              className="h-full bg-purple-500 rounded" 
                              style={{ width: `${skill.expert}%` }}
                            ></div>
                          </div>
                          <span>Principal</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alternatives" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alternative Career Paths</CardTitle>
              <CardDescription>
                Related career tracks you can transition to based on your skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {alternativePaths.map((path, index) => (
                  <Card key={index} className="border">
                    <CardHeader>
                      <CardTitle className="text-lg">{path.title}</CardTitle>
                      <CardDescription>{path.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {path.timeline}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {path.salaryPotential}
                        </span>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Key Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {path.keySkills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button variant="outline" className="w-full mt-4">
                        Explore This Path
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Personalized Action Plan</CardTitle>
              <CardDescription>
                Based on your current skills and target career stage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Current Status */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">Current Status Assessment</h3>
                  <p className="text-blue-800 text-sm">
                    Based on your profile, you're positioned between <strong>Entry Level</strong> and <strong>Junior Data Analyst</strong> roles.
                    With focused effort, you can reach Data Scientist level within 18-24 months.
                  </p>
                </div>

                {/* 6-Month Plan */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Next 6 Months: Foundation Building</h3>
                  <div className="space-y-3">
                    {[
                      { task: "Complete Python for Data Science course", weeks: "2-4", priority: "high" },
                      { task: "Master SQL fundamentals and advanced queries", weeks: "3-5", priority: "high" },
                      { task: "Learn statistics and probability basics", weeks: "4-6", priority: "high" },
                      { task: "Build first portfolio project (data cleaning & analysis)", weeks: "6-8", priority: "medium" },
                      { task: "Get comfortable with Pandas and NumPy", weeks: "8-10", priority: "high" },
                      { task: "Learn data visualization (Matplotlib, Seaborn)", weeks: "10-12", priority: "medium" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{item.task}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={item.priority === 'high' ? 'default' : 'secondary'} className="text-xs">
                            {item.priority}
                          </Badge>
                          <span className="text-xs text-gray-600">Week {item.weeks}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 12-Month Plan */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">6-12 Months: Skill Advancement</h3>
                  <div className="space-y-3">
                    {[
                      { task: "Complete machine learning fundamentals course", weeks: "13-18", priority: "high" },
                      { task: "Build 2-3 end-to-end ML projects", weeks: "16-22", priority: "high" },
                      { task: "Learn scikit-learn and model evaluation", weeks: "18-20", priority: "high" },
                      { task: "Start learning cloud platforms (AWS/GCP basics)", weeks: "20-24", priority: "medium" },
                      { task: "Create professional portfolio website", weeks: "22-24", priority: "medium" },
                      { task: "Begin networking and applying for roles", weeks: "24-26", priority: "high" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Circle className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{item.task}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={item.priority === 'high' ? 'default' : 'secondary'} className="text-xs">
                            {item.priority}
                          </Badge>
                          <span className="text-xs text-gray-600">Week {item.weeks}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Success Metrics */}
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-2">Success Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-green-800">
                    <div>• Complete 3+ portfolio projects</div>
                    <div>• Achieve 80%+ skill proficiency</div>
                    <div>• Network with 20+ professionals</div>
                    <div>• Apply to 50+ relevant positions</div>
                    <div>• Receive first data science job offer</div>
                    <div>• Land role with $70K+ starting salary</div>
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