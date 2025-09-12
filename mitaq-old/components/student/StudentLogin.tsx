import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

const SteeringWheelIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-teal-500 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="3"></circle>
        <line x1="12" y1="22" x2="12" y2="19"></line>
        <line x1="12" y1="5" x2="12" y2="2"></line>
        <line x1="3.22" y1="16.5" x2="5.12" y2="15.5"></line>
        <line x1="18.88" y1="8.5" x2="20.78" y2="7.5"></line>
    </svg>
);


export const StudentLogin: React.FC<{ onLogin: (name: string) => void }> = ({ onLogin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="flex items-center justify-center pt-16">
      <Card className="p-8 max-w-md w-full shadow-xl">
        <div className="text-center">
            <SteeringWheelIcon/>
            <h1 className="text-2xl font-extrabold text-gray-800">مرحباً بك في منصة التدريب</h1>
            <p className="text-gray-500 mt-2">الرجاء إدخال اسمك الكامل لبدء اختبار السلاسل</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
                 <label htmlFor="studentName" className="sr-only">الاسم الكامل</label>
                 <input 
                    id="studentName"
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="الاسم الكامل هنا..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-center text-lg"
                    required
                    aria-label="Student's full name"
                />
            </div>
            <Button type="submit" className="w-full text-lg">
                بــدأ التدريب
            </Button>
        </form>
      </Card>
    </div>
  );
};
