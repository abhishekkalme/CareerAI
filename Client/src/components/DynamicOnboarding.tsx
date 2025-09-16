import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import { useEducationFlow } from "../hooks/useEducationFlow";
// import { toast } from "react-toastify";
// import StepOne from "./OnboardingSteps/StepOne";
// import StepTwo from "./OnboardingSteps/StepTwo";
// import StepThree from "./OnboardingSteps/StepThree";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";
import { useEducationFlow } from "../hooks/useEducationFlow";
import { EducationLevel, Stream, CompetitiveExam } from "../types/education";
import {
  User,
  GraduationCap,
  BookOpen,
  Target,
  Award,
  Briefcase,
  TrendingUp,
  HelpCircle,
  CheckCircle,
} from "lucide-react";

interface DynamicOnboardingProps {
  onComplete: (profile: any) => void;
}

export function DynamicOnboarding({ onComplete }: DynamicOnboardingProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { updateStudentProfile, getOnboardingSteps } = useEducationFlow();

  const [currentStep, setCurrentStep] = useState(0);
  const [educationLevel, setEducationLevel] = useState<EducationLevel | null>(
    null
  );
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    phone: "",
    educationLevel: "" as EducationLevel,
    currentClass: "",
    school: "",
    stream: "" as Stream,
    subjects: [] as string[],
    percentage: "",
    interests: [] as string[],
    strengths: [] as string[],
    competitiveExams: [] as CompetitiveExam[],
    degree: "",
    specialization: "",
    workExperience: "",
    currentRole: "",
    skills: [] as string[],
    certifications: [] as string[],
    careerGoals: [] as string[],
    projects: [] as string[],
  });

  const steps = educationLevel
    ? getOnboardingSteps(educationLevel)
    : [
        { id: "basic", title: "Basic Information", icon: "User" },
        { id: "education", title: "Education Details", icon: "GraduationCap" },
      ];

  const handleEducationLevelChange = (level: EducationLevel) => {
    setEducationLevel(level);
    setFormData((prev) => ({ ...prev, educationLevel: level }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleComplete = () => {
    const profile = {
      id: `student_${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString(),
    };

    // Update context
    updateStudentProfile(profile);

    // Optional callback
    if (onComplete) onComplete(profile);

    // Navigate to dashboard — no state needed
    navigate("/dashboard");
  };

  const renderStepContent = () => {
    const step = steps[currentStep];
    switch (step.id) {
      case "basic":
        return <BasicInfoStep formData={formData} setFormData={setFormData} />;
      case "education":
        return (
          <EducationStep
            formData={formData}
            setFormData={setFormData}
            onEducationLevelChange={handleEducationLevelChange}
          />
        );
      case "subjects":
        return <SubjectsStep formData={formData} setFormData={setFormData} />;
      case "stream":
        return <StreamStep formData={formData} setFormData={setFormData} />;
      case "skills":
        return <SkillsStep formData={formData} setFormData={setFormData} />;
      case "experience":
        return <ExperienceStep formData={formData} setFormData={setFormData} />;
      case "goals":
        return (
          <GoalsStep
            formData={formData}
            setFormData={setFormData}
            level={educationLevel}
          />
        );
      case "advancement":
        return (
          <AdvancementStep formData={formData} setFormData={setFormData} />
        );
      default:
        return null;
    }
  };

  const isStepValid = () => {
    const step = steps[currentStep];
    switch (step.id) {
      case "basic":
        return formData.name && formData.age && formData.location;
      case "education":
        return formData.educationLevel && formData.currentClass;
      case "subjects":
        return formData.subjects.length > 0 && formData.interests.length > 0;
      case "stream":
        return formData.stream && formData.competitiveExams.length > 0;
      case "skills":
        return formData.skills.length > 0;
      case "experience":
        return formData.workExperience && formData.currentRole;
      case "goals":
        return formData.careerGoals.length > 0;
      case "advancement":
        return formData.careerGoals.length > 0;
      default:
        return true;
    }
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="max-w-5xl bg-white dark:bg-gray-900 mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Progress Header */}
      <Card className="bg-white dark:bg-gray-900 shadow-lg rounded-lg transition-all duration-300">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center  justify-between gap-4 md:gap-0">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Student Onboarding
              </CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400 mt-1">
                {educationLevel
                  ? `Personalized for ${educationLevel} students`
                  : "Tell us about yourself"}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-3 mt-2 md:mt-0">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {currentStep + 1} of {steps.length}
              </span>
              <Progress
                value={progressPercentage}
                className="w-28 h-2 rounded-full overflow-hidden"
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Step Indicators */}
      <div className="flex items-center justify-start overflow-x-auto space-x-4 pb-4 -mx-4 px-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
        {steps.map((step: any, index: number) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div
              key={step.id}
              className="flex items-center flex-shrink-0 space-x-2"
            >
              <div
                className={`flex flex-col items-center text-center transition-colors duration-300 ${
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400"
                    : isCompleted
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isActive
                      ? "border-indigo-600 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900/20"
                      : isCompleted
                      ? "border-green-600 bg-green-50 dark:border-green-400 dark:bg-green-900/20"
                      : "border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <span className="mt-1 text-xs sm:text-sm font-medium whitespace-nowrap">
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mt-5 transition-all duration-300 ${
                    isCompleted
                      ? "bg-green-600 dark:bg-green-400"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <Card className="bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-300">
        <CardContent className="p-6">
          {renderStepContent()}

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between pt-6 border-t mt-6 gap-3 sm:gap-0">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex-1 sm:flex-none"
            >
              {/* {t("common.back")} */}
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={isStepValid()}
              className="flex-1 sm:flex-none"
            >
              {currentStep === steps.length - 1
                ? "Complete Onboarding"
                : t("Next")
                }
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Step Components

function BasicInfoStep({ formData, setFormData }: any) {
  return (
    <div className="  p-6 rounded-lg space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Basic Information
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Please fill in your personal details below
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="flex flex-col">
          <Label
            htmlFor="name"
            className="mb-2 text-gray-700 dark:text-gray-300"
          >
            Full Name *
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev: any) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Enter your full name"
            className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition duration-300"
          />
        </div>

        {/* Age */}
        <div className="flex flex-col">
          <Label
            htmlFor="age"
            className="mb-2 text-gray-700 dark:text-gray-300"
          >
            Age *
          </Label>
          <Input
            id="age"
            type="number"
            value={formData.age}
            onChange={(e) =>
              setFormData((prev: any) => ({ ...prev, age: e.target.value }))
            }
            placeholder="Your age"
            className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition duration-300"
          />
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <Label
            htmlFor="location"
            className="mb-2 text-gray-700 dark:text-gray-300"
          >
            Location *
          </Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                location: e.target.value,
              }))
            }
            placeholder="City, State"
            className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition duration-300"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <Label
            htmlFor="phone"
            className="mb-2 text-gray-700 dark:text-gray-300"
          >
            Phone Number
          </Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev: any) => ({ ...prev, phone: e.target.value }))
            }
            placeholder="+91 XXXXX XXXXX"
            className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition duration-300"
          />
        </div>
      </div>
    </div>
  );
}

