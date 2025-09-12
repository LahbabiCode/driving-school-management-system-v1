import React from 'react';

const SteeringWheelIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={`h-8 w-8 text-teal-500 ${className}`} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="3"></circle>
        <line x1="12" y1="22" x2="12" y2="19"></line>
        <line x1="12" y1="5" x2="12" y2="2"></line>
        <line x1="3.22" y1="16.5" x2="5.12" y2="15.5"></line>
        <line x1="18.88" y1="8.5" x2="20.78" y2="7.5"></line>
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md w-full p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3 group cursor-pointer">
          <SteeringWheelIcon className="transition-transform duration-300 ease-in-out group-hover:rotate-90" />
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">سيارة تعليم المثاق</h1>
            <p className="text-sm text-gray-500">إدارة: السيدة إيمان</p>
          </div>
        </div>
        <div className="text-left">
            <h2 className="text-lg font-bold text-teal-600">منصة تقييم المتدربين</h2>
        </div>
      </div>
    </header>
  );
};