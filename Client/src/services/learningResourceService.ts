// Learning Resource Service - Real-time course recommendations and educational content

export interface CourseRecommendation {
  id: string;
  title: string;
  provider: string;
  url: string;
  rating: number;
  students: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: {
    amount: number;
    currency: string;
    type: 'free' | 'paid' | 'subscription';
    discount?: number;
  };
  skills: string[];
  description: string;
  syllabus: CourseModule[];
  instructor: InstructorInfo;
  completion: CompletionData;
  reviews: CourseReview[];
  relevanceScore: number;
  personalizedReason: string;
  certificationType: 'completion' | 'verified' | 'professional' | 'university';
  prerequisites: string[];
  outcomes: string[];
  lastUpdated: string;
}

export interface CourseModule {
  title: string;
  duration: string;
  topics: string[];
  type: 'video' | 'reading' | 'assignment' | 'project';
}

export interface InstructorInfo {
  name: string;
  credentials: string[];
  rating: number;
  experience: string;
  company?: string;
}

export interface CompletionData {
  rate: number;
  averageTime: string;
  jobPlacementRate?: number;
  salaryIncrease?: number;
}

export interface CourseReview {
  rating: number;
  comment: string;
  helpful: number;
  date: string;
  verified: boolean;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  courses: CourseRecommendation[];
  milestones: PathMilestone[];
  skillsGained: string[];
  careerOutcomes: string[];
  roi: ROIData;
}

export interface PathMilestone {
  title: string;
  description: string;
  estimatedTime: string;
  deliverables: string[];
}

export interface ROIData {
  timeToComplete: string;
  avgSalaryIncrease: number;
  jobPlacementRate: number;
  paybackPeriod: string;
}

export interface ProviderData {
  name: string;
  type: 'university' | 'platform' | 'bootcamp' | 'government';
  rating: number;
  accreditation: string[];
  specializations: string[];
  pricingModel: string;
  supportLevel: string;
}

class LearningResourceService {
  private apiKeys = {
    coursera: typeof window !== 'undefined' ? 'demo_key' : 'demo_key',
    udemy: typeof window !== 'undefined' ? 'demo_key' : 'demo_key',
    edx: typeof window !== 'undefined' ? 'demo_key' : 'demo_key',
    linkedin: typeof window !== 'undefined' ? 'demo_key' : 'demo_key'
  };

  private providerAPIs = {
    coursera: 'https://api.coursera.com/v1',
    udemy: 'https://api.udemy.com/v2.0',
    edx: 'https://api.edx.org/v1',
    linkedinLearning: 'https://api.linkedin.com/v2/learning',
    khanAcademy: 'https://api.khanacademy.org/v1',
    pluralsight: 'https://api.pluralsight.com/v1',
    skillshare: 'https://api.skillshare.com/v1'
  };

  async getPersonalizedCourses(
    skillGaps: any[], 
    userProfile: any, 
    preferences: any = {}
  ): Promise<CourseRecommendation[]> {
    console.log('🎯 Generating personalized course recommendations...');
    
    try {
      // Simulate concurrent API calls to multiple learning platforms
      const [
        courseraResults,
        udemyResults,
        edxResults,
        linkedinResults,
        specializedResults
      ] = await Promise.all([
        this.fetchCourseraRecommendations(skillGaps, userProfile),
        this.fetchUdemyRecommendations(skillGaps, userProfile),
        this.fetchEdXRecommendations(skillGaps, userProfile),
        this.fetchLinkedInLearningRecommendations(skillGaps, userProfile),
        this.fetchSpecializedPlatforms(skillGaps, userProfile)
      ]);

      // Combine and rank all recommendations
      const allCourses = [
        ...courseraResults,
        ...udemyResults,
        ...edxResults,
        ...linkedinResults,
        ...specializedResults
      ];

      // Apply AI-powered ranking based on user profile
      const rankedCourses = this.rankCoursesByRelevance(allCourses, userProfile, skillGaps);
      
      console.log(`✅ Found ${rankedCourses.length} personalized course recommendations`);
      return rankedCourses.slice(0, 20); // Return top 20

    } catch (error) {
      console.error('❌ Failed to fetch course recommendations:', error);
      throw new Error('Course recommendation service unavailable');
    }
  }

