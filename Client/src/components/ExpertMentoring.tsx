import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Calendar } from './ui/calendar';
import { 
  User, 
  Star, 
  Clock, 
  Video, 
  MessageSquare, 
  Calendar as CalendarIcon,
  Award,
  TrendingUp,
  Users,
  CheckCircle,
  Briefcase,
  GraduationCap,
  Globe,
  Linkedin,
  Mail,
  Phone
} from 'lucide-react';

interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  industry: string;
  experience: number;
  rating: number;
  reviewCount: number;
  specialties: string[];
  bio: string;
  achievements: string[];
  mentees: number;
  languages: string[];
  timeZone: string;
  availability: string[];
  sessionTypes: ('1-on-1' | 'group' | 'workshop')[];
  pricing: {
    consultation: number;
    hourly: number;
    package: number;
  };
  avatar: string;
  badges: string[];
}

const mentors: Mentor[] = [
  {
    id: 'sarah-chen',
    name: 'Dr. Sarah Chen',
    title: 'Senior Product Manager',
    company: 'Google',
    industry: 'Technology',
    experience: 12,
    rating: 4.9,
    reviewCount: 127,
    specialties: ['Product Strategy', 'Career Transitions', 'Leadership Development', 'Tech Industry'],
    bio: 'Former McKinsey consultant turned tech product leader. I help professionals navigate career transitions and develop strategic thinking skills.',
    achievements: [
      'Led product launches reaching 100M+ users',
      'Certified International Career Coach (ICF)',
      'Featured speaker at ProductCon 2023',
      'Mentored 200+ professionals'
    ],
    mentees: 234,
    languages: ['English', 'Mandarin', 'Spanish'],
    timeZone: 'PST',
    availability: ['Weekdays 6-8 PM', 'Saturdays 9-11 AM'],
    sessionTypes: ['1-on-1', 'group', 'workshop'],
    pricing: {
      consultation: 0,
      hourly: 150,
      package: 500
    },
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    badges: ['Top Mentor', 'Career Coach', 'Industry Expert']
  },
  {
    id: 'michael-rodriguez',
    name: 'Michael Rodriguez',
    title: 'Principal Data Scientist',
    company: 'Netflix',
    industry: 'Technology',
    experience: 10,
    rating: 4.8,
    reviewCount: 89,
    specialties: ['Data Science', 'Machine Learning', 'Career Growth', 'Interview Prep'],
    bio: 'Passionate about democratizing data science education. I help aspiring data scientists break into the field and advance their careers.',
    achievements: [
      'Built ML models used by 200M+ subscribers',
      'Published 15+ research papers',
      'Kaggle Grandmaster',
      'Created popular DS course with 50K+ students'
    ],
    mentees: 156,
    languages: ['English', 'Spanish'],
    timeZone: 'PST',
    availability: ['Weekdays 7-9 PM', 'Sundays 10-12 PM'],
    sessionTypes: ['1-on-1', 'group'],
    pricing: {
      consultation: 0,
      hourly: 120,
      package: 400
    },
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    badges: ['Data Expert', 'Research Leader', 'Top Rated']
  },
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    title: 'Design Director',
    company: 'Apple',
    industry: 'Technology',
    experience: 8,
    rating: 4.9,
    reviewCount: 145,
    specialties: ['UX Design', 'Design Leadership', 'Portfolio Review', 'Creative Strategy'],
    bio: 'Award-winning designer with a passion for mentoring the next generation of creative professionals.',
    achievements: [
      'Led design for award-winning mobile apps',
      'Speaker at Design+Research 2023',
      'Mentor at Stanford d.school',
      'Featured in Design Week Magazine'
    ],
    mentees: 198,
    languages: ['English', 'Hindi'],
    timeZone: 'PST',
    availability: ['Weekdays 5-7 PM', 'Saturdays 2-4 PM'],
    sessionTypes: ['1-on-1', 'workshop'],
    pricing: {
      consultation: 0,
      hourly: 130,
      package: 450
    },
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    badges: ['Design Leader', 'Creative Mentor', 'Portfolio Expert']
  },
  {
    id: 'james-thompson',
    name: 'James Thompson',
    title: 'Engineering Manager',
    company: 'Microsoft',
    industry: 'Technology',
    experience: 15,
    rating: 4.8,
    reviewCount: 203,
    specialties: ['Software Engineering', 'Technical Leadership', 'System Design', 'Team Management'],
    bio: 'Experienced engineering leader who loves helping developers grow their technical and leadership skills.',
    achievements: [
      'Scaled engineering teams from 5 to 50+',
      'Microsoft Technical Excellence Award',
      'Open source contributor with 10K+ GitHub stars',
      'Authored "Leading Technical Teams" book'
    ],
    mentees: 267,
    languages: ['English'],
    timeZone: 'EST',
    availability: ['Weekdays 6-8 PM', 'Saturdays 9-11 AM'],
    sessionTypes: ['1-on-1', 'group'],
    pricing: {
      consultation: 0,
      hourly: 140,
      package: 480
    },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    badges: ['Tech Leader', 'Author', 'Engineering Expert']
  }
];