function EducationStep({ formData, setFormData, onEducationLevelChange }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Education Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="educationLevel">Current Education Level *</Label>
            <Select
              value={formData.educationLevel}
              onValueChange={(value: EducationLevel) => {
                setFormData((prev: any) => ({
                  ...prev,
                  educationLevel: value,
                }));
                onEducationLevelChange(value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your education level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10th">10th Standard</SelectItem>
                <SelectItem value="12th">12th Standard</SelectItem>
                <SelectItem value="graduation">
                  Graduation (Bachelor's)
                </SelectItem>
                <SelectItem value="post-graduation">
                  Post-Graduation (Master's/PhD)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="currentClass">Current Class/Year *</Label>
            <Input
              id="currentClass"
              value={formData.currentClass}
              onChange={(e) =>
                setFormData((prev: any) => ({
                  ...prev,
                  currentClass: e.target.value,
                }))
              }
              placeholder={
                formData.educationLevel === "10th"
                  ? "Class 10"
                  : formData.educationLevel === "12th"
                  ? "Class 12"
                  : formData.educationLevel === "graduation"
                  ? "Final Year"
                  : "Current Year"
              }
            />
          </div>
          <div>
            <Label htmlFor="school">School/College</Label>
            <Input
              id="school"
              value={formData.school}
              onChange={(e) =>
                setFormData((prev: any) => ({
                  ...prev,
                  school: e.target.value,
                }))
              }
              placeholder="Institution name"
            />
          </div>
          <div>
            <Label htmlFor="percentage">Academic Performance</Label>
            <Input
              id="percentage"
              value={formData.percentage}
              onChange={(e) =>
                setFormData((prev: any) => ({
                  ...prev,
                  percentage: e.target.value,
                }))
              }
              placeholder="Percentage/CGPA"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SubjectsStep({ formData, setFormData }: any) {
  const subjects = [
    "Mathematics",
    "Science",
    "English",
    "Hindi",
    "Social Studies",
    "Computer Science",
    "Physical Education",
    "Art",
    "Music",
  ];

  const interests = [
    "Problem Solving",
    "Creative Writing",
    "Science Experiments",
    "Sports",
    "Technology",
    "Art & Design",
    "Music",
    "Reading",
  ];

  const toggleSubject = (subject: string) => {
    setFormData((prev: any) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s: string) => s !== subject)
        : [...prev.subjects, subject],
    }));
  };

  const toggleInterest = (interest: string) => {
    setFormData((prev: any) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i: string) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Subjects & Interests</h3>

        <div className="mb-6">
          <Label className="text-base font-medium mb-3 block">
            Which subjects do you enjoy most? *
            <HelpCircle className="inline h-4 w-4 ml-1 text-gray-400" />
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {subjects.map((subject) => (
              <div
                key={subject}
                onClick={() => toggleSubject(subject)}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  formData.subjects.includes(subject)
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.subjects.includes(subject)}
                    onChange={() => toggleSubject(subject)}
                  />
                  <span className="text-sm">{subject}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-base font-medium mb-3 block">
            What are your main interests? *
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {interests.map((interest) => (
              <div
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  formData.interests.includes(interest)
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.interests.includes(interest)}
                    onChange={() => toggleInterest(interest)}
                  />
                  <span className="text-sm">{interest}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StreamStep({ formData, setFormData }: any) {
  const competitiveExams = [
    { id: "E", name: "Engineering ", stream: "all" },
    { id: "M", name: "Medical", stream: "all" },
    { id: "L", name: "Law", stream: "all" },
    { id: "D", name: "Design", stream: "all" },
    { id: "B", name: "Business", stream: "all" },
    // { id: 'ca', name: '', stream: 'all' },
    // { id: 'clat', name: 'CLAT (Law)', stream: 'all' },
    { id: "Govt", name: "Govt Exams", stream: "all" },
    { id: "other", name: "Other", stream: "all" },
  ];

  const toggleExam = (examId: CompetitiveExam) => {
    setFormData((prev: any) => ({
      ...prev,
      competitiveExams: prev.competitiveExams.includes(examId)
        ? prev.competitiveExams.filter((e: CompetitiveExam) => e !== examId)
        : [...prev.competitiveExams, examId],
    }));
  };

  const filteredExams = competitiveExams.filter(
    (exam) => exam.stream === "all" || exam.stream === formData.stream
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Stream & Competitive Exams
        </h3>

        <div className="mb-6">
          <Label htmlFor="stream">Your Stream *</Label>
          <Select
            value={formData.stream}
            onValueChange={(value: Stream) =>
              setFormData((prev: any) => ({ ...prev, stream: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your stream" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="science">Science (PCM/PCB)</SelectItem>
              <SelectItem value="commerce">Commerce</SelectItem>
              <SelectItem value="arts">Arts/Humanities</SelectItem>
              <SelectItem value="agriculture">Agriculture</SelectItem>
              <SelectItem value="vocational">Vocational</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-base font-medium mb-3 block">
            Future Goals? *
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredExams.map((exam) => (
              <div
                key={exam.id}
                onClick={() => toggleExam(exam.id as CompetitiveExam)}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  formData.competitiveExams.includes(exam.id)
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.competitiveExams.includes(exam.id)}
                    onChange={() => toggleExam(exam.id as CompetitiveExam)}
                  />
                  <span className="text-sm">{exam.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillsStep({ formData, setFormData }: any) {
  const technicalSkills = [
    "Programming",
    "Web Development",
    "Data Analysis",
    "Digital Marketing",
    "Graphic Design",
    "Video Editing",
    "Mobile App Development",
    "AI/ML",
  ];

  const softSkills = [
    "Communication",
    "Leadership",
    "Teamwork",
    "Problem Solving",
    "Time Management",
    "Critical Thinking",
    "Creativity",
    "Adaptability",
  ];

  const toggleSkill = (skill: string) => {
    setFormData((prev: any) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s: string) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Skills & Experience</h3>

        <div className="mb-6">
          <Label className="text-base font-medium mb-3 block">
            Technical Skills
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {technicalSkills.map((skill) => (
              <div
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  formData.skills.includes(skill)
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.skills.includes(skill)}
                    onChange={() => toggleSkill(skill)}
                  />
                  <span className="text-sm">{skill}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-base font-medium mb-3 block">
            Soft Skills
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {softSkills.map((skill) => (
              <div
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  formData.skills.includes(skill)
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.skills.includes(skill)}
                    onChange={() => toggleSkill(skill)}
                  />
                  <span className="text-sm">{skill}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="degree">Degree/Course *</Label>
            <Input
              id="degree"
              value={formData.degree}
              onChange={(e) =>
                setFormData((prev: any) => ({
                  ...prev,
                  degree: e.target.value,
                }))
              }
              placeholder="e.g., B.Tech Computer Science"
            />
          </div>
          <div>
            <Label htmlFor="specialization">Specialization</Label>
            <Input
              id="specialization"
              value={formData.specialization}
              onChange={(e) =>
                setFormData((prev: any) => ({
                  ...prev,
                  specialization: e.target.value,
                }))
              }
              placeholder="e.g., Machine Learning"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperienceStep({ formData, setFormData }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Professional Experience</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="workExperience">Years of Experience *</Label>
            <Select
              value={formData.workExperience}
              onValueChange={(value) =>
                setFormData((prev: any) => ({ ...prev, workExperience: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-1">0-1 years</SelectItem>
                <SelectItem value="1-3">1-3 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="5-10">5-10 years</SelectItem>
                <SelectItem value="10+">10+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="currentRole">Current Role *</Label>
            <Input
              id="currentRole"
              value={formData.currentRole}
              onChange={(e) =>
                setFormData((prev: any) => ({
                  ...prev,
                  currentRole: e.target.value,
                }))
              }
              placeholder="e.g., Software Engineer"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="certifications">
            Certifications (comma-separated)
          </Label>
          <Input
            id="certifications"
            value={formData.certifications.join(", ")}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                certifications: e.target.value
                  .split(",")
                  .map((cert: string) => cert.trim())
                  .filter(Boolean),
              }))
            }
            placeholder="e.g., AWS Certified, Google Analytics, PMP"
          />
        </div>
      </div>
    </div>
  );
}

function GoalsStep({ formData, setFormData, level }: any) {
  const getGoalOptions = (level: EducationLevel) => {
    switch (level) {
      case "10th":
        return [
          "Choose the right stream for 11th-12th",
          "Prepare for competitive exams",
          "Develop strong foundation in core subjects",
          "Explore career options early",
          "Build good study habits",
        ];
      case "12th":
        return [
          "1 year – Intensive coaching for entrance exams",
          "2 years – Balanced preparation with school",
          "3 years – Quick graduation, early job",

          "4 years – Engineering, design, etc",

          "5+ years – Medicine, law, CA, UPSC preparation",

          "No limit – Prefer research and higher studies",
        ];
      case "graduation":
        return [
          "Get placed in a good company",
          "Pursue higher studies (Masters/MBA)",
          "Start my own business",
          "Prepare for government jobs",
          "Develop industry-relevant skills",
        ];
      case "post-graduation":
        return [
          "Advance to senior management",
          "Switch to a different industry",
          "Start my own company",
          "Become a subject matter expert",
          "Achieve better work-life balance",
        ];
      default:
        return [];
    }
  };

  const goalOptions = getGoalOptions(level);

  const toggleGoal = (goal: string) => {
    setFormData((prev: any) => ({
      ...prev,
      careerGoals: prev.careerGoals.includes(goal)
        ? prev.careerGoals.filter((g: string) => g !== goal)
        : [...prev.careerGoals, goal],
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          {level === "10th" || level === "12th"
            ? "Future Goals"
            : "Career Goals"}
        </h3>

        <div>
          <Label className="text-base font-medium mb-3 block">
            What are your main goals? (Select all that apply) *
          </Label>
          <div className="space-y-3">
            {goalOptions.map((goal) => (
              <div
                key={goal}
                onClick={() => toggleGoal(goal)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  formData.careerGoals.includes(goal)
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={formData.careerGoals.includes(goal)}
                    onChange={() => toggleGoal(goal)}
                  />
                  <span className="text-sm">{goal}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {(level === "graduation" || level === "post-graduation") && (
          <div className="mt-6">
            <Label htmlFor="additionalGoals">
              Additional Goals or Aspirations
            </Label>
            <Textarea
              id="additionalGoals"
              placeholder="Describe any specific career aspirations or goals..."
              rows={3}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function AdvancementStep({ formData, setFormData }: any) {
  const advancementAreas = [
    "Executive Leadership",
    "Technical Expertise",
    "Business Strategy",
    "Team Management",
    "Innovation & R&D",
    "Entrepreneurship",
    "Consulting",
    "International Opportunities",
  ];

  const toggleAdvancement = (area: string) => {
    setFormData((prev: any) => ({
      ...prev,
      careerGoals: prev.careerGoals.includes(area)
        ? prev.careerGoals.filter((g: string) => g !== area)
        : [...prev.careerGoals, area],
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Career Advancement</h3>

        <div>
          <Label className="text-base font-medium mb-3 block">
            Which areas do you want to advance in? *
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {advancementAreas.map((area) => (
              <div
                key={area}
                onClick={() => toggleAdvancement(area)}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  formData.careerGoals.includes(area)
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.careerGoals.includes(area)}
                    onChange={() => toggleAdvancement(area)}
                  />
                  <span className="text-sm">{area}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