  private async fetchCourseraRecommendations(skillGaps: any[], userProfile: any): Promise<CourseRecommendation[]> {
    await this.delay(800);
    
    return skillGaps.slice(0, 3).map((gap, index) => ({
      id: `coursera_${index}_${Date.now()}`,
      title: `${gap.skill} Specialization by Stanford University`,
      provider: 'Coursera',
      url: 'https://coursera.org/specializations/data-science',
      rating: 4.6 + Math.random() * 0.3,
      students: Math.floor(Math.random() * 500000) + 100000,
      duration: `${Math.floor(Math.random() * 8) + 4} months`,
      level: this.determineLevelFromGap(gap),
      price: {
        amount: 49,
        currency: 'USD',
        type: 'subscription' as const,
        discount: Math.random() > 0.7 ? 20 : undefined
      },
      skills: [gap.skill, ...this.getRelatedSkills(gap.skill)],
      description: `Comprehensive ${gap.skill} course from leading university professors`,
      syllabus: this.generateSyllabus(gap.skill),
      instructor: {
        name: 'Dr. ' + this.generateInstructorName(),
        credentials: ['PhD', 'Professor at Stanford'],
        rating: 4.7,
        experience: '15+ years',
        company: 'Stanford University'
      },
      completion: {
        rate: 78,
        averageTime: '6 months',
        jobPlacementRate: 85,
        salaryIncrease: 25
      },
      reviews: this.generateReviews(),
      relevanceScore: this.calculateRelevanceScore(gap, userProfile),
      personalizedReason: `Perfect match for your ${gap.skill} skill gap`,
      certificationType: 'university' as const,
      prerequisites: gap.current < 30 ? [] : ['Basic programming knowledge'],
      outcomes: [`Master ${gap.skill}`, 'Build portfolio projects', 'Industry recognition'],
      lastUpdated: new Date().toISOString()
    }));
  }

  private async fetchUdemyRecommendations(skillGaps: any[], userProfile: any): Promise<CourseRecommendation[]> {
    await this.delay(600);
    
    return skillGaps.slice(0, 4).map((gap, index) => ({
      id: `udemy_${index}_${Date.now()}`,
      title: `Complete ${gap.skill} Bootcamp 2024`,
      provider: 'Udemy',
      url: 'https://udemy.com/course/complete-python-bootcamp',
      rating: 4.4 + Math.random() * 0.4,
      students: Math.floor(Math.random() * 200000) + 50000,
      duration: `${Math.floor(Math.random() * 30) + 10} hours`,
      level: this.determineLevelFromGap(gap),
      price: {
        amount: Math.floor(Math.random() * 100) + 50,
        currency: 'USD',
        type: 'paid' as const,
        discount: Math.random() > 0.5 ? Math.floor(Math.random() * 80) + 20 : undefined
      },
      skills: [gap.skill, ...this.getRelatedSkills(gap.skill)],
      description: `Hands-on ${gap.skill} course with real-world projects`,
      syllabus: this.generateSyllabus(gap.skill),
      instructor: {
        name: this.generateInstructorName(),
        credentials: ['Industry Expert', 'Senior Developer'],
        rating: 4.5,
        experience: '10+ years',
        company: 'Tech Industry'
      },
      completion: {
        rate: 65,
        averageTime: '2 months',
        salaryIncrease: 20
      },
      reviews: this.generateReviews(),
      relevanceScore: this.calculateRelevanceScore(gap, userProfile),
      personalizedReason: `Practical approach matches your learning style`,
      certificationType: 'completion' as const,
      prerequisites: [],
      outcomes: [`Learn ${gap.skill}`, 'Build 5+ projects', 'Job-ready skills'],
      lastUpdated: new Date().toISOString()
    }));
  }

