
import { SelectOption } from './types';

export const CRS_HYPOTENSION_OPTIONS: SelectOption[] = [
  { value: 'none', label: 'None / Baseline' },
  { value: 'responsiveToFluids', label: 'Responds to fluids' },
  { value: 'requiresVasopressor', label: 'Requires 1 vasopressor (low-dose excluded if for other indication)' },
  { value: 'requiresMultipleVasopressors', label: 'Requires multiple vasopressors (low-dose excluded)' },
];

export const CRS_HYPOXIA_OPTIONS: SelectOption[] = [
  { value: 'none', label: 'None / Baseline (Room air SpO2 >92%)' },
  { value: 'lowFlowNasalCannula', label: 'Responds to low-flow nasal cannula (≤6 L/min)' },
  { value: 'highFlowNasalCannulaOrMask', label: 'Requires high-flow nasal cannula (>6 L/min), facemask, non-rebreather, or Venturi mask' },
  { value: 'positivePressureVentilation', label: 'Requires positive pressure (CPAP, BiPAP, intubation)' },
];

export const ICANS_LOC_OPTIONS: SelectOption[] = [
  { value: 'awake', label: 'Awake, normal consciousness' },
  { value: 'mildSomnolenceAgitation', label: 'Mild somnolence/agitation (responds to stimuli)' },
  { value: 'moderateSomnolenceAgitation', label: 'Moderate somnolence/agitation (wakes to voice)' },
  { value: 'severeSomnolenceStupor', label: 'Severe somnolence/stupor (wakes to tactile stimuli)' },
  { value: 'unarousableNoResponse', label: 'Unarousable, no response to stimuli, coma' },
];

export const ICANS_SEIZURES_OPTIONS: SelectOption[] = [
  { value: 'none', label: 'None' },
  { value: 'anyClinicalSeizure', label: 'Any clinical seizure (focal/generalized, non-life-threatening)' },
  { value: 'lifeThreateningOrRepetitive', label: 'Life-threatening (status epilepticus) or repetitive seizures needing ICU monitoring' },
];

export const ICANS_MOTOR_OPTIONS: SelectOption[] = [
  { value: 'none', label: 'None / Normal motor function' },
  { value: 'tremorMyoclonusMildAphasia', label: 'Tremor, myoclonus, mild aphasia' },
  { value: 'expressiveAphasiaMotorWeakness', label: 'Expressive aphasia, motor weakness' },
  { value: 'decorticateDecerebrate', label: 'Decorticate / Decerebrate posturing' },
];

export const ICE_ORIENTATION_QUESTIONS = [
  { id: 'year', label: 'Oriented to year?', points: 1 },
  { id: 'month', label: 'Oriented to month?', points: 1 },
  { id: 'city', label: 'Oriented to city?', points: 1 },
  { id: 'hospital', label: 'Oriented to hospital?', points: 1 },
];

export const ICE_NAMING_QUESTIONS = [
  { id: 'item1', label: 'Name object 1 (e.g., pen)?', points: 1 },
  { id: 'item2', label: 'Name object 2 (e.g., button)?', points: 1 },
  { id: 'item3', label: 'Name object 3 (e.g., chair)?', points: 1 },
];

// Note: For ICE score items, 1 point is awarded if task is performed correctly.
// So, for the component, we'll sum points based on "yes" answers.
// For the UI, we'll provide checkboxes and sum them up.
// For fields like orientation, naming, we will provide numeric inputs from 0 to max points.

export const MAX_ICE_ORIENTATION = 4;
export const MAX_ICE_NAMING = 3;
export const MAX_ICE_COMMANDS = 1;
export const MAX_ICE_WRITING = 1;
export const MAX_ICE_ATTENTION = 1;
export const TOTAL_MAX_ICE_SCORE = MAX_ICE_ORIENTATION + MAX_ICE_NAMING + MAX_ICE_COMMANDS + MAX_ICE_WRITING + MAX_ICE_ATTENTION;
