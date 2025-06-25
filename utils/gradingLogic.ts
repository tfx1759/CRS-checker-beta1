
import { CrsSymptoms, IcansSymptoms, Grade, IceData } from '../types';

export const calculateCrsGrade = (symptoms: CrsSymptoms): Grade => {
  if (!symptoms.fever) {
    // If no fever (key symptom of CRS), considered Grade 0 unless other criteria supersede.
    // ASTCT defines CRS primarily by fever. If other symptoms are present without fever, they might indicate something else.
    // For this tool, we will assume fever is required for CRS grading > 0.
    return Grade.GRADE_0;
  }

  // Grade 4: Life-threatening
  if (symptoms.hypotension === 'requiresMultipleVasopressors' || symptoms.hypoxia === 'positivePressureVentilation') {
    return Grade.GRADE_4;
  }

  // Grade 3: Severe
  if (symptoms.hypotension === 'requiresVasopressor' || symptoms.hypoxia === 'highFlowNasalCannulaOrMask') {
    return Grade.GRADE_3;
  }

  // Grade 2: Moderate
  if (symptoms.hypotension === 'responsiveToFluids' || symptoms.hypoxia === 'lowFlowNasalCannula') {
    return Grade.GRADE_2;
  }

  // Grade 1: Mild (Fever only)
  return Grade.GRADE_1;
};

export const calculateIceScore = (iceData: IceData): number => {
  if (!iceData.isAssessable) return 0; // If unarousable, ICE score is 0
  return iceData.orientation + iceData.naming + iceData.followingCommands + iceData.writing + iceData.attention;
};


export const calculateIcansGrade = (symptoms: IcansSymptoms): Grade => {
  const currentIceScore = calculateIceScore(symptoms.iceData);
  let finalGrade: Grade = Grade.GRADE_0;

  // Contribution from ICE Score
  let iceGradeContribution: Grade = Grade.GRADE_0;
  if (!symptoms.iceData.isAssessable && symptoms.levelOfConsciousness === 'unarousableNoResponse') { // Unarousable and cannot complete ICE
    iceGradeContribution = Grade.GRADE_4;
  } else if (currentIceScore >= 0 && currentIceScore <= 2) {
    iceGradeContribution = Grade.GRADE_3;
  } else if (currentIceScore >= 3 && currentIceScore <= 6) {
    iceGradeContribution = Grade.GRADE_2;
  } else if (currentIceScore >= 7 && currentIceScore <= 9) {
    iceGradeContribution = Grade.GRADE_1;
  }
  finalGrade = Math.max(finalGrade, iceGradeContribution) as Grade;


  // Contribution from Level of Consciousness (LOC)
  let locGradeContribution: Grade = Grade.GRADE_0;
  switch (symptoms.levelOfConsciousness) {
    case 'unarousableNoResponse':
      locGradeContribution = Grade.GRADE_4;
      break;
    case 'severeSomnolenceStupor':
      locGradeContribution = Grade.GRADE_3;
      break;
    case 'moderateSomnolenceAgitation':
      locGradeContribution = Grade.GRADE_2;
      break;
    case 'mildSomnolenceAgitation':
      locGradeContribution = Grade.GRADE_1;
      break;
    case 'awake':
    default:
      locGradeContribution = Grade.GRADE_0;
      break;
  }
  finalGrade = Math.max(finalGrade, locGradeContribution) as Grade;

  // Contribution from Seizures
  let seizureGradeContribution: Grade = Grade.GRADE_0;
  switch (symptoms.seizures) {
    case 'lifeThreateningOrRepetitive':
      seizureGradeContribution = Grade.GRADE_4;
      break;
    case 'anyClinicalSeizure':
      seizureGradeContribution = Grade.GRADE_3;
      break;
    case 'none':
    default:
      seizureGradeContribution = Grade.GRADE_0;
      break;
  }
  finalGrade = Math.max(finalGrade, seizureGradeContribution) as Grade;

  // Contribution from Motor Findings
  let motorGradeContribution: Grade = Grade.GRADE_0;
  switch (symptoms.motorFindings) {
    case 'decorticateDecerebrate':
      motorGradeContribution = Grade.GRADE_4;
      break;
    case 'expressiveAphasiaMotorWeakness':
      motorGradeContribution = Grade.GRADE_3;
      break;
    case 'tremorMyoclonusMildAphasia':
      motorGradeContribution = Grade.GRADE_2;
      break;
    case 'none':
    default:
      motorGradeContribution = Grade.GRADE_0;
      break;
  }
  finalGrade = Math.max(finalGrade, motorGradeContribution) as Grade;

  // Contribution from Raised ICP / Papilledema
  if (symptoms.raisedIcpOrPapilledema) {
    finalGrade = Math.max(finalGrade, Grade.GRADE_4) as Grade;
  }
  
  // Specific ASTCT rule: if patient is unarousable (ICE=0 equivalent by definition), it's Grade 4 ICANS.
  // This is handled by !symptoms.iceData.isAssessable and symptoms.levelOfConsciousness === 'unarousableNoResponse'
  if (!symptoms.iceData.isAssessable && symptoms.levelOfConsciousness === 'unarousableNoResponse') {
      return Grade.GRADE_4;
  }


  return finalGrade;
};