  private async fetchEdXRecommendations(skillGaps: any[], userProfile: any): Promise<CourseRecommendation[]> {
    await this.delay(700);
    
    return skillGaps.slice(0, 2).map((gap, index) => ({
      id: `edx_${index}_${Date.now()}`,
      title: `${gap.skill} MicroMasters Program`,
      provider: 'edX',
      url: 'https://edx.org/micromasters/mitx-statistics-and-data-science',
      rating: 4.5 + Math.random() * 0.3,
      students: Math.floor(Math.random() * 150000) + 30000,
      duration: `${Math.floor(Math.random() * 12) + 6} months`,
      level: 'Advanced' as const,
      price: {
        amount: 150,
        currency: 'USD',
        type: 'paid' as const
      },
      skills: [gap.skill, ...this.getRelatedSkills(gap.skill)],
      description: `Graduate-level ${gap.skill} program from top universities`,
      syllabus: this.generateSyllabus(gap.skill),
      instructor: {
        name: 'Prof. ' + this.generateInstructorName(),
        credentials: ['PhD', 'MIT Professor'],
        rating: 4.8,
        experience: '20+ years',
        company: 'MIT'
      },
      completion: {
        rate: 72,
        averageTime: '8 months',
        jobPlacementRate: 90,
        salaryIncrease: 35
      },
      reviews: this.generateReviews(),
      relevanceScore: this.calculateRelevanceScore(gap, userProfile),
      personalizedReason: `Advanced curriculum for career acceleration`,
      certificationType: 'professional' as const,
      prerequisites: ['Undergraduate mathematics', 'Programming experience'],
      outcomes: [`Expert-level ${gap.skill}`, 'University credential', 'Career advancement'],
      lastUpdated: new Date().toISOString()
    }));
  }

  private async fetchLinkedInLearningRecommendations(skillGaps: any[], userProfile: any): Promise<CourseRecommendation[]> {
    await this.delay(500);
    
    return skillGaps.slice(0, 3).map((gap, index) => ({
      id: `linkedin_${index}_${Date.now()}`,
      title: `${gap.skill} Essential Training`,
      provider: 'LinkedIn Learning',
      url: 'https://linkedin.com/learning/python-essential-training',
      rating: 4.3 + Math.random() * 0.4,
      students: Math.floor(Math.random() * 100000) + 20000,
      duration: `${Math.floor(Math.random() * 8) + 2} hours`,
      level: this.determineLevelFromGap(gap),
      price: {
        amount: 29.99,
        currency: 'USD',
        type: 'subscription' as const
      },
      skills: [gap.skill],
      description: `Professional ${gap.skill} training for business contexts`,
      syllabus: this.generateSyllabus(gap.skill),
      instructor: {
        name: this.generateInstructorName(),
        credentials: ['LinkedIn Learning Instructor', 'Industry Expert'],
        rating: 4.4,
        experience: '8+ years',
        company: 'LinkedIn'
      },
      completion: {
        rate: 82,
        averageTime: '1 month'
      },
      reviews: this.generateReviews(),
      relevanceScore: this.calculateRelevanceScore(gap, userProfile),
      personalizedReason: `Professional focus aligns with career goals`,
      certificationType: 'completion' as const,
      prerequisites: [],
      outcomes: [`Professional ${gap.skill} skills`, 'LinkedIn badge', 'Career networking'],
      lastUpdated: new Date().toISOString()
    }));
  }

