
import React from 'react';
import { CrsSymptoms } from '../types';
import { CRS_HYPOTENSION_OPTIONS, CRS_HYPOXIA_OPTIONS } from '../constants';
import { CheckboxInput, SelectInput } from './FormElements';
import Section from './Section';

interface CrsAssessmentProps {
  symptoms: CrsSymptoms;
  onSymptomsChange: <K extends keyof CrsSymptoms>(key: K, value: CrsSymptoms[K]) => void;
}

const CrsAssessment: React.FC<CrsAssessmentProps> = ({ symptoms, onSymptomsChange }) => {
  return (
    <Section title="Cytokine Release Syndrome (CRS) Assessment">
      <CheckboxInput
        id="fever"
        label="Fever (≥38°C) not attributable to any other cause?"
        checked={symptoms.fever}
        onChange={(checked) => onSymptomsChange('fever', checked)}
      />
      <SelectInput
        id="hypotension"
        label="Hypotension Status"
        value={symptoms.hypotension}
        onChange={(value) => onSymptomsChange('hypotension', value as CrsSymptoms['hypotension'])}
        options={CRS_HYPOTENSION_OPTIONS}
      />
      <SelectInput
        id="hypoxia"
        label="Hypoxia Status"
        value={symptoms.hypoxia}
        onChange={(value) => onSymptomsChange('hypoxia', value as CrsSymptoms['hypoxia'])}
        options={CRS_HYPOXIA_OPTIONS}
      />
    </Section>
  );
};

export default CrsAssessment;
