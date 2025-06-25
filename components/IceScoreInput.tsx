
import React from 'react';
import { IceData } from '../types';
import { NumericInput, CheckboxInput } from './FormElements';
import { MAX_ICE_ORIENTATION, MAX_ICE_NAMING, MAX_ICE_COMMANDS, MAX_ICE_WRITING, MAX_ICE_ATTENTION } from '../constants';

interface IceScoreInputProps {
  iceData: IceData;
  onIceDataChange: <K extends keyof IceData>(key: K, value: IceData[K]) => void;
  disabled: boolean; // To disable inputs if patient is unarousable
}

const IceScoreInput: React.FC<IceScoreInputProps> = ({ iceData, onIceDataChange, disabled }) => {

  const handleNumericChange = (field: keyof IceData, value: number, max: number) => {
    onIceDataChange(field, Math.min(Math.max(0, value), max) as never);
  };
  
  return (
    <div className="space-y-4 p-4 border border-slate-300 rounded-md bg-slate-50">
      <h3 className="text-lg font-medium text-slate-800">ICE Score Components (Total 10 points)</h3>
      <CheckboxInput
        id="isAssessable"
        label="Patient is assessable for ICE Score (i.e., not unarousable)?"
        checked={iceData.isAssessable}
        onChange={(checked) => onIceDataChange('isAssessable', checked)}
      />
      
      <NumericInput
        id="orientation"
        label={`Orientation (0-${MAX_ICE_ORIENTATION} points): Correctly state year, month, city, hospital? (1 pt each)`}
        value={iceData.orientation}
        onChange={(val) => handleNumericChange('orientation', val, MAX_ICE_ORIENTATION)}
        min={0}
        max={MAX_ICE_ORIENTATION}
        disabled={disabled || !iceData.isAssessable}
      />
      <NumericInput
        id="naming"
        label={`Naming (0-${MAX_ICE_NAMING} points): Name 3 objects (e.g., pen, button, chair)? (1 pt each)`}
        value={iceData.naming}
        onChange={(val) => handleNumericChange('naming', val, MAX_ICE_NAMING)}
        min={0}
        max={MAX_ICE_NAMING}
        disabled={disabled || !iceData.isAssessable}
      />
       <NumericInput
        id="followingCommands"
        label={`Following Commands (0-${MAX_ICE_COMMANDS} point): Follow simple command (e.g., "Show me 2 fingers")?`}
        value={iceData.followingCommands}
        onChange={(val) => handleNumericChange('followingCommands', val, MAX_ICE_COMMANDS)}
        min={0}
        max={MAX_ICE_COMMANDS}
        disabled={disabled || !iceData.isAssessable}
      />
      <NumericInput
        id="writing"
        label={`Writing (0-${MAX_ICE_WRITING} point): Write a standard sentence?`}
        value={iceData.writing}
        onChange={(val) => handleNumericChange('writing', val, MAX_ICE_WRITING)}
        min={0}
        max={MAX_ICE_WRITING}
        disabled={disabled || !iceData.isAssessable}
      />
      <NumericInput
        id="attention"
        label={`Attention (0-${MAX_ICE_ATTENTION} point): Count backwards from 100 by 10?`}
        value={iceData.attention}
        onChange={(val) => handleNumericChange('attention', val, MAX_ICE_ATTENTION)}
        min={0}
        max={MAX_ICE_ATTENTION}
        disabled={disabled || !iceData.isAssessable}
      />
    </div>
  );
};

export default IceScoreInput;
