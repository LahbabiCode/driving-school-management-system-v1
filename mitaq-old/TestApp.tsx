import React from 'react';

const TestApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">
          🚗 منصة مدرسة الميثاق - اختبار
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <p className="text-xl text-gray-700 mb-4">
            ✅ React يعمل بشكل طبيعي!
          </p>
          <p className="text-lg text-gray-600">
            إذا كنت ترى هذه الرسالة، فإن React والتطبيق يعملان بنجاح.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-green-800 mb-2">✅ عمل بنجاح</h3>
            <ul className="text-green-700 text-right">
              <li>• React 19</li>
              <li>• TypeScript</li>
              <li>• Vite</li>
              <li>• TailwindCSS</li>
            </ul>
          </div>
          
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-yellow-800 mb-2">⚠️ يحتاج فحص</h3>
            <ul className="text-yellow-700 text-right">
              <li>• متغيرات البيئة</li>
              <li>• Supabase اتصال</li>
              <li>• Gemini API</li>
              <li>• قاعدة البيانات</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8">
          <button 
            onClick={() => alert('الزر يعمل! ✅')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            اختبار التفاعل
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestApp;
