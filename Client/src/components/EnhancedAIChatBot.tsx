import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Brain, 
  Lightbulb,
  TrendingUp,
  Star,
  Clock,
  ChevronDown,
  Mic,
  Paperclip,
  Smile
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  metadata?: {
    intent?: string;
    confidence?: number;
    sources?: string[];
  };
}

interface EnhancedAIChatBotProps {
  userData: any;
}

const quickSuggestions = [
  "What career path fits my personality?",
  "How can I improve my skills gaps?",
  "What are the best learning resources for me?",
  "Help me prepare for job interviews",
  "How do I transition to a new industry?",
  "What certifications should I pursue?",
];

const aiPersonalities = {
  career_coach: {
    nameKey: "ai_chat.personalities.career_coach.name",
    descriptionKey: "ai_chat.personalities.career_coach.description",
    icon: TrendingUp,
    color: "text-blue-600 dark:text-blue-400"
  },
  skill_mentor: {
    nameKey: "ai_chat.personalities.skill_mentor.name",
    descriptionKey: "ai_chat.personalities.skill_mentor.description",
    icon: Brain,
    color: "text-purple-600 dark:text-purple-400"
  },
  interview_coach: {
    nameKey: "ai_chat.personalities.interview_coach.name",
    descriptionKey: "ai_chat.personalities.interview_coach.description",
    icon: Star,
    color: "text-green-600 dark:text-green-400"
  }
};

