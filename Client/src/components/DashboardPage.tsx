import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useEducationFlow } from "../hooks/useEducationFlow";
import { TrendingUp, Target, Award, Briefcase, CheckCircle } from "lucide-react";

// Mocked job recommendations
const JOB_RECOMMENDATIONS = [
  { title: "Data Scientist", salary: "$80k - $150k", growth: "22%", demand: "High", skills: ["Python","ML","SQL"], companies: ["Google","Netflix"], match: 90 },
  { title: "Software Engineer", salary: "$75k - $140k", growth: "13%", demand: "High", skills: ["JS","React","Node"], companies: ["Amazon","Meta"], match: 85 },
];

// Simple assessment questions
const ASSESSMENT_QUESTIONS = [
  { id: 1, question: "Do you enjoy solving complex problems?", skill: "Problem Solving" },
  { id: 2, question: "Are you interested in coding and building apps?", skill: "Programming" },
  { id: 3, question: "Do you like analyzing data and finding insights?", skill: "Data Analysis" },
];

export function DashboardPage() {
  const { studentProfile, updateStudentProfile } = useEducationFlow();
  const [careerMatches, setCareerMatches] = useState<typeof JOB_RECOMMENDATIONS>([]);
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<number, boolean>>({});
  const [assessmentDone, setAssessmentDone] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState<string[]>([]);

  // Update career matches whenever studentProfile.skills change
  useEffect(() => {
    if (!studentProfile) return;

    const matches = JOB_RECOMMENDATIONS.map((job) => {
      const overlap = job.skills.filter(skill => studentProfile.skills.includes(skill));
      const scoreBoost = overlap.length * 5;
      return { ...job, match: Math.min(job.match + scoreBoost, 100) };
    });

    setCareerMatches(matches);
  }, [studentProfile]);

  // Handle assessment completion
  const handleAssessmentSubmit = () => {
    const strengths = ASSESSMENT_QUESTIONS
      .filter((q) => assessmentAnswers[q.id])
      .map((q) => q.skill);

    const results = strengths.length ? strengths : ["No strong preferences identified"];
    setAssessmentResults(results);
    setAssessmentDone(true);

    // Update profile in context with assessment results
    if (studentProfile) {
      updateStudentProfile({
        ...studentProfile,
        assessmentResults: results,
      });
    }
  };

  if (!studentProfile) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">No profile found</h2>
        <p>Please complete onboarding to view your dashboard.</p>
      </div>
    );
  }

  return (
    // <div className="max-w-6xl mx-auto p-6 space-y-8">
    //   {/* Header */}
    //   <h1 className="text-2xl font-bold">Welcome, {studentProfile.name} 👋</h1>
    //   <p className="text-gray-600">Here’s your personalized career dashboard.</p>

    //   {/* Quick Stats */}
    //   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    //     <Card>
    //       <CardContent className="p-4 text-center">
    //         <Target className="h-6 w-6 mx-auto text-indigo-500" />
    //         <h2 className="text-lg font-semibold">88%</h2>
    //         <p className="text-sm">Career Match</p>
    //       </CardContent>
    //     </Card>
    //     <Card>
    //       <CardContent className="p-4 text-center">
    //         <Award className="h-6 w-6 mx-auto text-green-500" />
    //         <h2 className="text-lg font-semibold">{careerMatches.length}</h2>
    //         <p className="text-sm">Career Options</p>
    //       </CardContent>
    //     </Card>
    //     <Card>
    //       <CardContent className="p-4 text-center">
    //         <Briefcase className="h-6 w-6 mx-auto text-yellow-500" />
    //         <h2 className="text-lg font-semibold">{studentProfile.skills.length}</h2>
    //         <p className="text-sm">Skills</p>
    //       </CardContent>
    //     </Card>
    //     <Card>
    //       <CardContent className="p-4 text-center">
    //         <TrendingUp className="h-6 w-6 mx-auto text-pink-500" />
    //         <h2 className="text-lg font-semibold">+25%</h2>
    //         <p className="text-sm">Avg Growth</p>
    //       </CardContent>
    //     </Card>
    //   </div>

    //   {/* Career Matches */}
    //   <div>
    //     <h2 className="text-xl font-semibold mb-4">Career Matches</h2>
    //     <div className="space-y-4">
    //       {careerMatches.map((job, idx) => (
    //         <Card key={idx}>
    //           <CardHeader>
    //             <CardTitle className="flex justify-between">
    //               {job.title} <Badge>{job.match}% Match</Badge>
    //             </CardTitle>
    //           </CardHeader>
    //           <CardContent>
    //             <p><span className="font-semibold">{job.salary}</span> | Growth: {job.growth}</p>
    //             <p className="text-sm mb-2 text-purple-600">{job.demand}</p>
    //             <div className="flex flex-wrap gap-2 mb-2">
    //               {job.skills.map((s: string, i: number) => <Badge key={i} variant="secondary">{s}</Badge>)}
    //             </div>
    //             <p className="text-sm font-semibold">Top Companies:</p>
    //             <div className="flex flex-wrap gap-2">
    //               {job.companies.map((c: string, i: number) => <Badge key={i}>{c}</Badge>)}
    //             </div>
    //           </CardContent>
    //         </Card>
    //       ))}
    //     </div>
    //   </div>

    //   {/* Assessment Section */}
    //   <div>
    //     <h2 className="text-xl font-semibold mb-4">Skill Assessment</h2>
    //     {!assessmentDone ? (
    //       <Card>
    //         <CardContent className="space-y-4">
    //           {ASSESSMENT_QUESTIONS.map((q) => (
    //             <div key={q.id} className="flex items-center justify-between">
    //               <span>{q.question}</span>
    //               <Button
    //                 variant={assessmentAnswers[q.id] ? "default" : "outline"}
    //                 size="sm"
    //                 onClick={() =>
    //                   setAssessmentAnswers(prev => ({
    //                     ...prev,
    //                     [q.id]: !prev[q.id]
    //                   }))
    //                 }
    //               >
    //                 {assessmentAnswers[q.id] ? "Yes" : "No"}
    //               </Button>
    //             </div>
    //           ))}
    //           <div className="pt-4 text-right">
    //             <Button onClick={handleAssessmentSubmit} className="bg-indigo-600 text-white">
    //               Submit Assessment
    //             </Button>
    //           </div>
    //         </CardContent>
    //       </Card>
    //     ) : (
    //       <Card>
    //         <CardHeader>
    //           <CardTitle className="flex items-center gap-2">
    //             <CheckCircle className="h-5 w-5 text-green-500" /> Your Assessment Results
    //           </CardTitle>
    //         </CardHeader>
    //         <CardContent>
    //           <p className="mb-2 text-gray-600">Your strengths based on answers:</p>
    //           <div className="flex flex-wrap gap-2">
    //             {assessmentResults.map((res, i) => (
    //               <Badge key={i} variant="secondary">{res}</Badge>
    //             ))}
    //           </div>
    //         </CardContent>
    //       </Card>
    //     )}
    //   </div>
    // </div>

    <div>Hello</div>
  );
}
