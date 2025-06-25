
import React from 'react';
import { IcansSymptoms, IceData } from '../types';
import { ICANS_LOC_OPTIONS, ICANS_SEIZURES_OPTIONS, ICANS_MOTOR_OPTIONS } from '../constants';
import { CheckboxInput, SelectInput } from './FormElements';
import IceScoreInput from './IceScoreInput';
import Section from './Section';

interface IcansAssessmentProps {
  symptoms: IcansSymptoms;
  onSymptomsChange: <K extends keyof IcansSymptoms>(key: K, value: IcansSymptoms[K]) => void;
  onIceDataChange: <K extends keyof IceData>(key: K, value: IceData[K]) => void;
}

const IcansAssessment: React.FC<IcansAssessmentProps> = ({ symptoms, onSymptomsChange, onIceDataChange }) => {
  const isIceDisabled = symptoms.levelOfConsciousness === 'unarousableNoResponse' || !symptoms.iceData.isAssessable;

  // Sync isAssessable with levelOfConsciousness
  React.useEffect(() => {
    if (symptoms.levelOfConsciousness === 'unarousableNoResponse' && symptoms.iceData.isAssessable) {
      onIceDataChange('isAssessable', false);
    } else if (symptoms.levelOfConsciousness !== 'unarousableNoResponse' && !symptoms.iceData.isAssessable) {
      // If LOC improves, but isAssessable was manually set to false, user needs to re-enable it.
      // This logic can be refined based on clinical workflow. For now, unarousable LOC forces ICE unassessable.
    }
  }, [symptoms.levelOfConsciousness, symptoms.iceData.isAssessable, onIceDataChange]);


  return (
    <Section title="ICANS Assessment (ASTCT)">
      <SelectInput
        id="levelOfConsciousness"
        label="Level of Consciousness (LOC)"
        value={symptoms.levelOfConsciousness}
        onChange={(value) => onSymptomsChange('levelOfConsciousness', value as IcansSymptoms['levelOfConsciousness'])}
        options={ICANS_LOC_OPTIONS}
      />
      
      <IceScoreInput 
        iceData={symptoms.iceData}
        onIceDataChange={onIceDataChange}
        disabled={isIceDisabled}
      />

      <SelectInput
        id="seizures"
        label="Seizures"
        value={symptoms.seizures}
        onChange={(value) => onSymptomsChange('seizures', value as IcansSymptoms['seizures'])}
        options={ICANS_SEIZURES_OPTIONS}
      />
      <SelectInput
        id="motorFindings"
        label="Motor Findings"
        value={symptoms.motorFindings}
        onChange={(value) => onSymptomsChange('motorFindings', value as IcansSymptoms['motorFindings'])}
        options={ICANS_MOTOR_OPTIONS}
      />
      <CheckboxInput
        id="raisedIcpOrPapilledema"
        label="Signs of Raised Intracranial Pressure (ICP) / Papilledema / Cerebral Edema?"
        checked={symptoms.raisedIcpOrPapilledema}
        onChange={(checked) => onSymptomsChange('raisedIcpOrPapilledema', checked)}
      />
    </Section>
  );
};

export default IcansAssessment;
