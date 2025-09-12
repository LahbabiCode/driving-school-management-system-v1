import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface AddStudentModalProps {
    onClose: () => void;
    onAdd: (name: string) => void;
}

export const AddStudentModal: React.FC<AddStudentModalProps> = ({ onClose, onAdd }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onAdd(name.trim());
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            aria-modal="true"
            role="dialog"
        >
            <Card className="p-6 w-full max-w-md shadow-2xl relative">
                <button 
                    onClick={onClose} 
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                    aria-label="إغلاق"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-xl font-bold text-gray-800 mb-4">إضافة متدرب جديد</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="new-student-name" className="block text-sm font-medium text-gray-700 mb-2">
                        الاسم الكامل للمتدرب
                    </label>
                    <input
                        id="new-student-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="أدخل اسم المتدرب هنا..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                        required
                        autoFocus
                    />
                    <div className="mt-6 flex justify-end gap-3">
                        <Button type="button" variant="secondary" onClick={onClose}>
                            إلغاء
                        </Button>
                        <Button type="submit">
                            إضافة المتدرب
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};
