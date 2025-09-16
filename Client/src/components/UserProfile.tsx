import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { User, GraduationCap, Briefcase, Target, Plus, X } from 'lucide-react';

interface UserProfileProps {
  initialData?: any;
  onComplete: (data: any) => void;
}

export function UserProfile({ initialData, onComplete }: UserProfileProps) {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    // Basic Info
    name: initialData?.name || '',
    age: initialData?.age || '',
    location: initialData?.location || '',
    email: initialData?.email || '',
    
    // Education
    education: initialData?.education || '',
    field: initialData?.field || '',
    graduation: initialData?.graduation || '',
    gpa: initialData?.gpa || '',
    
    // Experience
    experience: initialData?.experience || '',
    currentRole: initialData?.currentRole || '',
    industry: initialData?.industry || '',
    skills: initialData?.skills || [],
    
    // Goals & Interests
    careerGoals: initialData?.careerGoals || '',
    interests: initialData?.interests || [],
    workStyle: initialData?.workStyle || '',
    salaryExpectation: initialData?.salaryExpectation || ''
  });

  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const steps = [
    { titleKey: 'profile.basic_info.title', icon: User },
    { titleKey: 'profile.education.title', icon: GraduationCap },
    { titleKey: 'profile.experience.title', icon: Briefcase },
    { titleKey: 'profile.goals.title', icon: Target }
  ];

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((s: string) => s !== skill)
    }));
  };

  const addInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter((i: string) => i !== interest)
    }));
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const progressPercentage = ((step + 1) / steps.length) * 100;

  const predefinedInterests = [
    'Technology', 'Healthcare', 'Education', 'Finance', 'Marketing',
    'Design', 'Research', 'Management', 'Entrepreneurship', 'Creative Arts',
    'Social Impact', 'Environment', 'Travel', 'Sports', 'Gaming'
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{t('profile.title')}</CardTitle>
            <CardDescription>
              {t('profile.description')}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{step + 1} of {steps.length}</span>
            <Progress value={progressPercentage} className="w-20" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((stepInfo, index) => {
            const Icon = stepInfo.icon;
            const isActive = index === step;
            const isCompleted = index < step;
            
            return (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2
                  ${isActive ? 'border-blue-500 bg-blue-50 text-blue-600' : 
                    isCompleted ? 'border-green-500 bg-green-50 text-green-600' : 
                    'border-gray-300 bg-gray-50 text-gray-400'}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`text-xs text-center ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                  {t(stepInfo.titleKey)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        {step === 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('profile.basic_info.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">{t('profile.basic_info.full_name')} *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder={t('profile.basic_info.placeholders.full_name')}
                />
              </div>
              <div>
                <Label htmlFor="age">{t('profile.basic_info.age')} *</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  placeholder={t('profile.basic_info.placeholders.age')}
                />
              </div>
              <div>
                <Label htmlFor="location">{t('profile.basic_info.location')} *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder={t('profile.basic_info.placeholders.location')}
                />
              </div>
              <div>
                <Label htmlFor="email">{t('profile.basic_info.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder={t('profile.basic_info.placeholders.email')}
                />
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('profile.education.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="education">{t('profile.education.highest_education')} *</Label>
                <Select value={formData.education} onValueChange={(value) => setFormData(prev => ({ ...prev, education: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('profile.education.highest_education')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">{t('profile.education.levels.high_school')}</SelectItem>
                    <SelectItem value="diploma">{t('profile.education.levels.diploma')}</SelectItem>
                    <SelectItem value="bachelors">{t('profile.education.levels.bachelors')}</SelectItem>
                    <SelectItem value="masters">{t('profile.education.levels.masters')}</SelectItem>
                    <SelectItem value="phd">{t('profile.education.levels.phd')}</SelectItem>
                    <SelectItem value="other">{t('profile.education.levels.other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="field">{t('profile.education.field_of_study')} *</Label>
                <Input
                  id="field"
                  value={formData.field}
                  onChange={(e) => setFormData(prev => ({ ...prev, field: e.target.value }))}
                  placeholder={t('profile.education.placeholders.field')}
                />
              </div>
              <div>
                <Label htmlFor="graduation">{t('profile.education.graduation_year')}</Label>
                <Input
                  id="graduation"
                  type="number"
                  value={formData.graduation}
                  onChange={(e) => setFormData(prev => ({ ...prev, graduation: e.target.value }))}
                  placeholder={t('profile.education.placeholders.graduation')}
                />
              </div>
              <div>
                <Label htmlFor="gpa">{t('profile.education.gpa')}</Label>
                <Input
                  id="gpa"
                  value={formData.gpa}
                  onChange={(e) => setFormData(prev => ({ ...prev, gpa: e.target.value }))}
                  placeholder={t('profile.education.placeholders.gpa')}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">{t('profile.experience.title')}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="experience">{t('profile.experience.years_experience')}</Label>
                <Select value={formData.experience} onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('profile.experience.years_experience')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">{t('profile.experience.experience_levels.0')}</SelectItem>
                    <SelectItem value="1-2">{t('profile.experience.experience_levels.1-2')}</SelectItem>
                    <SelectItem value="3-5">{t('profile.experience.experience_levels.3-5')}</SelectItem>
                    <SelectItem value="5-10">{t('profile.experience.experience_levels.5-10')}</SelectItem>
                    <SelectItem value="10+">{t('profile.experience.experience_levels.10+')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="currentRole">{t('profile.experience.current_role')}</Label>
                <Input
                  id="currentRole"
                  value={formData.currentRole}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentRole: e.target.value }))}
                  placeholder={t('profile.experience.placeholders.current_role')}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="industry">{t('profile.experience.industry')}</Label>
              <Input
                id="industry"
                value={formData.industry}
                onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                placeholder={t('profile.experience.placeholders.industry')}
              />
            </div>

            <div>
              <Label>{t('profile.experience.skills_technologies')}</Label>
              <div className="flex gap-2 mb-3">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder={t('profile.experience.placeholders.add_skill')}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button type="button" onClick={addSkill} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">{t('profile.goals.title')}</h3>
            
            <div>
              <Label htmlFor="careerGoals">{t('profile.goals.career_goals')}</Label>
              <Textarea
                id="careerGoals"
                value={formData.careerGoals}
                onChange={(e) => setFormData(prev => ({ ...prev, careerGoals: e.target.value }))}
                placeholder={t('profile.goals.placeholders.career_goals')}
                rows={3}
              />
            </div>

            <div>
              <Label>{t('profile.goals.interests_passions')}</Label>
              <div className="flex gap-2 mb-3">
                <Input
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder={t('profile.goals.placeholders.add_interest')}
                  onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                />
                <Button type="button" onClick={addInterest} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-2">{t('profile.goals.common_interests')}</p>
                <div className="flex flex-wrap gap-2">
                  {predefinedInterests.map((interest) => (
                    <Badge
                      key={interest}
                      variant={formData.interests.includes(interest) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        if (formData.interests.includes(interest)) {
                          removeInterest(interest);
                        } else {
                          setFormData(prev => ({
                            ...prev,
                            interests: [...prev.interests, interest]
                          }));
                        }
                      }}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.interests.map((interest: string, index: number) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {interest}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeInterest(interest)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="workStyle">{t('profile.goals.work_style')}</Label>
                <Select value={formData.workStyle} onValueChange={(value) => setFormData(prev => ({ ...prev, workStyle: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('profile.goals.work_style')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">{t('profile.goals.work_styles.remote')}</SelectItem>
                    <SelectItem value="hybrid">{t('profile.goals.work_styles.hybrid')}</SelectItem>
                    <SelectItem value="office">{t('profile.goals.work_styles.office')}</SelectItem>
                    <SelectItem value="flexible">{t('profile.goals.work_styles.flexible')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="salaryExpectation">{t('profile.goals.salary_expectation')}</Label>
                <Input
                  id="salaryExpectation"
                  value={formData.salaryExpectation}
                  onChange={(e) => setFormData(prev => ({ ...prev, salaryExpectation: e.target.value }))}
                  placeholder={t('profile.goals.placeholders.salary')}
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button 
            variant="outline" 
            onClick={handleBack} 
            disabled={step === 0}
          >
            {t('common.back')}
          </Button>
          <Button onClick={handleNext}>
            {step === steps.length - 1 ? t('profile.complete_profile') : t('common.next')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}