import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Student, SkillStatus } from '../types';
import { Card } from './ui/Card';

interface DashboardSummaryProps {
  students: Student[];
}

const statusToValue = (status: SkillStatus): number => {
    switch(status) {
        case SkillStatus.Mastered: return 4;
        case SkillStatus.NeedsPractice: return 3;
        case SkillStatus.InProgress: return 2;
        case SkillStatus.NotStarted: return 1;
        default: return 0;
    }
};

const getStudentComparisonData = (students: Student[]) => {
    if (students.length === 0) return [];
    const categoryAverages = students[0]?.skillCategories.map(cat => {
        return {
            name: cat.name.replace(/\s/g, ' '), // Keep spaces for display
            ...students.reduce((acc, student) => {
                const studentCategory = student.skillCategories.find(sc => sc.id === cat.id);
                const avgScore = studentCategory 
                    ? studentCategory.skills.reduce((sum, skill) => sum + statusToValue(skill.status), 0) / (studentCategory.skills.length || 1)
                    : 0;
                acc[student.name] = avgScore;
                return acc;
            }, {} as {[key: string]: number})
        };
    }) || [];
    
    return categoryAverages;
};

const getOverallCategoryAverages = (students: Student[]) => {
    if (students.length === 0) return [];
    const categories = students[0]?.skillCategories.map(c => ({ id: c.id, name: c.name })) || [];
    
    return categories.map(cat => {
        let totalScore = 0;
        let totalSkills = 0;
        students.forEach(student => {
            const studentCategory = student.skillCategories.find(sc => sc.id === cat.id);
            if (studentCategory) {
                studentCategory.skills.forEach(skill => {
                    totalScore += statusToValue(skill.status);
                    totalSkills++;
                });
            }
        });
        return {
            name: cat.name,
            averageScore: totalSkills > 0 ? totalScore / totalSkills : 0,
        };
    });
};


const studentColors = ['#14b8a6', '#f97316', '#3b82f6', '#ec4899', '#8b5cf6'];
const readinessColors = ['#16a34a', '#3b82f6'];
const categoryColors = ['#34d399', '#fbbf24', '#60a5fa', '#c084fc'];


export const DashboardSummary: React.FC<DashboardSummaryProps> = ({ students }) => {
    const studentComparisonData = getStudentComparisonData(students);
    const overallCategoryData = getOverallCategoryAverages(students);
    const readyCount = students.filter(s => s.examReady).length;
    const inProgressCount = students.length - readyCount;
    const pieData = [
        { name: 'جاهزون للامتحان', value: readyCount },
        { name: 'قيد التدريب', value: inProgressCount },
    ];

    return (
        <div className="space-y-6 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 flex flex-col justify-center items-center">
                    <h3 className="text-lg font-bold text-gray-500 mb-2">إجمالي المتدربين</h3>
                    <p className="text-5xl font-extrabold text-teal-600">{students.length}</p>
                </Card>
                <Card className="p-6">
                    <h3 className="text-lg font-bold text-gray-700 mb-2 text-center">نظرة عامة</h3>
                    <ResponsiveContainer width="100%" height={120}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={60}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={readinessColors[index % readinessColors.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => [value, 'متدربين']} />
                            <Legend iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>
                <Card className="p-6 flex flex-col justify-center items-center">
                    <h3 className="text-lg font-bold text-gray-500 mb-2">جاهزون للامتحان</h3>
                    <p className="text-5xl font-extrabold text-green-600">{readyCount}</p>
                </Card>
                <Card className="p-6 flex flex-col justify-center items-center">
                    <h3 className="text-lg font-bold text-gray-500 mb-2">قيد التدريب</h3>
                    <p className="text-5xl font-extrabold text-blue-600">{inProgressCount}</p>
                </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <Card className="p-6">
                    <h3 className="text-lg font-bold text-gray-700 mb-4">مقارنة أداء المتدربين</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={studentComparisonData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" domain={[0, 4]} ticks={[1, 2, 3, 4]} tickFormatter={(val) => ['لم يبدأ', 'يتعلم', 'يمارس', 'متقن'][val-1]} />
                            <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Legend />
                            {students.map((student, index) => (
                                <Bar key={student.id} dataKey={student.name} fill={studentColors[index % studentColors.length]} />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
                 <Card className="p-6">
                    <h3 className="text-lg font-bold text-gray-700 mb-4">متوسط الأداء العام للفئات</h3>
                     <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={overallCategoryData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                             <CartesianGrid strokeDasharray="3 3" />
                             <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                             <YAxis type="number" domain={[0, 4]} ticks={[1, 2, 3, 4]} tickFormatter={(val) => ['لم يبدأ', 'يتعلم', 'يمارس', 'متقن'][val-1]} />
                             <Tooltip formatter={(value: number) => [value.toFixed(2), 'متوسط']} />
                             <Bar dataKey="averageScore">
                                {overallCategoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={categoryColors[index % categoryColors.length]} />
                                ))}
                            </Bar>
                         </BarChart>
                     </ResponsiveContainer>
                 </Card>
            </div>
        </div>
    );
};