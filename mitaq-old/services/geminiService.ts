
import { GoogleGenAI } from "@google/genai";
import { Student, SkillCategory, Skill } from '../types';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

console.log('Gemini API Key check:', {
  hasApiKey: !!apiKey,
  keyPrefix: apiKey ? apiKey.substring(0, 10) + '...' : 'undefined'
});

if (!apiKey) {
  console.warn("Gemini API key not found in environment variables");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "AIzaSyCaVfFnO5lgBcx2HngIti7_IQKYhGP1Ng0" });

const formatStudentSkillsForPrompt = (categories: SkillCategory[]): string => {
  return categories.map(category => {
    const skillsSummary = category.skills.map(skill => `  - ${skill.name}: ${skill.status}`).join('\n');
    return `${category.name}:\n${skillsSummary}`;
  }).join('\n\n');
};

export const getStudentSummary = async (student: Student): Promise<string> => {
  // Mock response if the API key is the mock key
  if (!apiKey || apiKey === "mock-api-key-for-local-dev") {
    return new Promise(resolve => setTimeout(() => {
        const summary = `
        **ملخص أداء الطالب: ${student.name}**

        **نقاط القوة:**
        - يظهر ${student.name} تحكمًا جيدًا في أساسيات السيارة، خاصة في تشغيل المحرك بسلاسة.
        - يبدو واثقًا عند التعامل مع المناورات البسيطة مثل الرجوع للخلف.

        **نقاط تحتاج إلى تحسين:**
        - يحتاج ${student.name} إلى المزيد من التدريب على الركن الموازي، حيث لا يزال يجد صعوبة في تقدير المسافات.
        - يجب التركيز على قواعد السير في المدارات (Rond-point) لضمان اتخاذ القرار الصحيح دائمًا.
        - القيادة في الازدحام لا تزال تشكل تحديًا، خاصة فيما يتعلق بالحفاظ على مسافة الأمان.

        **توصية:**
        - تكثيف الحصص التدريبية التي تركز على الركن بأنواعه والقيادة في ظروف المدينة المزدحمة. الطالب يظهر تقدمًا واعدًا ويمكن أن يكون جاهزًا للامتحان بعد معالجة هذه النقاط.
        `;
        resolve(summary);
    }, 1500));
  }

  const skillsData = formatStudentSkillsForPrompt(student.skillCategories);

  const prompt = `
    أنت مساعد خبير لمدربي تعليم السياقة في المغرب. اسم المدرسة هو "سيارة تعليم المثاق" والمديرة هي "السيدة ايمان".
    مهمتك هي تحليل تقييم أداء الطالب وتقديم ملخص احترافي وموجز باللغة العربية. يجب أن يكون الملخص مشجعًا، مع تحديد نقاط القوة والجوانب التي تحتاج إلى تحسين.

    بيانات الطالب:
    - الاسم: ${student.name}
    - حالة الاستعداد للامتحان: ${student.examReady ? 'جاهز' : 'غير جاهز'}

    تقييم المهارات:
    ${skillsData}

    يرجى تقديم الملخص الآن.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating summary with Gemini API:", error);
    return "عذرًا، حدث خطأ أثناء إنشاء الملخص. يرجى المحاولة مرة أخرى.";
  }
};
