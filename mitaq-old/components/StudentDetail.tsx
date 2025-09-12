
import React, { useState, useCallback } from 'react';
import { Student, SkillCategory, SkillStatus, Skill } from '../types';
import { getStudentSummary } from '../services/geminiService';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { SkillStatusSelector } from './SkillStatusSelector';
import ReactMarkdown from 'react-markdown';


interface StudentDetailProps {
  student: Student;
  onUpdateStudent: (updatedStudent: Student) => void;
}

const AISparkleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3L9.5 8.5L4 11L9.5 13.5L12 19L14.5 13.5L20 11L14.5 8.5L12 3z" />
        <path d="M5 21L7 16" />
        <path d="M17 16L19 21" />
    </svg>
);

const NoteIcon: React.FC<{ hasNote?: boolean }> = ({ hasNote }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
    </svg>
);


export const StudentDetail: React.FC<StudentDetailProps> = ({ student, onUpdateStudent }) => {
  const [summary, setSummary] = useState('');
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [editingNoteForSkillId, setEditingNoteForSkillId] = useState<string | null>(null);

  const handleSkillChange = (categoryId: string, skillId: string, newStatus: SkillStatus) => {
    const updatedCategories = student.skillCategories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          skills: category.skills.map(skill => 
            skill.id === skillId ? { ...skill, status: newStatus } : skill
          ),
        };
      }
      return category;
    });
    onUpdateStudent({ ...student, skillCategories: updatedCategories });
  };

  const handleSkillNoteChange = (categoryId: string, skillId: string, note: string) => {
    const updatedCategories = student.skillCategories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          skills: category.skills.map(skill => 
            skill.id === skillId ? { ...skill, notes: note } : skill
          ),
        };
      }
      return category;
    });
    onUpdateStudent({ ...student, skillCategories: updatedCategories });
  };


  const handleGenerateSummary = useCallback(async () => {
    setIsLoadingSummary(true);
    setSummary('');
    const result = await getStudentSummary(student);
    setSummary(result);
    setIsLoadingSummary(false);
  }, [student]);

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateStudent({ ...student, instructorNotes: event.target.value });
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="p-4 border-b flex items-center gap-4">
        <img src={student.avatarUrl} alt={student.name} className="w-20 h-20 rounded-full object-cover border-4 border-teal-100" />
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800">{student.name}</h2>
          <p className="text-gray-500">تاريخ الانضمام: {student.joinDate}</p>
        </div>
      </div>
      
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50/50 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-gray-700 mb-4">تقييم المهارات</h3>
          <div className="space-y-4">
            {student.skillCategories.map(category => (
              <div key={category.id} className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-bold text-teal-700 mb-3">{category.name}</h4>
                <div className="divide-y divide-gray-200">
                  {category.skills.map(skill => (
                    <div key={skill.id} className="py-3 first:pt-0 last:pb-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-gray-600 font-medium mb-2 sm:mb-0">{skill.name}</p>
                             <div className="flex items-center gap-2 shrink-0">
                                <SkillStatusSelector currentStatus={skill.status} onChange={(newStatus) => handleSkillChange(category.id, skill.id, newStatus)} />
                                <button
                                    onClick={() => setEditingNoteForSkillId(prev => prev === skill.id ? null : skill.id)}
                                    className={`p-1.5 rounded-full transition-colors ${editingNoteForSkillId === skill.id ? 'bg-teal-100 text-teal-700' : (skill.notes ? 'text-teal-600 hover:bg-gray-100' : 'text-gray-400 hover:bg-gray-100')}`}
                                    aria-label={`ملاحظات لمهارة ${skill.name}`}
                                >
                                    <NoteIcon hasNote={!!skill.notes} />
                                </button>
                            </div>
                        </div>
                        {editingNoteForSkillId === skill.id && (
                            <div className="mt-3">
                                <textarea
                                    value={skill.notes || ''}
                                    onChange={(e) => handleSkillNoteChange(category.id, skill.id, e.target.value)}
                                    placeholder="أضف ملاحظات لهذه المهارة..."
                                    className="w-full h-24 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                                    aria-label={`ملاحظات لمهارة ${skill.name}`}
                                    autoFocus
                                />
                            </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
            <h3 className="text-xl font-bold text-gray-700 mb-4">ملخص الأداء بالذكاء الاصطناعي</h3>
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <Button onClick={handleGenerateSummary} isLoading={isLoadingSummary}>
                    <AISparkleIcon />
                    {isLoadingSummary ? 'جاري التحليل...' : 'تحليل أداء المتدرب'}
                </Button>
                {summary && (
                     <div className="mt-4 prose prose-teal max-w-none text-right">
                        <ReactMarkdown children={summary.replace(/\n/g, '  \n')} />
                    </div>
                )}
            </div>
        </div>

        <div>
            <h3 className="text-xl font-bold text-gray-700 mb-4">ملاحظات المدرب</h3>
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <textarea
                    value={student.instructorNotes || ''}
                    onChange={handleNotesChange}
                    placeholder="أضف ملاحظاتك هنا حول تقدم الطالب، نقاط القوة، أو الأمور التي تحتاج إلى تركيز..."
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    aria-label="ملاحظات المدرب"
                />
            </div>
        </div>

      </div>
    </Card>
  );
};