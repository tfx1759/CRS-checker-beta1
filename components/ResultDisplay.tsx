
import React from 'react';
import { Grade } from '../types';
import Section from './Section';

interface ResultDisplayProps {
  crsGrade: Grade;
  icansGrade: Grade;
  iceScore: number;
}

const getGradeColor = (grade: Grade): string => {
  switch (grade) {
    case Grade.GRADE_0:
      return 'bg-green-100 text-green-800';
    case Grade.GRADE_1:
      return 'bg-yellow-100 text-yellow-800';
    case Grade.GRADE_2:
      return 'bg-orange-100 text-orange-800';
    case Grade.GRADE_3:
      return 'bg-red-100 text-red-800';
    case Grade.GRADE_4:
      return 'bg-red-200 text-red-900 border-2 border-red-500'; // Emphasize Grade 4
    case Grade.NOT_ASSESSABLE:
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const GradePill: React.FC<{ grade: Grade, prefix: string }> = ({ grade, prefix }) => {
  const gradeText = grade === Grade.NOT_ASSESSABLE ? 'Not Assessable' : `Grade ${grade}`;
  return (
    <span className={`px-4 py-2 rounded-full text-lg font-semibold ${getGradeColor(grade)}`}>
      {prefix}: {gradeText}
    </span>
  );
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ crsGrade, icansGrade, iceScore }) => {
  return (
    <Section title="Assessment Summary" className="sticky top-6">
      <div className="space-y-4 text-center">
        <GradePill grade={crsGrade} prefix="CRS" />
        <GradePill grade={icansGrade} prefix="ICANS" />
      </div>
      <div className="mt-6 text-center">
        <p className="text-xl font-medium text-slate-700">
          Calculated ICE Score: <span className="font-bold text-sky-700">{iceScore}/10</span>
        </p>
      </div>
       <div className="mt-6 p-4 border border-blue-200 rounded-md bg-blue-50">
        <h4 className="text-md font-semibold text-blue-700 mb-2">ASTCT Grading Reminder:</h4>
        <ul className="list-disc list-inside text-sm text-blue-600 space-y-1">
          <li><strong>CRS Grade 0:</strong> No fever, no CRS symptoms.</li>
          <li><strong>CRS Grade 1:</strong> Fever ≥38°C only.</li>
          <li><strong>CRS Grade 2:</strong> Fever + (Hypotension responsive to fluids OR Hypoxia responsive to low-flow O2).</li>
          <li><strong>CRS Grade 3:</strong> Fever + (Hypotension requiring vasopressor(s) OR Hypoxia requiring high-flow O2/mask).</li>
          <li><strong>CRS Grade 4:</strong> Fever + (Hypotension requiring multiple vasopressors OR Hypoxia requiring positive pressure ventilation).</li>
          <li className="mt-2"><strong>ICANS:</strong> Graded by the *most severe* neurological sign/symptom (ICE Score, LOC, Seizures, Motor, ICP).</li>
           <li><strong>ICE Score 0-2:</strong> Min. ICANS Grade 3.</li>
           <li><strong>ICE Score 0 (unarousable):</strong> ICANS Grade 4.</li>
           <li><strong>Any Seizure (non-life-threatening):</strong> Min. ICANS Grade 3.</li>
           <li><strong>Life-threatening Seizure:</strong> ICANS Grade 4.</li>
        </ul>
      </div>
    </Section>
  );
};

export default ResultDisplay;
