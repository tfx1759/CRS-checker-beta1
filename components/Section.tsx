
import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, className }) => {
  return (
    <div className={`bg-white shadow-xl rounded-lg p-6 my-6 ${className}`}>
      <h2 className="text-2xl font-semibold text-sky-700 mb-6 border-b-2 border-sky-200 pb-2">{title}</h2>
      {children}
    </div>
  );
};

export default Section;