  private async fetchSpecializedPlatforms(skillGaps: any[], userProfile: any): Promise<CourseRecommendation[]> {
    await this.delay(900);
    
    const specializedCourses = [];
    
    // Add Indian government platforms
    if (userProfile.location && userProfile.location.includes('India')) {
      specializedCourses.push({
        id: `swayam_${Date.now()}`,
        title: 'NPTEL Data Science Course',
        provider: 'SWAYAM',
        url: 'https://swayam.gov.in/nd1_noc20_cs73',
        rating: 4.2,
        students: 45000,
        duration: '12 weeks',
        level: 'Intermediate' as const,
        price: {
          amount: 0,
          currency: 'INR',
          type: 'free' as const
        },
        skills: ['Data Science', 'Python', 'Statistics'],
        description: 'Government-backed data science program by IIT professors',
        syllabus: this.generateSyllabus('Data Science'),
        instructor: {
          name: 'Prof. Rajesh Kumar',
          credentials: ['PhD', 'IIT Delhi Professor'],
          rating: 4.5,
          experience: '15+ years',
          company: 'IIT Delhi'
        },
        completion: {
          rate: 68,
          averageTime: '3 months'
        },
        reviews: this.generateReviews(),
        relevanceScore: 85,
        personalizedReason: 'Government-recognized certification for Indian job market',
        certificationType: 'verified' as const,
        prerequisites: ['Basic programming'],
        outcomes: ['Government certificate', 'IIT-quality education', 'Job placement support'],
        lastUpdated: new Date().toISOString()
      });
    }

    // Add bootcamp recommendations for career changers
    if (userProfile.experience === '0' || userProfile.experience === '1-2') {
      specializedCourses.push({
        id: `bootcamp_${Date.now()}`,
        title: 'Data Science Intensive Bootcamp',
        provider: 'General Assembly',
        url: 'https://generalassemb.ly/education/data-science-circuit',
        rating: 4.3,
        students: 5000,
        duration: '12 weeks',
        level: 'Intensive' as const,
        price: {
          amount: 3950,
          currency: 'USD',
          type: 'paid' as const
        },
        skills: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
        description: 'Full-time intensive bootcamp with job placement guarantee',
        syllabus: this.generateBootcampSyllabus(),
        instructor: {
          name: 'Sarah Chen',
          credentials: ['Senior Data Scientist', 'Ex-Google'],
          rating: 4.6,
          experience: '12+ years',
          company: 'General Assembly'
        },
        completion: {
          rate: 95,
          averageTime: '3 months',
          jobPlacementRate: 85,
          salaryIncrease: 60
        },
        reviews: this.generateReviews(),
        relevanceScore: 90,
        personalizedReason: 'Intensive format perfect for career transition',
        certificationType: 'professional' as const,
        prerequisites: ['High school diploma'],
        outcomes: ['Job placement guarantee', 'Portfolio projects', 'Industry mentorship'],
        lastUpdated: new Date().toISOString()
      });
    }

    return specializedCourses;
  }

  async generateLearningPath(skillGaps: any[], careerGoal: string, timeframe: string): Promise<LearningPath> {
    console.log(`🛤️ Generating personalized learning path for ${careerGoal}...`);
    
    await this.delay(1200);

    const courses = await this.getPersonalizedCourses(skillGaps, { careerGoal });
    const orderedCourses = this.orderCoursesByDependencies(courses, skillGaps);

    return {
      id: `path_${Date.now()}`,
      title: `${careerGoal} Learning Path`,
      description: `Comprehensive roadmap to become a successful ${careerGoal}`,
      duration: timeframe,
      difficulty: this.determineDifficultyFromGaps(skillGaps),
      courses: orderedCourses,
      milestones: this.generateMilestones(careerGoal, orderedCourses),
      skillsGained: skillGaps.map(gap => gap.skill),
      careerOutcomes: [
        `${careerGoal} role readiness`,
        'Portfolio of projects',
        'Industry-recognized certifications',
        'Professional network expansion'
      ],
      roi: {
        timeToComplete: timeframe,
        avgSalaryIncrease: 45,
        jobPlacementRate: 78,
        paybackPeriod: '8 months'
      }
    };
  }

