import { EducationLevel, Stream, CompetitiveExam } from '../types/education';

export function getEducationLevelInfo(level: EducationLevel) {
  const info = {
    '10th': {
      title: '10th Standard Student',
      description: 'Exploring subjects and future streams',
      features: [
        'Subject interest analysis',
        'Stream selection guidance',
        'Early career awareness',
        'Study habit development'
      ],
      assessmentType: 'Aptitude + Interests',
      dashboardType: 'Early Career Guidance'
    },
    '12th': {
      title: '12th Standard Student', 
      description: 'Preparing for competitive exams and college',
      features: [
        'Competitive exam guidance',
        'College selection help',
        'Stream-specific assessments',
        'Entrance exam preparation'
      ],
      assessmentType: 'Stream + Exam Readiness',
      dashboardType: 'College & Exam Guidance'
    },
    'graduation': {
      title: 'Graduation Student',
      description: 'Planning career entry and skill development',
      features: [
        'Job market analysis',
        'Skill gap identification',
        'Interview preparation',
        'Higher studies guidance'
      ],
      assessmentType: 'Skills + Job Readiness',
      dashboardType: 'Career Insights'
    },
    'post-graduation': {
      title: 'Post-Graduate Professional',
      description: 'Advancing to leadership and specialized roles',
      features: [
        'Leadership development',
        'Career advancement planning',
        'Industry transition guidance',
        'Executive education options'
      ],
      assessmentType: 'Leadership + Advancement',
      dashboardType: 'Career Growth'
    }
  };

  return info[level];
}

export function getStreamInfo(stream: Stream) {
  const streamData = {
    'science': {
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
      exams: ['JEE', 'NEET', 'BITSAT', 'VITEEE'],
      careers: ['Engineer', 'Doctor', 'Scientist', 'Researcher']
    },
    'commerce': {
      subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics'],
      exams: ['CA Foundation', 'CS Foundation', 'CMA Foundation', 'CUET'],
      careers: ['Chartered Accountant', 'Business Manager', 'Economist', 'Banker']
    },
    'arts': {
      subjects: ['History', 'Political Science', 'Psychology', 'English'],
      exams: ['CUET', 'JNU Entrance', 'DU Entrance', 'BHU Entrance'],
      careers: ['Civil Servant', 'Journalist', 'Teacher', 'Lawyer']
    },
    'agriculture': {
      subjects: ['Agriculture', 'Biology', 'Chemistry', 'Physics'],
      exams: ['ICAR AIEEA', 'State Agriculture Exams'],
      careers: ['Agricultural Scientist', 'Farm Manager', 'Food Technologist']
    },
    'vocational': {
      subjects: ['Trade-specific subjects', 'Practical skills'],
      exams: ['Skill-based certifications'],
      careers: ['Skilled Technician', 'Entrepreneur', 'Specialist']
    }
  };

  return streamData[stream];
}

export function getCompetitiveExamInfo(exam: CompetitiveExam) {
  const examData = {
    'jee': {
      fullName: 'Joint Entrance Examination',
      eligibility: 'Science (PCM) stream',
      difficulty: 'Very High',
      attempts: 2,
      colleges: ['IIT', 'NIT', 'IIIT', 'State Engineering Colleges']
    },
    'neet': {
      fullName: 'National Eligibility cum Entrance Test',
      eligibility: 'Science (PCB) stream',
      difficulty: 'Very High',
      attempts: 'Unlimited',
      colleges: ['AIIMS', 'Government Medical Colleges', 'Private Medical Colleges']
    },
    'cuet': {
      fullName: 'Common University Entrance Test',
      eligibility: 'Any stream',
      difficulty: 'Medium-High',
      attempts: 'Multiple',
      colleges: ['Central Universities', 'Delhi University', 'JNU']
    },
    'cat': {
      fullName: 'Common Admission Test',
      eligibility: 'Graduation (any stream)',
      difficulty: 'Very High',
      attempts: 'Unlimited',
      colleges: ['IIM', 'Top B-Schools']
    },
    'gate': {
      fullName: 'Graduate Aptitude Test in Engineering',
      eligibility: 'Engineering graduation',
      difficulty: 'High',
      attempts: 'Unlimited',
      colleges: ['IIT', 'IISc', 'PSUs']
    },
    'upsc': {
      fullName: 'Union Public Service Commission',
      eligibility: 'Graduation (any stream)',
      difficulty: 'Very High',
      attempts: 6,
      colleges: ['Civil Services']
    },
    'nda': {
      fullName: 'National Defence Academy',
      eligibility: '12th pass',
      difficulty: 'High',
      attempts: 'Age-limited',
      colleges: ['NDA', 'Naval Academy', 'Air Force Academy']
    },
    'other': {
      fullName: 'Other Competitive Exams',
      eligibility: 'Varies',
      difficulty: 'Varies',
      attempts: 'Varies',
      colleges: ['Various']
    }
  };

  return examData[exam];
}

export function generatePersonalizedRecommendations(
  level: EducationLevel,
  profile: any,
  assessmentResults: any
) {
  const recommendations = {
    '10th': [
      'Focus on building strong foundation in core subjects',
      'Explore different career fields through online resources',
      'Start developing good study habits and time management',
      'Consider your interests when choosing stream for 11th-12th'
    ],
    '12th': [
      'Prepare seriously for your target competitive exams',
      'Research colleges and courses thoroughly',
      'Maintain good grades in board exams',
      'Start building relevant skills for your chosen field'
    ],
    'graduation': [
      'Build a strong portfolio of projects and internships',
      'Develop both technical and soft skills',
      'Network with professionals in your target industry',
      'Consider relevant certifications to boost employability'
    ],
    'post-graduation': [
      'Focus on leadership and strategic thinking skills',
      'Consider executive education for career advancement',
      'Build thought leadership in your domain',
      'Explore opportunities for industry transition or entrepreneurship'
    ]
  };

  return recommendations[level] || [];
}