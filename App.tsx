
import React, { useState, useEffect, useCallback } from 'react';
import { CrsSymptoms, IcansSymptoms, Grade, initialCrsSymptoms, initialIcansSymptoms, IceData, initialIceData } from './types';
import CrsAssessment from './components/CrsAssessment';
import IcansAssessment from './components/IcansAssessment';
import ResultDisplay from './components/ResultDisplay';
import { calculateCrsGrade, calculateIcansGrade, calculateIceScore } from './utils/gradingLogic';
import { TOTAL_MAX_ICE_SCORE } from './constants';

const App: React.FC = () => {
  const [crsSymptoms, setCrsSymptoms] = useState<CrsSymptoms>(initialCrsSymptoms);
  const [icansSymptoms, setIcansSymptoms] = useState<IcansSymptoms>(initialIcansSymptoms);

  const [crsGrade, setCrsGrade] = useState<Grade>(Grade.GRADE_0);
  const [icansGrade, setIcansGrade] = useState<Grade>(Grade.GRADE_0);
  const [currentIceScore, setCurrentIceScore] = useState<number>(TOTAL_MAX_ICE_SCORE);

  const handleCrsSymptomChange = useCallback(<K extends keyof CrsSymptoms>(key: K, value: CrsSymptoms[K]) => {
    setCrsSymptoms(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleIcansSymptomChange = useCallback(<K extends keyof IcansSymptoms>(key: K, value: IcansSymptoms[K]) => {
    setIcansSymptoms(prev => ({ ...prev, [key]: value }));
  }, []);
  
  const handleIceDataChange = useCallback(<K extends keyof IceData>(key: K, value: IceData[K]) => {
    setIcansSymptoms(prev => ({
      ...prev,
      iceData: {
        ...prev.iceData,
        [key]: value
      }
    }));
  }, []);

  useEffect(() => {
    const newCrsGrade = calculateCrsGrade(crsSymptoms);
    setCrsGrade(newCrsGrade);
  }, [crsSymptoms]);

  useEffect(() => {
    const newIceScore = calculateIceScore(icansSymptoms.iceData);
    setCurrentIceScore(newIceScore);
    
    // If patient becomes unarousable, ensure ICE is 0 for grading.
    let symptomsForGrading = {...icansSymptoms};
    if (symptomsForGrading.levelOfConsciousness === 'unarousableNoResponse' && symptomsForGrading.iceData.isAssessable) {
       symptomsForGrading = {
        ...symptomsForGrading,
        iceData: { ...symptomsForGrading.iceData, isAssessable: false }
       };
    }

    const newIcansGrade = calculateIcansGrade(symptomsForGrading);
    setIcansGrade(newIcansGrade);
  }, [icansSymptoms]);
  
  const resetForm = () => {
    setCrsSymptoms(initialCrsSymptoms);
    setIcansSymptoms(initialIcansSymptoms);
    // Grades will auto-update via useEffect
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-sky-800 tracking-tight">
          ASTCT CRS & ICANS Grading Tool
        </h1>
        <p className="mt-2 text-lg text-slate-600">
          Quickly assess patient status based on ASTCT 2019 guidelines.
        </p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2 space-y-8">
          <CrsAssessment symptoms={crsSymptoms} onSymptomsChange={handleCrsSymptomChange} />
          <IcansAssessment 
            symptoms={icansSymptoms} 
            onSymptomsChange={handleIcansSymptomChange}
            onIceDataChange={handleIceDataChange}
          />
        </div>
        
        <div className="md:col-span-1">
          <ResultDisplay crsGrade={crsGrade} icansGrade={icansGrade} iceScore={currentIceScore} />
           <button
            onClick={resetForm}
            className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Reset All Fields
          </button>
        </div>
      </main>
      
      <footer className="mt-12 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Clinical Assessment Tools. For informational purposes only. Always consult official ASTCT guidelines.</p>
        <p>This tool reflects the ASTCT 2019 Consensus Grading for Cytokine Release Syndrome and Neurologic Toxicity Associated with Immune Effector Cells.</p>
      </footer>
    </div>
  );
};

export default App;
