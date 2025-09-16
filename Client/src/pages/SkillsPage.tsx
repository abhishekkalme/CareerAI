import React, { useState, useEffect } from 'react';
import { SkillGapAnalysis } from '../components/SkillGapAnalysis';

export function SkillsPage() {
  const [skillGaps, setSkillGaps] = useState<any[]>([]);

  useEffect(() => {
    // Load skill gaps from localStorage
    const storedSkillGaps = localStorage.getItem('careerAI_skillGaps');
    if (storedSkillGaps) {
      setSkillGaps(JSON.parse(storedSkillGaps));
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SkillGapAnalysis skillGaps={skillGaps} />
    </div>
  );
}