  async getProviderComparison(skill: string): Promise<ProviderData[]> {
    console.log(`🏫 Comparing learning providers for ${skill}...`);
    
    await this.delay(800);

    return [
      {
        name: 'Coursera',
        type: 'platform',
        rating: 4.6,
        accreditation: ['University partners', 'Industry recognition'],
        specializations: ['Data Science', 'AI/ML', 'Business'],
        pricingModel: 'Subscription ($49/month)',
        supportLevel: 'High'
      },
      {
        name: 'Udemy',
        type: 'platform',
        rating: 4.3,
        accreditation: ['Completion certificates'],
        specializations: ['Technical skills', 'Creative', 'Business'],
        pricingModel: 'One-time purchase ($50-200)',
        supportLevel: 'Medium'
      },
      {
        name: 'edX',
        type: 'platform',
        rating: 4.5,
        accreditation: ['University credentials', 'MicroMasters'],
        specializations: ['Computer Science', 'Data Science', 'Engineering'],
        pricingModel: 'Free + Verified certificates ($50-300)',
        supportLevel: 'High'
      }
    ];
  }

  private rankCoursesByRelevance(courses: CourseRecommendation[], userProfile: any, skillGaps: any[]): CourseRecommendation[] {
    return courses.sort((a, b) => {
      // Multi-factor ranking algorithm
      const aScore = this.calculateRankingScore(a, userProfile, skillGaps);
      const bScore = this.calculateRankingScore(b, userProfile, skillGaps);
      return bScore - aScore;
    });
  }

  private calculateRankingScore(course: CourseRecommendation, userProfile: any, skillGaps: any[]): number {
    let score = 0;
    
    // Relevance to skill gaps (40% weight)
    const relevantGaps = skillGaps.filter(gap => course.skills.includes(gap.skill));
    score += relevantGaps.length * 40;
    
    // Course quality (30% weight)
    score += course.rating * 6; // Normalize to 30 max
    
    // User level match (20% weight)
    const levelMatch = this.calculateLevelMatch(course.level, userProfile);
    score += levelMatch * 20;
    
    // Price appropriateness (10% weight)
    const priceScore = this.calculatePriceScore(course.price, userProfile);
    score += priceScore * 10;
    
    return score;
  }

  private calculateRelevanceScore(gap: any, userProfile: any): number {
    let score = 70; // Base score
    
    // Skill priority
    const gapSize = gap.required - gap.current;
    score += Math.min(gapSize / 2, 20);
    
    // User experience level match
    if (userProfile.experience && gap.current < 50 && userProfile.experience === '0') {
      score += 10; // Beginner-friendly bonus
    }
    
    return Math.min(score, 100);
  }

  // Helper methods
  private determineLevelFromGap(gap: any): 'Beginner' | 'Intermediate' | 'Advanced' {
    if (gap.current < 30) return 'Beginner';
    if (gap.current < 70) return 'Intermediate';
    return 'Advanced';
  }

  private getRelatedSkills(skill: string): string[] {
    const skillMap: Record<string, string[]> = {
      'Python': ['NumPy', 'Pandas', 'Matplotlib'],
      'Machine Learning': ['Scikit-learn', 'TensorFlow', 'PyTorch'],
      'SQL': ['Database Design', 'Query Optimization'],
      'Statistics': ['Probability', 'Hypothesis Testing'],
      'Data Visualization': ['Tableau', 'Power BI', 'D3.js']
    };
    return skillMap[skill] || [];
  }

  private generateSyllabus(skill: string): CourseModule[] {
    return [
      {
        title: `Introduction to ${skill}`,
        duration: '2 hours',
        topics: [`${skill} fundamentals`, 'Getting started', 'Basic concepts'],
        type: 'video'
      },
      {
        title: `${skill} in Practice`,
        duration: '4 hours',
        topics: ['Hands-on exercises', 'Real-world examples', 'Best practices'],
        type: 'assignment'
      },
      {
        title: `Advanced ${skill}`,
        duration: '3 hours',
        topics: ['Advanced techniques', 'Industry applications', 'Case studies'],
        type: 'project'
      }
    ];
  }

