import React from 'react';
import { Student } from '../types';

interface StudentListItemProps {
  student: Student;
  isSelected: boolean;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
}

const calculateOverallProgress = (student: Student): number => {
    const allSkills = student.skillCategories.flatMap(cat => cat.skills);
    if (allSkills.length === 0) return 0;

    const statusToValue: { [key: string]: number } = {
        'لم يبدأ بعد': 0,
        'قيد التعلم': 0.33,
        'يحتاج للممارسة': 0.66,
        'متقن': 1,
    };

    const totalValue = allSkills.reduce((sum, skill) => sum + (statusToValue[skill.status] || 0), 0);
    return (totalValue / allSkills.length) * 100;
};

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);


export const StudentListItem: React.FC<StudentListItemProps> = ({ student, isSelected, onSelect, onDelete }) => {
  const progress = calculateOverallProgress(student);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the li's onClick from firing
    onDelete(student.id);
  };

  return (
    <li
      onClick={() => onSelect(student.id)}
      className={`p-4 flex items-center gap-4 cursor-pointer transition-all duration-200 rounded-lg border-2 ${isSelected ? 'bg-teal-50 border-teal-500 shadow-lg' : 'bg-white hover:bg-gray-50 border-transparent'}`}
    >
      <img src={student.avatarUrl} alt={student.name} className="w-14 h-14 rounded-full object-cover border-2 border-gray-200" />
      <div className="flex-grow">
        <div className="flex justify-between items-baseline">
            <h3 className="font-bold text-gray-800 text-lg">{student.name}</h3>
            {student.examReady && (
                <span className="text-xs font-bold bg-green-100 text-green-800 px-2 py-1 rounded-full">جاهز للامتحان</span>
            )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <button 
        onClick={handleDeleteClick}
        className="p-2 rounded-full text-gray-400 hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
        aria-label={`حذف ${student.name}`}
      >
        <TrashIcon />
      </button>
    </li>
  );
};