const sessionTypes = [
  {
    type: '1-on-1',
    title: '1-on-1 Mentoring',
    description: 'Personalized guidance tailored to your specific goals and challenges',
    duration: '60 minutes',
    icon: User
  },
  {
    type: 'group',
    title: 'Group Sessions',
    description: 'Learn alongside peers in small group settings with interactive discussions',
    duration: '90 minutes',
    icon: Users
  },
  {
    type: 'workshop',
    title: 'Workshops',
    description: 'Intensive skill-building sessions with hands-on exercises and projects',
    duration: '2-3 hours',
    icon: GraduationCap
  }
];

export function ExpertMentoring() {
  const { t } = useTranslation();
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [bookingStep, setBookingStep] = useState<'type' | 'time' | 'details' | 'confirmation'>('type');
  const [selectedSessionType, setSelectedSessionType] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [bookingDetails, setBookingDetails] = useState({
    topic: '',
    goals: '',
    experience: '',
    questions: ''
  });

  const MentorCard = ({ mentor }: { mentor: Mentor }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start gap-4">
          <img 
            src={mentor.avatar} 
            alt={mentor.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-lg">{mentor.name}</CardTitle>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{mentor.rating}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">({mentor.reviewCount})</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {mentor.title} at {mentor.company}
            </p>
            <div className="flex flex-wrap gap-1 mb-3">
              {mentor.badges.map((badge, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
          {mentor.bio}
        </p>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{t('mentoring.experience')}</span>
            <span className="font-medium">{mentor.experience} years</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{t('mentoring.mentees')}</span>
            <span className="font-medium">{mentor.mentees}+ guided</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{t('mentoring.specialties')}</span>
            <span className="font-medium">{mentor.specialties.length} areas</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {mentor.specialties.slice(0, 3).map((specialty, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {specialty}
            </Badge>
          ))}
          {mentor.specialties.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{mentor.specialties.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div>
            <p className="text-sm font-medium">{t('mentoring.starting_from')}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{t('mentoring.free_consultation')}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-green-600 dark:text-green-400">{t('common.free')}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">30 min session</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            className="flex-1" 
            onClick={() => setSelectedMentor(mentor)}
          >
            {t('common.book_session')}
          </Button>
          <Button variant="outline" size="icon">
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const BookingModal = () => (
    <Dialog open={!!selectedMentor} onOpenChange={() => setSelectedMentor(null)}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Book a Session with {selectedMentor?.name}
          </DialogTitle>
          <DialogDescription>
            {selectedMentor?.title} at {selectedMentor?.company}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {bookingStep === 'type' && (
            <div>
              <h3 className="font-semibold mb-4">Choose Session Type</h3>
              <div className="grid gap-4">
                {sessionTypes.map((type) => {
                  const Icon = type.icon;
                  const isAvailable = selectedMentor?.sessionTypes.includes(type.type as any);
                  
                  return (
                    <button
                      key={type.type}
                      onClick={() => isAvailable && setSelectedSessionType(type.type)}
                      disabled={!isAvailable}
                      className={`p-4 border rounded-lg text-left transition-colors ${
                        selectedSessionType === type.type ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' :
                        isAvailable ? 'border-gray-200 dark:border-gray-700 hover:border-gray-300' :
                        'border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="h-5 w-5 mt-1 text-indigo-600 dark:text-indigo-400" />
                        <div>
                          <h4 className="font-medium">{type.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {type.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-gray-500">{type.duration}</span>
                            {!isAvailable && (
                              <Badge variant="secondary" className="text-xs">Not Available</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-end mt-6">
                <Button 
                  onClick={() => setBookingStep('time')}
                  disabled={!selectedSessionType}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {bookingStep === 'time' && (
            <div>
              <h3 className="font-semibold mb-4">Select Date & Time</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Choose Date</h4>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </div>
                <div>
                  <h4 className="font-medium mb-2">Available Times</h4>
                  <div className="space-y-2">
                    {['9:00 AM', '10:30 AM', '2:00 PM', '4:30 PM', '6:00 PM'].map((time) => (
                      <button
                        key={time}
                        className="w-full p-2 text-left border rounded hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        {time} ({selectedMentor?.timeZone})
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h5 className="font-medium text-sm mb-1">Mentor Availability</h5>
                    <ul className="text-xs text-gray-600 dark:text-gray-400">
                      {selectedMentor?.availability.map((slot, index) => (
                        <li key={index}>• {slot}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setBookingStep('type')}>
                  Back
                </Button>
                <Button onClick={() => setBookingStep('details')}>
                  Next
                </Button>
              </div>
            </div>
          )}

          {bookingStep === 'details' && (
            <div>
              <h3 className="font-semibold mb-4">Session Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    What would you like to discuss?
                  </label>
                  <Input
                    placeholder="e.g., Career transition to data science"
                    value={bookingDetails.topic}
                    onChange={(e) => setBookingDetails(prev => ({ ...prev, topic: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your career goals
                  </label>
                  <Textarea
                    placeholder="Tell us about your short-term and long-term career aspirations..."
                    value={bookingDetails.goals}
                    onChange={(e) => setBookingDetails(prev => ({ ...prev, goals: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Current experience level
                  </label>
                  <Select value={bookingDetails.experience} onValueChange={(value) => 
                    setBookingDetails(prev => ({ ...prev, experience: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                      <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                      <SelectItem value="senior">Senior Level (5+ years)</SelectItem>
                      <SelectItem value="executive">Executive Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Specific questions or challenges
                  </label>
                  <Textarea
                    placeholder="Any specific questions you'd like to address during the session..."
                    value={bookingDetails.questions}
                    onChange={(e) => setBookingDetails(prev => ({ ...prev, questions: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setBookingStep('time')}>
                  Back
                </Button>
                <Button onClick={() => setBookingStep('confirmation')}>
                  Review Booking
                </Button>
              </div>
            </div>
          )}

          {bookingStep === 'confirmation' && (
            <div>
              <h3 className="font-semibold mb-4">Confirm Your Booking</h3>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Session Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Mentor:</span>
                      <span>{selectedMentor?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Session Type:</span>
                      <span className="capitalize">{selectedSessionType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date & Time:</span>
                      <span>{selectedDate?.toLocaleDateString()} at 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>60 minutes</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Cost:</span>
                      <span className="text-green-600 dark:text-green-400">FREE (First session)</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h5 className="font-medium text-sm mb-2">What to expect:</h5>
                  <ul className="text-xs space-y-1">
                    <li>• You'll receive a calendar invite with video call details</li>
                    <li>• Prepare your questions and career goals to discuss</li>
                    <li>• Session will be recorded for your reference (optional)</li>
                    <li>• You'll receive a summary and action items after the session</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setBookingStep('details')}>
                  Back
                </Button>
                <Button onClick={() => {
                  // Handle booking confirmation
                  alert('Session booked successfully! You will receive a confirmation email shortly.');
                  setSelectedMentor(null);
                  setBookingStep('type');
                }}>
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            {t('mentoring.title')}
          </CardTitle>
          <CardDescription>
            {t('mentoring.description')}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">500+</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('mentoring.expert_mentors')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">100K+</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('mentoring.students_mentored')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">4.9★</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('virtual_internships.average_rating')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">{t('common.free')}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('mentoring.first_session')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Session Types */}
      <Card>
        <CardHeader>
          <CardTitle>{t('mentoring.session_types.title')}</CardTitle>
          <CardDescription>{t('mentoring.session_types.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sessionTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div key={type.type} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="font-medium">{t(`mentoring.session_types.${type.type}.title`)}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {t(`mentoring.session_types.${type.type}.description`)}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {t(`mentoring.session_types.${type.type}.duration`)}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Mentors Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">{t('mentoring.our_expert_mentors')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </div>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>{t('mentoring.benefits.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium mb-1">{t('mentoring.benefits.personalized.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('mentoring.benefits.personalized.description')}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium mb-1">{t('mentoring.benefits.expertise.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('mentoring.benefits.expertise.description')}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium mb-1">Flexible Scheduling</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Book sessions that fit your schedule across time zones
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium mb-1">Actionable Insights</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get concrete next steps and career action plans
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium mb-1">Ongoing Support</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Access to mentor community and resources
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium mb-1">Proven Results</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  85% of mentees achieve their career goals within 6 months
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <BookingModal />
    </div>
  );
}