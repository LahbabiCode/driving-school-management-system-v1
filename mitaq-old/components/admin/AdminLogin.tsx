import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
}

const SteeringWheelIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-teal-500 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="3"></circle>
        <line x1="12" y1="22" x2="12" y2="19"></line>
        <line x1="12" y1="5" x2="12" y2="2"></line>
        <line x1="3.22" y1="16.5" x2="5.12" y2="15.5"></line>
        <line x1="18.88" y1="8.5" x2="20.78" y2="7.5"></line>
    </svg>
);

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'iman') {
      setError('');
      onLogin(true);
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
      onLogin(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="p-8 w-full max-w-sm shadow-2xl">
            <SteeringWheelIcon/>
            <h2 className="text-2xl font-bold text-center text-gray-800">لوحة تحكم المدير</h2>
            <p className="text-center text-sm text-gray-500 mt-1">خاص بمدرسة المثاق للسياقة</p>
            <form onSubmit={handleLogin} className="mt-8 space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">اسم المستخدم</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                        required
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">كلمة المرور</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                        required
                    />
                </div>
                {error && <p className="text-red-500 text-sm text-center pt-2">{error}</p>}
                <Button type="submit" className="w-full !mt-6">
                    تسجيل الدخول
                </Button>
            </form>
        </Card>
    </div>
  );
};