  private generateBootcampSyllabus(): CourseModule[] {
    return [
      {
        title: 'Foundations',
        duration: '3 weeks',
        topics: ['Python', 'Statistics', 'SQL'],
        type: 'video'
      },
      {
        title: 'Machine Learning',
        duration: '4 weeks',
        topics: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation'],
        type: 'project'
      },
      {
        title: 'Specialization',
        duration: '3 weeks',
        topics: ['Deep Learning', 'NLP', 'Computer Vision'],
        type: 'project'
      },
      {
        title: 'Capstone',
        duration: '2 weeks',
        topics: ['End-to-end project', 'Presentation', 'Portfolio'],
        type: 'project'
      }
    ];
  }

  private generateInstructorName(): string {
    const names = ['John Smith', 'Sarah Johnson', 'Michael Chen', 'Emily Davis', 'David Wilson'];
    return names[Math.floor(Math.random() * names.length)];
  }

  private generateReviews(): CourseReview[] {
    return [
      {
        rating: 5,
        comment: 'Excellent course with practical examples',
        helpful: 25,
        date: '2024-01-15',
        verified: true
      },
      {
        rating: 4,
        comment: 'Good content but could be more detailed',
        helpful: 12,
        date: '2024-01-10',
        verified: true
      }
    ];
  }

  private orderCoursesByDependencies(courses: CourseRecommendation[], skillGaps: any[]): CourseRecommendation[] {
    // Sort courses by learning dependencies and skill gap priorities
    return courses.sort((a, b) => {
      if (a.level === 'Beginner' && b.level !== 'Beginner') return -1;
      if (a.level !== 'Beginner' && b.level === 'Beginner') return 1;
      return b.relevanceScore - a.relevanceScore;
    });
  }

  private generateMilestones(careerGoal: string, courses: CourseRecommendation[]): PathMilestone[] {
    return [
      {
        title: 'Foundation Skills',
        description: 'Master basic programming and statistics',
        estimatedTime: '2 months',
        deliverables: ['Complete first course', 'Build basic project']
      },
      {
        title: 'Core Competency',
        description: 'Develop machine learning skills',
        estimatedTime: '3 months',
        deliverables: ['Complete ML course', 'Build ML project portfolio']
      },
      {
        title: 'Specialization',
        description: 'Focus on specific domain expertise',
        estimatedTime: '2 months',
        deliverables: ['Advanced project', 'Industry certification']
      },
      {
        title: 'Job Readiness',
        description: 'Portfolio completion and job search',
        estimatedTime: '1 month',
        deliverables: ['Complete portfolio', 'Practice interviews']
      }
    ];
  }

  private determineDifficultyFromGaps(skillGaps: any[]): 'Beginner' | 'Intermediate' | 'Advanced' {
    const avgCurrent = skillGaps.reduce((sum, gap) => sum + gap.current, 0) / skillGaps.length;
    if (avgCurrent < 40) return 'Beginner';
    if (avgCurrent < 70) return 'Intermediate';
    return 'Advanced';
  }

  private calculateLevelMatch(courseLevel: string, userProfile: any): number {
    // Simple level matching logic
    if (userProfile.experience === '0' && courseLevel === 'Beginner') return 1;
    if (userProfile.experience === '1-2' && courseLevel === 'Intermediate') return 1;
    if (userProfile.experience === '3-5' && courseLevel === 'Advanced') return 1;
    return 0.5;
  }

  private calculatePriceScore(price: any, userProfile: any): number {
    // Free courses get higher score for beginners
    if (price.type === 'free') return 1;
    if (price.amount < 100) return 0.8;
    if (price.amount < 500) return 0.6;
    return 0.4;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const learningResourceService = new LearningResourceService();