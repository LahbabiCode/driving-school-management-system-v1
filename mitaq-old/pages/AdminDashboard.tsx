import React, { useState, useCallback } from 'react';
import { Header } from '../components/Header';
import { StudentList } from '../components/StudentList';
import { StudentDetail } from '../components/StudentDetail';
import { DashboardSummary } from '../components/DashboardSummary';
import { AddStudentModal } from '../components/AddStudentModal';
import { Student } from '../types';
import { INITIAL_STUDENTS_DATA, DRIVING_SKILLS_TEMPLATE } from '../constants';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AdminDashboard: React.FC = () => {
  const [students, setStudents] = useLocalStorage<Student[]>('driving-school-students', INITIAL_STUDENTS_DATA);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(students[0]?.id ?? null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectStudent = useCallback((id: number) => {
    setSelectedStudentId(id);
  }, []);

  const handleUpdateStudent = useCallback((updatedStudent: Student) => {
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  }, [setStudents]);

  const handleDeleteStudent = useCallback((id: number) => {
    const studentToDelete = students.find(s => s.id === id);
    if (!studentToDelete) return;

    if (window.confirm(`هل أنت متأكد أنك تريد حذف المتدرب "${studentToDelete.name}"؟`)) {
        setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
        
        if (selectedStudentId === id) {
            setSelectedStudentId(null);
        }
    }
  }, [students, selectedStudentId, setStudents]);

  const handleAddStudent = (name: string) => {
    const newStudent: Student = {
        id: Date.now(),
        name,
        avatarUrl: `https://picsum.photos/seed/${name.replace(/\s/g, '')}/200`,
        joinDate: new Date().toISOString().split('T')[0],
        examReady: false,
        skillCategories: JSON.parse(JSON.stringify(DRIVING_SKILLS_TEMPLATE)),
        instructorNotes: '',
    };
    setStudents(prev => [...prev, newStudent]);
    setIsModalOpen(false);
  };


  const selectedStudent = students.find(s => s.id === selectedStudentId);

  return (
    <>
        <div className="min-h-screen bg-gray-100 text-gray-900">
          <Header />
          <main className="container mx-auto p-4 md:p-6">
            <DashboardSummary students={students} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ height: 'calc(100vh - 280px)' }}>
              <div className="lg:col-span-1 h-full">
                <StudentList 
                  students={students} 
                  selectedStudentId={selectedStudentId} 
                  onSelectStudent={handleSelectStudent}
                  onDeleteStudent={handleDeleteStudent}
                  onAddStudent={() => setIsModalOpen(true)}
                />
              </div>
              <div className="lg:col-span-2 h-full">
                {selectedStudent ? (
                  <StudentDetail student={selectedStudent} onUpdateStudent={handleUpdateStudent} />
                ) : (
                  <div className="flex items-center justify-center h-full bg-white rounded-xl shadow-md">
                    <p className="text-gray-500 text-xl">الرجاء اختيار متدرب لعرض التفاصيل</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
        {isModalOpen && <AddStudentModal onClose={() => setIsModalOpen(false)} onAdd={handleAddStudent} />}
    </>
  );
};