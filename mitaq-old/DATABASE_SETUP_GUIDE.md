# 🗄️ دليل إعداد قاعدة البيانات - منصة الميثاق

## خطوات إعداد قاعدة البيانات Supabase

### 1. إنشاء مشروع Supabase
- قم بزيارة [Supabase Dashboard](https://app.supabase.com)
- أنشئ مشروعاً جديداً
- احفظ URL و API Keys

### 2. تنفيذ SQL Schema
1. اذهب إلى **SQL Editor** في Supabase Dashboard
2. انسخ محتوى ملف `database/schema.sql`
3. الصق الكود في المحرر
4. اضغط **Run** لتنفيذ الكود

### 3. التحقق من الجداول
بعد تنفيذ SQL، ستجد الجداول التالية:
- `students` - معلومات الطلاب
- `test_results` - نتائج الاختبارات
- `skill_results` - نتائج تقييم المهارات

### 4. تحديث متغيرات البيئة
أضف هذه المتغيرات في ملف `.env`:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 5. اختبار الاتصال
- شغل المشروع محلياً: `npm run dev`
- جرب تسجيل طالب جديد
- تحقق من البيانات في Supabase Dashboard

## 🔧 استكشاف الأخطاء

### خطأ في الاتصال
- تأكد من صحة URL و API Key
- تحقق من تفعيل Row Level Security
- راجع سياسات الأمان في الجداول

### بيانات لا تظهر
- تحقق من تنفيذ SQL Schema بالكامل
- راجع الـ Network Tab في Developer Tools
- تأكد من متغيرات البيئة بادئة `VITE_`

## 📊 بنية قاعدة البيانات

### جدول Students
```sql
- id: UUID (Primary Key)
- name: VARCHAR(255)
- email: VARCHAR(255) UNIQUE
- phone: VARCHAR(20)
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

### جدول Test Results
```sql
- id: UUID (Primary Key)
- student_id: UUID (Foreign Key)
- series_number: INTEGER
- score: INTEGER
- total_questions: INTEGER
- passed: BOOLEAN
- answers: JSONB
- completed_at: TIMESTAMPTZ
```

### جدول Skill Results
```sql
- id: UUID (Primary Key)
- student_id: UUID (Foreign Key)
- skill_category: VARCHAR(100)
- skill_name: VARCHAR(255)
- status: VARCHAR(20) - 'passed', 'failed', 'pending'
- score: INTEGER
- notes: TEXT
```

## 🔐 الأمان

- **Row Level Security**: مفعل على جميع الجداول
- **السياسات**: تسمح بالقراءة والكتابة للجميع (يمكن تخصيصها)
- **التشفير**: جميع البيانات مشفرة في قاعدة البيانات

## 📱 الاستخدام في التطبيق

### إضافة طالب جديد
```typescript
const student = await supabaseService.createStudent({
  name: "اسم الطالب",
  email: "email@example.com",
  phone: "123456789"
});
```

### حفظ نتيجة اختبار
```typescript
const result = await supabaseService.saveTestResult({
  studentId: student.id,
  seriesNumber: 1,
  score: 35,
  totalQuestions: 40,
  passed: true,
  answers: {...},
  completedAt: new Date()
});
```

### تحديث نتيجة مهارة
```typescript
await supabaseService.saveSkillResult({
  studentId: student.id,
  skillCategory: "القيادة العملية",
  skillName: "ركن السيارة",
  status: "passed",
  score: 95
});
```

## ✅ المتطلبات النهائية
- [x] إنشاء مشروع Supabase
- [x] تنفيذ SQL Schema
- [x] تحديث متغيرات البيئة
- [x] اختبار الاتصال
- [x] التحقق من حفظ البيانات

## 🚀 النتيجة النهائية
بعد إتمام هذه الخطوات، ستعمل منصة الميثاق بالكامل مع:
- تخزين دائم للبيانات
- نظام مستخدمين متطور
- تتبع تقدم الطلاب
- إحصائيات شاملة
- أمان عالي للبيانات
