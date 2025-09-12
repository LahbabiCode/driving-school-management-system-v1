
import React from 'react';
import { SkillStatus } from '../types';

interface SkillStatusSelectorProps {
  currentStatus: SkillStatus;
  onChange: (newStatus: SkillStatus) => void;
}

const STATUS_OPTIONS: { status: SkillStatus; color: string; label: string }[] = [
  { status: SkillStatus.NotStarted, color: 'bg-gray-400', label: 'لم يبدأ' },
  { status: SkillStatus.InProgress, color: 'bg-blue-500', label: 'يتعلم' },
  { status: SkillStatus.NeedsPractice, color: 'bg-yellow-500', label: 'يحتاج ممارسة' },
  { status: SkillStatus.Mastered, color: 'bg-green-500', label: 'متقن' },
];

export const SkillStatusSelector: React.FC<SkillStatusSelectorProps> = ({ currentStatus, onChange }) => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {STATUS_OPTIONS.map(({ status, color, label }) => {
        const isSelected = currentStatus === status;
        return (
          <button
            key={status}
            onClick={() => onChange(status)}
            className={`px-3 py-1 text-sm rounded-full transition-all duration-200 text-white font-semibold flex items-center gap-2 ${color} ${
              isSelected ? 'ring-2 ring-offset-2 ring-teal-500' : 'opacity-60 hover:opacity-100'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};
