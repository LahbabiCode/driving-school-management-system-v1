# 🎓 منصة الامتحانات الرقمية لمدارس تعليم القيادة

منصة حديثة ومتطورة لإجراء الامتحانات النظرية لرخصة القيادة بطريقة رقمية آمنة وفعالة.

## ✨ المميزات الرئيسية

### 📺 شاشة العرض للتلفاز
- عرض الأسئلة على شاشة كبيرة بتصميم واضح ومنظم
- تحكم كامل في عرض الأسئلة من قبل المشرف
- عداد وقت تفاعلي ومعلومات الامتحان

### 📝 ورقة الإجابة الرقمية
- واجهة تحاكي ورقة الإجابة التقليدية بدقة
- شبكة أسئلة من 1-50 مع خيارات أ، ب، ج، د
- حفظ تلقائي للإجابات
- مراجعة شاملة قبل التسليم

### 👨‍💼 لوحة تحكم المدير
- إدارة شاملة للامتحانات والأسئلة
- تتبع حالة الطلاب والنتائج
- تقارير مفصلة وإحصائيات
- تحكم في تفعيل/إلغاء تفعيل الامتحانات

### 🔐 نظام أمان متقدم
- مصادقة آمنة للمستخدمين
- تخزين دائم وموثوق في Firebase
- حماية البيانات وصلاحيات الوصول

## 🛠️ التقنيات المستخدمة

- **Vue.js 3** - إطار العمل الأساسي
- **Firebase** - قاعدة البيانات السحابية
- **Tailwind CSS** - التصميم والواجهة
- **Pinia** - إدارة الحالة
- **Vue Router** - التوجيه

## 🚀 التثبيت والإعداد

### المتطلبات
- Node.js (الإصدار 16 أو أحدث)
- npm أو yarn
- حساب Firebase

### خطوات التثبيت

1. **استنساخ المشروع**
```bash
git clone [repository-url]
cd driving-school-management-system
```

2. **تثبيت التبعيات**
```bash
npm install
```

3. **إعداد Firebase**
   - إنشاء مشروع جديد في [Firebase Console](https://console.firebase.google.com/)
   - تفعيل Authentication و Firestore Database
   - نسخ إعدادات Firebase

4. **إعداد متغيرات البيئة**
```bash
cp .env.example .env
```
ثم تحديث الملف `.env` بإعدادات Firebase الخاصة بك:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

5. **تشغيل المشروع في وضع التطوير**
```bash
npm run dev
```

6. **بناء المشروع للإنتاج**
```bash
npm run build
```

## 📱 واجهات النظام

### 🏠 الصفحة الرئيسية
- عرض معلومات النظام والمميزات
- روابط تسجيل الدخول

### 🔑 تسجيل الدخول
- واجهة آمنة لتسجيل الدخول
- دعم أدوار المستخدمين (مدير/طالب)

### 👨‍🎓 واجهة الطالب
- عرض الامتحانات المتاحة
- ورقة الإجابة الرقمية
- عرض النتائج السابقة

### 📺 شاشة العرض
- عرض الأسئلة للطلاب
- أدوات تحكم للمشرف
- عداد وقت تفاعلي

### 👨‍💼 لوحة تحكم المدير
- **الرئيسية**: إحصائيات سريعة ونظرة عامة
- **إدارة الامتحانات**: إنشاء وتعديل الامتحانات
- **بنك الأسئلة**: إدارة الأسئلة والخيارات
- **إدارة الطلاب**: متابعة الطلاب ونتائجهم
- **التقارير**: تحليل مفصل للأداء

## 🎯 كيفية الاستخدام

### للمدير:
1. تسجيل الدخول إلى لوحة التحكم
2. إنشاء امتحان جديد وإضافة الأسئلة
3. تفعيل الامتحان
4. عرض الامتحان على شاشة التلفاز
5. متابعة النتائج والتقارير

### للطالب:
1. تسجيل الدخول إلى النظام
2. اختيار الامتحان المتاح
3. ملء بيانات الطالب
4. الإجابة على الأسئلة باستخدام الورقة الرقمية
5. مراجعة الإجابات وتسليم الورقة

## 🔧 إعداد قاعدة البيانات

### مجموعات Firestore المطلوبة:

1. **users** - معلومات المستخدمين
2. **exams** - بيانات الامتحانات
3. **questions** - بنك الأسئلة
4. **submissions** - إجابات الطلاب
5. **exam_sessions** - جلسات الامتحان النشطة

### قواعد الأمان Firestore:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // السماح للمدراء بالوصول لجميع البيانات
    match /{document=**} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // السماح للطلاب بقراءة الامتحانات النشطة
    match /exams/{examId} {
      allow read: if request.auth != null && resource.data.status == 'active';
    }
    
    // السماح للطلاب بكتابة إجاباتهم
    match /submissions/{submissionId} {
      allow read, write: if request.auth != null && 
        resource.data.studentId == request.auth.uid;
    }
  }
}
```

## 🌐 النشر على Netlify

1. **ربط المشروع بـ Git**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin [your-repository-url]
git push -u origin main
```

2. **إعداد Netlify**
   - إنشاء حساب على [Netlify](https://netlify.com)
   - ربط المستودع
   - إعداد أوامر البناء:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`

3. **إعداد متغيرات البيئة في Netlify**
   - الذهاب إلى Site Settings > Environment variables
   - إضافة جميع متغيرات Firebase

4. **إعداد Redirects للـ SPA**
إنشاء ملف `public/_redirects`:
```
/*    /index.html   200
```

## 🛡️ الأمان والخصوصية

- جميع البيانات محمية بقواعد أمان Firebase
- تشفير الاتصالات باستخدام HTTPS
- صلاحيات محددة لكل نوع مستخدم
- حفظ تلقائي لمنع فقدان البيانات

## 📞 الدعم والمساعدة

للحصول على المساعدة أو الإبلاغ عن مشاكل:
- إنشاء Issue في GitHub
- التواصل مع فريق التطوير

## 📄 الترخيص

هذا المشروع مرخص تحت [MIT License](LICENSE)

---

**تم تطوير هذه المنصة خصيصاً لمدارس تعليم القيادة لتوفير تجربة امتحان رقمية حديثة وآمنة**