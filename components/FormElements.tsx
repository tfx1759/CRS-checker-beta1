import React from 'react';
import { SelectOption } from '../types';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id: string;
}

export const CheckboxInput: React.FC<CheckboxProps> = ({ label, checked, onChange, id }) => {
  return (
    <div className="flex items-center my-3">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
      />
      <label htmlFor={id} className="ml-3 text-sm font-medium text-gray-700">
        {label}
      </label>
    </div>
  );
};

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  id: string;
}

export const SelectInput: React.FC<SelectInputProps> = ({ label, value, onChange, options, id }) => {
  return (
    <div className="my-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md shadow-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

interface NumericInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  id: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean; // Added disabled prop
}

export const NumericInput: React.FC<NumericInputProps> = ({ label, value, onChange, id, min, max, step = 1, disabled = false }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(e.target.value, 10);
    if (!isNaN(numValue)) {
      onChange(numValue);
    } else if (e.target.value === '') {
        onChange(0); // Or handle as appropriate, e.g., keep last valid or set to min
    }
  };
  
  return (
    <div className="my-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled} // Apply disabled prop
        className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md shadow-sm disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
      />
    </div>
  );
};