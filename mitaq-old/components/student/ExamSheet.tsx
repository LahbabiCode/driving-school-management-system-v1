import React, { useState, useMemo, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { SERIES_ANSWERS } from '../../seriesData';
import { useStudentArchives } from '../../hooks/useStudentArchives';

interface ExamSheetProps {
  seriesId: number;
  onBack: () => void;
  studentName: string;
}

const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);

const ResultIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ResetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120 12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 20l-1.5-1.5A9 9 0 004 12" />
    </svg>
);

export const ExamSheet: React.FC<ExamSheetProps> = ({ seriesId, onBack, studentName }) => {
    const { getStudentResults, saveStudentResult, clearStudentResult } = useStudentArchives();
    const [answers, setAnswers] = useState<{ [q: number]: number[] }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    useEffect(() => {
        const studentArchives = getStudentResults(studentName);
        const existingResult = studentArchives[`series_${seriesId}`];
        if (existingResult) {
            setAnswers(existingResult);
            setIsSubmitted(true);
        }
    }, [seriesId, studentName, getStudentResults]);

    const seriesData = useMemo(() => SERIES_ANSWERS.find(s => s.seriesId === seriesId), [seriesId]);

    const handleAnswerChange = (qNumber: number, answerValue: number) => {
        if (isSubmitted) return;
        setAnswers(prev => {
            const currentAnswers = prev[qNumber] || [];
            const newAnswers = currentAnswers.includes(answerValue)
                ? currentAnswers.filter(a => a !== answerValue)
                : [...currentAnswers, answerValue];
            return { ...prev, [qNumber]: newAnswers.sort() };
        });
    };

    const handleSubmit = () => {
        saveStudentResult(studentName, seriesId, answers);
        setIsSubmitted(true);
    };

    const handleReset = () => {
        if(window.confirm("هل أنت متأكد أنك تريد إعادة الاختبار؟ سيتم حذف نتيجتك الحالية.")) {
            clearStudentResult(studentName, seriesId);
            setAnswers({});
            setIsSubmitted(false);
        }
    };

    if (!seriesData) {
        return <p>حدث خطأ، لم يتم العثور على بيانات السلسلة.</p>;
    }

    const questions = seriesData.answers;
    const questionsCol1 = questions.slice(0, 20);
    const questionsCol2 = questions.slice(20);

    return (
        <Card className="shadow-xl">
            <div className="p-4 border-b flex justify-between items-center bg-white rounded-t-xl">
                <div>
                    <h2 className="text-2xl font-bold">السلسلة رقم: <span className="text-teal-600">{seriesId}</span></h2>
                    {isSubmitted && <p className="text-sm text-green-700 font-semibold mt-1">هذه هي النتيجة النهائية المسجلة لك.</p>}
                </div>
                <Button onClick={onBack} variant="secondary">
                    <BackIcon />
                    العودة
                </Button>
            </div>
            
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 bg-gray-50">
                 {/* Column 1 */}
                 <div className="space-y-2">
                    <div className="p-3 grid grid-cols-3 gap-4 font-bold text-gray-500 border-b-2">
                        <span>رقم السؤال</span>
                        <span className="col-span-2">الإجابة</span>
                    </div>
                    {questionsCol1.map(({ q }) => (
                         <QuestionRow 
                            key={q} 
                            qNumber={q} 
                            studentAnswer={answers[q] || []}
                            isSubmitted={isSubmitted}
                            onChange={handleAnswerChange}
                         />
                    ))}
                 </div>
                 {/* Column 2 */}
                 <div className="space-y-2">
                    <div className="p-3 grid grid-cols-3 gap-4 font-bold text-gray-500 border-b-2">
                        <span>رقم السؤال</span>
                        <span className="col-span-2">الإجابة</span>
                    </div>
                     {questionsCol2.map(({ q }) => (
                         <QuestionRow 
                            key={q} 
                            qNumber={q}
                            studentAnswer={answers[q] || []}
                            isSubmitted={isSubmitted}
                            onChange={handleAnswerChange}
                          />
                     ))}
                 </div>
            </div>
            <div className="p-4 border-t flex justify-center gap-4 bg-gray-100 rounded-b-xl">
                 {!isSubmitted ? (
                    <Button onClick={handleSubmit} className="w-full max-w-xs text-lg">
                        <ResultIcon />
                        عرض النتيجة النهائية
                    </Button>
                 ) : (
                     <Button onClick={handleReset} variant="secondary" className="w-full max-w-xs text-lg">
                        <ResetIcon />
                        إعادة الاختبار
                    </Button>
                 )}
            </div>
        </Card>
    );
};

// --- Question Row Sub-component ---

interface QuestionRowProps {
    qNumber: number;
    studentAnswer: number[];
    isSubmitted: boolean;
    onChange: (qNumber: number, answerValue: number) => void;
}

const QuestionRow: React.FC<QuestionRowProps> = ({ qNumber, studentAnswer, isSubmitted, onChange }) => {
    return (
        <div className={`p-3 rounded-lg grid grid-cols-3 gap-4 items-center transition-colors ${isSubmitted ? 'bg-gray-100' : 'bg-white'}`}>
            <div className="flex items-center gap-2">
                 <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-lg ${isSubmitted ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700'}`}>{qNumber}</span>
            </div>
            <div className="col-span-2 flex justify-start items-center gap-3">
                {[1, 2, 3, 4].map(opt => {
                    const isChecked = studentAnswer.includes(opt);
                    if (isSubmitted) {
                        return (
                             <div key={opt} className={`w-9 h-9 flex items-center justify-center rounded-full font-bold text-lg transition-colors ${isChecked ? 'bg-green-500 text-white shadow-md' : 'bg-gray-200 text-gray-500'}`}>
                                {opt}
                            </div>
                        )
                    }
                    return (
                        <label key={opt} className="flex items-center space-x-2 cursor-pointer p-1">
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => onChange(qNumber, opt)}
                                className="h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                            />
                            <span className="font-mono text-gray-800 text-lg">{opt}</span>
                        </label>
                    );
                })}
            </div>
        </div>
    )
}