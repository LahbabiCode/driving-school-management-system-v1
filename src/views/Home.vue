<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">منصة الامتحانات الرقمية</h1>
            <span class="mr-3 text-gray-500">|</span>
            <span class="text-gray-600">مدرسة تعليم القيادة</span>
          </div>
          <nav class="flex space-x-4 space-x-reverse">
            <router-link to="/login" class="btn-primary">
              تسجيل الدخول
            </router-link>
          </nav>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center">
        <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          نظام الامتحانات 
          <span class="text-blue-600">الرقمية</span>
        </h1>
        <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          منصة حديثة لإجراء الامتحانات النظرية لرخصة القيادة بطريقة رقمية متطورة وآمنة
        </p>
        <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div class="rounded-md shadow">
            <router-link to="/login" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
              ابدأ الآن
            </router-link>
          </div>
        </div>
      </div>

      <!-- Features -->
      <div class="mt-20">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <!-- Feature 1 -->
          <div class="text-center">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
              <span class="text-2xl">📺</span>
            </div>
            <h3 class="mt-6 text-lg font-medium text-gray-900">عرض على الشاشة</h3>
            <p class="mt-2 text-base text-gray-500">
              عرض الأسئلة على شاشة التلفاز بشكل واضح ومنظم للطلاب
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="text-center">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
              <span class="text-2xl">📝</span>
            </div>
            <h3 class="mt-6 text-lg font-medium text-gray-900">ورقة إجابة رقمية</h3>
            <p class="mt-2 text-base text-gray-500">
              واجهة رقمية تحاكي ورقة الإجابة التقليدية بدقة عالية
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="text-center">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
              <span class="text-2xl">📊</span>
            </div>
            <h3 class="mt-6 text-lg font-medium text-gray-900">تقارير فورية</h3>
            <p class="mt-2 text-base text-gray-500">
              نتائج فورية وتقارير تفصيلية لأداء الطلاب
            </p>
          </div>
        </div>
      </div>

      <!-- How it works -->
      <div class="mt-20">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900">كيف يعمل النظام</h2>
          <p class="mt-4 text-lg text-gray-500">خطوات بسيطة لامتحان رقمي متطور</p>
        </div>

        <div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div class="text-center">
            <div class="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              <span class="text-blue-600 font-bold text-xl">1</span>
            </div>
            <h3 class="mt-4 text-lg font-medium">إعداد الامتحان</h3>
            <p class="mt-2 text-gray-500">المدير يقوم بإعداد الأسئلة وتفعيل الامتحان</p>
          </div>

          <div class="text-center">
            <div class="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              <span class="text-blue-600 font-bold text-xl">2</span>
            </div>
            <h3 class="mt-4 text-lg font-medium">عرض الأسئلة</h3>
            <p class="mt-2 text-gray-500">الأسئلة تظهر على شاشة التلفاز للطلاب</p>
          </div>

          <div class="text-center">
            <div class="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              <span class="text-blue-600 font-bold text-xl">3</span>
            </div>
            <h3 class="mt-4 text-lg font-medium">الإجابة الرقمية</h3>
            <p class="mt-2 text-gray-500">الطلاب يسجلون إجاباتهم في الورقة الرقمية</p>
          </div>

          <div class="text-center">
            <div class="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              <span class="text-blue-600 font-bold text-xl">4</span>
            </div>
            <h3 class="mt-4 text-lg font-medium">النتائج الفورية</h3>
            <p class="mt-2 text-gray-500">الحصول على النتائج والتقارير فوراً</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white mt-20">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <p class="text-gray-500">
            © 2025 منصة الامتحانات الرقمية. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Home page component
</script>