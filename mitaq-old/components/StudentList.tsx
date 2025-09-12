import React from 'react';
import { Student } from '../types';
import { StudentListItem } from './StudentListItem';
import { Card } from './ui/Card';

interface StudentListProps {
  students: Student[];
  selectedStudentId: number | null;
  onSelectStudent: (id: number) => void;
  onDeleteStudent: (id: number) => void;
  onAddStudent: () => void;
}

const UserPlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
);


export const StudentList: React.FC<StudentListProps> = ({ students, selectedStudentId, onSelectStudent, onDeleteStudent, onAddStudent }) => {
  return (
    <Card className="h-full flex flex-col">
        <div className="p-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">قائمة المتدربين ({students.length})</h2>
        </div>
        <div className="p-2 flex-grow overflow-y-auto">
            <ul className="space-y-2">
                {students.map(student => (
                    <StudentListItem
                        key={student.id}
                        student={student}
                        isSelected={student.id === selectedStudentId}
                        onSelect={onSelectStudent}
                        onDelete={onDeleteStudent}
                    />
                ))}
            </ul>
        </div>
        <div className="p-4 border-t">
            <button 
              onClick={onAddStudent}
              className="w-full bg-teal-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700 transition flex items-center justify-center gap-2">
                <UserPlusIcon />
                إضافة متدرب جديد
            </button>
        </div>
    </Card>
  );
};