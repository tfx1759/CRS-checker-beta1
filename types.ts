
export enum Grade {
  GRADE_0 = 0,
  GRADE_1 = 1,
  GRADE_2 = 2,
  GRADE_3 = 3,
  GRADE_4 = 4,
  NOT_ASSESSABLE = -1, // For cases where assessment cannot be completed
}

export interface CrsSymptoms {
  fever: boolean; // ≥38°C
  hypotension: 'none' | 'responsiveToFluids' | 'requiresVasopressor' | 'requiresMultipleVasopressors';
  hypoxia: 'none' | 'lowFlowNasalCannula' | 'highFlowNasalCannulaOrMask' | 'positivePressureVentilation';
}

export interface IceData {
  orientation: number; // 0-4
  naming: number; // 0-3
  followingCommands: number; // 0-1
  writing: number; // 0-1
  attention: number; // 0-1
  isAssessable: boolean; // True if patient can be assessed, false if unarousable for ICE
}

export interface IcansSymptoms {
  iceData: IceData;
  levelOfConsciousness: 'awake' | 'mildSomnolenceAgitation' | 'moderateSomnolenceAgitation' | 'severeSomnolenceStupor' | 'unarousableNoResponse';
  seizures: 'none' | 'anyClinicalSeizure' | 'lifeThreateningOrRepetitive'; // Non-life-threatening vs life-threatening
  motorFindings: 'none' | 'tremorMyoclonusMildAphasia' | 'expressiveAphasiaMotorWeakness' | 'decorticateDecerebrate';
  raisedIcpOrPapilledema: boolean; // Presence of signs of cerebral edema / raised ICP
}

export const initialCrsSymptoms: CrsSymptoms = {
  fever: false,
  hypotension: 'none',
  hypoxia: 'none',
};

export const initialIceData: IceData = {
  orientation: 4,
  naming: 3,
  followingCommands: 1,
  writing: 1,
  attention: 1,
  isAssessable: true,
};

export const initialIcansSymptoms: IcansSymptoms = {
  iceData: { ...initialIceData },
  levelOfConsciousness: 'awake',
  seizures: 'none',
  motorFindings: 'none',
  raisedIcpOrPapilledema: false,
};

export interface SelectOption {
  value: string;
  label: string;
}
