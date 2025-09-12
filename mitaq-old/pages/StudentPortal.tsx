import React, { useState } from 'react';
import { StudentLogin } from '../components/student/StudentLogin';
import { SeriesSelector } from '../components/student/SeriesSelector';
import { ExamSheet } from '../components/student/ExamSheet';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useStudentArchives } from '../hooks/useStudentArchives';

const StudentHeader: React.FC<{studentName?: string | null, onLogout?: () => void}> = ({studentName, onLogout}) => (
    <header className="bg-white shadow-sm w-full p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="3"></circle>
                <line x1="12" y1="22" x2="12" y2="19"></line>
                <line x1="12" y1="5" x2="12" y2="2"></line>
                <line x1="3.22" y1="16.5" x2="5.12" y2="15.5"></line>
                <line x1="18.88" y1="8.5" x2="20.78" y2="7.5"></line>
            </svg>
            <h1 className="text-xl font-extrabold text-gray-800">سيارة تعليم المثاق</h1>
        </div>
        {studentName && onLogout && (
             <div className="flex items-center gap-4">
                <span className="font-medium">مرحباً, {studentName}</span>
                <button onClick={onLogout} className="text-sm font-semibold text-red-600 hover:underline">
                    خروج
                </button>
            </div>
        )}
      </div>
    </header>
);

export const StudentPortal: React.FC = () => {
    const [studentName, setStudentName] = useLocalStorage<string | null>('student-name', null);
    const [selectedSeries, setSelectedSeries] = useState<number | null>(null);
    const { getStudentResults } = useStudentArchives();

    const handleLogin = (name: string) => {
        setStudentName(name);
    };

    const handleLogout = () => {
        setStudentName(null);
        setSelectedSeries(null);
    };

    const handleSelectSeries = (seriesId: number) => {
        setSelectedSeries(seriesId);
    };
    
    const handleBackToSeries = () => {
        setSelectedSeries(null);
    };

    const studentResults = studentName ? getStudentResults(studentName) : {};
    const completedSeries = Object.keys(studentResults).map(key => parseInt(key.replace('series_', '')));

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <StudentHeader studentName={studentName} onLogout={handleLogout} />
            <main className="container mx-auto p-4 md:p-6">
                {!studentName ? (
                    <StudentLogin onLogin={handleLogin} />
                ) : !selectedSeries ? (
                    <SeriesSelector onSelectSeries={handleSelectSeries} completedSeries={completedSeries} />
                ) : (
                    <ExamSheet seriesId={selectedSeries} onBack={handleBackToSeries} studentName={studentName} />
                )}
            </main>
        </div>
    );
};