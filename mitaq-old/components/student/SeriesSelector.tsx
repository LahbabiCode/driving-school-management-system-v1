import React from 'react';
import { Card } from '../ui/Card';

interface SeriesSelectorProps {
  onSelectSeries: (seriesId: number) => void;
  completedSeries: number[];
}

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);


export const SeriesSelector: React.FC<SeriesSelectorProps> = ({ onSelectSeries, completedSeries }) => {
  return (
    <div>
        <Card className="p-4 sm:p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800">اختر سلسلة للبدء</h2>
            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
                {Array.from({ length: 40 }, (_, i) => i + 1).map(seriesId => {
                    const isCompleted = completedSeries.includes(seriesId);
                    return (
                        <button
                            key={seriesId}
                            onClick={() => onSelectSeries(seriesId)}
                            aria-label={`بدء السلسلة رقم ${seriesId}`}
                            className={`relative aspect-square flex items-center justify-center font-bold rounded-lg transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600
                                ${isCompleted 
                                    ? 'bg-green-500 border-2 border-green-600 text-white hover:bg-green-600' 
                                    : 'bg-white border-2 border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white'
                                }`}
                        >
                            <span className="z-10">{seriesId}</span>
                            {isCompleted && 
                                <div className="absolute top-1 right-1 text-white">
                                    <CheckCircleIcon />
                                </div>
                            }
                        </button>
                    )
                })}
            </div>
        </Card>
    </div>
  );
};