# 🚗 منصة مدرسة الميثاق لتعليم السياقة

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/LahbabiCode/mitaq-school-platform)

منصة تعليمية تفاعلية لاختبار قواعد السياقة، مصممة خصيصاً لمدرسة الميثاق لتعليم القيادة.

## 🚀 النشر السريع على Vercel

1. **بناء المشروع:**
   ```bash
   npm install && npm run build
   ```

2. **النشر:**
   ```bash
   npx vercel --name mitaq-platform-2025
   ```

3. **إعداد متغيرات البيئة في Vercel:**
   ```
   GEMINI_API_KEY = your_api_key_here
   ```

## ✨ المميزات

- 🎯 40 سلسلة اختبار مختلفة
- 🤖 ذكاء اصطناعي بـ Google Gemini
- 📱 تصميم متجاوب
- 🔐 نظام آمن للنتائج
- 🎨 واجهة عربية بديهية
- **واجهة سهلة الاستخدام**: تصميم حديث ومتجاوب

## التشغيل المحلي

**المتطلبات المسبقة:** Node.js 18+

1. تثبيت التبعيات:
   ```bash
   npm install
   ```

2. إعداد متغيرات البيئة:
   - انسخ ملف `.env.example` إلى `.env`
   - أضف مفتاح Gemini API الخاص بك:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. تشغيل التطبيق:
   ```bash
   npm run dev
   ```

4. افتح المتصفح على: `http://localhost:5173`

## النشر على Vercel

### الطريقة الأولى: من خلال GitHub

1. ادفع الكود إلى GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/mitaq-driving-school.git
   git push -u origin main
   ```

2. اذهب إلى [Vercel Dashboard](https://vercel.com/dashboard)
3. اضغط "New Project"
4. اربط حساب GitHub واختر المستودع
5. أضف متغير البيئة `GEMINI_API_KEY` في إعدادات المشروع
6. اضغط Deploy

### الطريقة الثانية: Vercel CLI

1. تثبيت Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. تسجيل الدخول:
   ```bash
   vercel login
   ```

3. النشر:
   ```bash
   vercel --prod
   ```

4. إضافة متغير البيئة:
   ```bash
   vercel env add GEMINI_API_KEY
   ```

## إعدادات إضافية

### للحصول على Gemini API Key:
1. اذهب إلى [Google AI Studio](https://aistudio.google.com/)
2. أنشئ مفتاح API جديد
3. انسخ المفتاح وأضفه إلى ملف `.env`

### متغيرات البيئة المطلوبة:
- `GEMINI_API_KEY`: مفتاح Google Gemini API

## البنية التقنية

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **UI Components**: مكونات مخصصة
- **AI Integration**: Google Gemini API
- **Charts**: Recharts
- **Styling**: CSS Modules

## المساهمة

1. Fork المشروع
2. أنشئ فرع للميزة الجديدة (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى الفرع (`git push origin feature/amazing-feature`)
5. افتح Pull Request

## الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## الدعم الفني

للحصول على الدعم الفني، يرجى فتح issue في GitHub أو التواصل مع فريق التطوير.