export function EnhancedAIChatBot({ userData }: EnhancedAIChatBotProps) {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState<keyof typeof aiPersonalities>('career_coach');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with welcome message
    if (messages.length === 0) {
      const welcomeMessage = generateWelcomeMessage();
      setMessages([welcomeMessage]);
    }
  }, [userData]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateWelcomeMessage = (): Message => {
    const hasAssessment = userData?.assessmentResults;
    const userName = userData?.profile?.fullName || 'there';
    
    let welcomeContent = `Hi ${userName}! 👋 I'm your AI career counselor, here to provide personalized guidance based on your profile and goals.`;
    
    if (hasAssessment) {
      const { dimensionScores } = userData.assessmentResults;
      const topDimension = Object.entries(dimensionScores).reduce((a, b) => 
        dimensionScores[a[0]] > dimensionScores[b[0]] ? a : b
      )[0];
      
      welcomeContent += ` I've analyzed your 5-D assessment results and noticed you excel in ${topDimension}. Let's explore how this strength can accelerate your career!`;
    } else {
      welcomeContent += ` I'd recommend taking our 5-D assessment first to give you more personalized advice.`;
    }

    return {
      id: 'welcome',
      type: 'ai',
      content: welcomeContent,
      timestamp: new Date(),
      suggestions: hasAssessment ? [
        "Analyze my career fit based on assessment",
        "What are my top career recommendations?",
        "How can I leverage my strengths?",
        "Show me my skill development plan"
      ] : [
        "Take the 5-D Career Assessment",
        "Tell me about career options in tech",
        "How do I choose the right career path?",
        "What skills are in demand?"
      ]
    };
  };

  const generateAIResponse = async (userMessage: string): Promise<Message> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    const response = generateContextualResponse(userMessage);
    
    return {
      id: `ai-${Date.now()}`,
      type: 'ai',
      content: response.content,
      timestamp: new Date(),
      suggestions: response.suggestions,
      metadata: {
        intent: response.intent,
        confidence: response.confidence,
        sources: response.sources
      }
    };
  };

  const generateContextualResponse = (userMessage: string) => {
    const messageLower = userMessage.toLowerCase();
    const hasAssessment = userData?.assessmentResults;
    
    // Career path inquiries
    if (messageLower.includes('career') && (messageLower.includes('path') || messageLower.includes('option'))) {
      if (hasAssessment) {
        const topRecommendation = userData.careerRecommendations?.[0];
        return {
          content: `Based on your 5-D assessment, I highly recommend exploring **${topRecommendation?.title || 'Data Science'}** as your primary career path. Your personality profile shows strong alignment with analytical roles that require both technical skills and strategic thinking.

Key reasons this fits you:
• Your aptitude score of ${userData.assessmentResults.dimensionScores.aptitude}% indicates excellent problem-solving abilities
• Your orientation style favors structured, goal-oriented work
• The field offers excellent growth potential (${topRecommendation?.growth || '25% growth'})

Would you like me to create a detailed roadmap for transitioning into this field?`,
          suggestions: [
            "Create a career transition roadmap",
            "What skills do I need to develop?",
            "Show me similar career options",
            "Help me find relevant courses"
          ],
          intent: 'career_guidance',
          confidence: 0.92,
          sources: ['5D Assessment', 'Career Database', 'Market Trends']
        };
      } else {
        return {
          content: `I'd love to help you explore career paths! To give you the most accurate recommendations, I suggest taking our **5-D Psychometric Assessment** first. This will help me understand your:

• **Orientation Style** - How you approach work
• **Interests** - What motivates you
• **Personality** - Your behavioral patterns  
• **Aptitude** - Your cognitive strengths
• **Emotional Intelligence** - Your interpersonal skills

Based on these insights, I can provide personalized career recommendations with 90%+ accuracy. Would you like to start the assessment now?`,
          suggestions: [
            "Take the 5-D Assessment",
            "Tell me about popular career fields",
            "What careers are growing fastest?",
            "How do I discover my interests?"
          ],
          intent: 'assessment_prompt',
          confidence: 0.95,
          sources: ['Assessment Framework']
        };
      }
    }

    // Skills and development
    if (messageLower.includes('skill') && (messageLower.includes('gap') || messageLower.includes('improve') || messageLower.includes('develop'))) {
      if (userData?.skillGaps?.length > 0) {
        const topGap = userData.skillGaps[0];
        return {
          content: `Great question! Based on your profile, I've identified several key areas for skill development:

**Highest Priority: ${topGap.skill}**
• Current level: ${topGap.current}%
• Target level: ${topGap.required}%
• Estimated learning time: ${topGap.timeToAcquire || '4-6 months'}

**Recommended Learning Path:**
1. Start with fundamentals on Coursera or edX
2. Practice with real projects on Kaggle/GitHub  
3. Join relevant communities and forums
4. Consider getting certified

The market demand for ${topGap.skill} is very high, so developing this skill could significantly boost your career prospects!`,
          suggestions: [
            "Show me specific courses for " + topGap.skill,
            "Create a learning schedule",
            "What other skills should I prioritize?",
            "Help me find practice projects"
          ],
          intent: 'skill_development',
          confidence: 0.88,
          sources: ['Skill Gap Analysis', 'Learning Resources Database']
        };
      } else {
        return {
          content: `I'd be happy to help you identify skills to develop! However, I don't have your detailed skill assessment yet. Here are some universally valuable skills in today's market:

**Technical Skills in High Demand:**
• Data Analysis & Python Programming
• Digital Marketing & SEO
• Cloud Computing (AWS, Azure)
• Cybersecurity Fundamentals

**Soft Skills Employers Value:**
• Communication & Presentation
• Leadership & Team Management  
• Critical Thinking & Problem Solving
• Emotional Intelligence

Would you like me to help you assess your current skill levels and create a personalized development plan?`,
          suggestions: [
            "Assess my current skills",
            "Show me trending technical skills",
            "Help me improve soft skills",
            "Create a learning plan"
          ],
          intent: 'skill_exploration',
          confidence: 0.82,
          sources: ['Skills Database', 'Market Research']
        };
      }
    }

    // Interview preparation
    if (messageLower.includes('interview') || messageLower.includes('job application')) {
      return {
        content: `I'd be happy to help you prepare for interviews! Based on your profile, here's a personalized preparation strategy:

**For ${userData?.careerRecommendations?.[0]?.title || 'your target role'}:**

**Technical Preparation:**
• Review core concepts in your field
• Practice coding problems (if applicable)
• Prepare portfolio/work samples
• Research the company's technology stack

**Behavioral Questions:**
• STAR method for storytelling
• Examples showcasing your strengths
• Questions about teamwork and leadership
• Growth mindset and learning examples

**Questions to Ask:**
• Team structure and collaboration style
• Growth opportunities and career progression
• Company culture and values
• Current challenges and priorities

Would you like me to help you practice specific interview scenarios?`,
        suggestions: [
          "Practice behavioral interview questions",
          "Help me prepare technical examples",
          "What questions should I ask employers?",
          "Review my resume and portfolio"
        ],
        intent: 'interview_prep',
        confidence: 0.90,
        sources: ['Interview Best Practices', 'Industry Standards']
      };
    }

    // Learning resources
    if (messageLower.includes('learn') || messageLower.includes('course') || messageLower.includes('study')) {
      return {
        content: `I can recommend excellent learning resources tailored to your goals! Here are some top platforms:

**For Structured Learning:**
• **Coursera** - University-level courses with certificates
• **edX** - MIT, Harvard courses (many free)
• **Udacity** - Career-focused nanodegrees
• **Pluralsight** - Technology skills development

**For Practical Skills:**
• **Kaggle Learn** - Free data science micro-courses
• **FreeCodeCamp** - Full coding bootcamp (free)
• **Khan Academy** - Fundamentals across many subjects
• **YouTube Channels** - 3Blue1Brown, Crash Course

**For Professional Development:**
• **LinkedIn Learning** - Business and soft skills
• **MasterClass** - Leadership and creativity
• **Skill India** - Government-backed certification programs

What specific area would you like to focus on learning?`,
        suggestions: [
          "Find courses for my career goals",
          "Show me free learning resources",
          "Help me create a study schedule",
          "What certifications should I pursue?"
        ],
        intent: 'learning_resources',
        confidence: 0.85,
        sources: ['Education Platforms Database', 'Course Reviews']
      };
    }

    // Default response
    return {
      content: `That's a great question! I'm here to help you with career guidance, skill development, interview preparation, and learning recommendations. 

As your AI career counselor, I can assist you with:
• Analyzing your career fit and personality
• Identifying skill gaps and development opportunities  
• Creating personalized learning plans
• Preparing for job interviews
• Exploring career transition strategies
• Finding relevant courses and resources

What specific area would you like to explore today?`,
      suggestions: quickSuggestions.slice(0, 4),
      intent: 'general_assistance',
      confidence: 0.75,
      sources: ['Career Guidance Framework']
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    setShowSuggestions(false);

    const aiResponse = await generateAIResponse(inputMessage);
    setIsTyping(false);
    setMessages(prev => [...prev, aiResponse]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    handleSendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const currentPersonality = aiPersonalities[selectedPersonality];
  const PersonalityIcon = currentPersonality.icon;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PersonalityIcon className={`h-6 w-6 ${currentPersonality.color}`} />
              <div>
                <CardTitle>{t(currentPersonality.nameKey)}</CardTitle>
                <CardDescription>{t(currentPersonality.descriptionKey)}</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                {t('common.online')}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Personality Selector */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium mb-3">{t('ai_chat.choose_counselor')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {Object.entries(aiPersonalities).map(([key, personality]) => {
              const Icon = personality.icon;
              const isSelected = selectedPersonality === key;
              
              return (
                <button
                  key={key}
                  onClick={() => setSelectedPersonality(key as keyof typeof aiPersonalities)}
                  className={`p-3 border rounded-lg text-left transition-colors ${
                    isSelected ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${personality.color}`} />
                    <span className="font-medium text-sm">{t(personality.nameKey)}</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {t(personality.descriptionKey)}
                  </p>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{t('ai_chat.title')}</CardTitle>
            <Badge variant="outline">{messages.length} {t('ai_chat.messages')}</Badge>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={chatContainerRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-start gap-2 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' ? 'bg-indigo-600' : 'bg-gray-100 dark:bg-gray-800'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        )}
                      </div>
                      <div className={`rounded-lg p-3 ${
                        message.type === 'user' 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                      }`}>
                        <div className="prose prose-sm max-w-none">
                          {message.content.split('\n').map((line, index) => {
                            if (line.startsWith('**') && line.endsWith('**')) {
                              return <div key={index} className="font-semibold mt-2 mb-1">{line.slice(2, -2)}</div>;
                            } else if (line.startsWith('• ')) {
                              return <div key={index} className="ml-4 text-sm">{line}</div>;
                            } else if (line.trim() === '') {
                              return <div key={index} className="h-2"></div>;
                            } else {
                              return <div key={index}>{line}</div>;
                            }
                          })}
                        </div>
                        <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                          <span>{message.timestamp.toLocaleTimeString()}</span>
                          {message.metadata?.confidence && (
                            <span>Confidence: {Math.round(message.metadata.confidence * 100)}%</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className={`mt-2 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                        <div className="flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Quick Suggestions */}
          {showSuggestions && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium mb-2">{t('ai_chat.quick_questions')}</h4>
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.slice(0, 4).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('ai_chat.placeholder')}
                  className="pr-12"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <Paperclip className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <Mic className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {t('ai_chat.ai_responses_note')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}