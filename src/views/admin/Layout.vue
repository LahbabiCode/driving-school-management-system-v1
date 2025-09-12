<template>
  <div class="admin-panel">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 right-0 z-50 sidebar">
      <div class="flex flex-col h-full">
        <!-- Logo -->
        <div class="flex items-center px-4 py-6 border-b border-gray-200">
          <h1 class="text-xl font-bold text-gray-800">لوحة التحكم</h1>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-4 py-6 space-y-2">
          <router-link
            to="/admin"
            class="nav-item"
            :class="{ 'active': $route.name === 'AdminDashboard' }"
          >
            <span class="text-xl ml-3">📊</span>
            الرئيسية
          </router-link>

          <router-link
            to="/admin/exams"
            class="nav-item"
            :class="{ 'active': $route.name === 'AdminExams' }"
          >
            <span class="text-xl ml-3">📝</span>
            إدارة الامتحانات
          </router-link>

          <router-link
            to="/admin/questions"
            class="nav-item"
            :class="{ 'active': $route.name === 'AdminQuestions' }"
          >
            <span class="text-xl ml-3">❓</span>
            بنك الأسئلة
          </router-link>

          <router-link
            to="/admin/students"
            class="nav-item"
            :class="{ 'active': $route.name === 'AdminStudents' }"
          >
            <span class="text-xl ml-3">👥</span>
            إدارة الطلاب
          </router-link>

          <router-link
            to="/admin/reports"
            class="nav-item"
            :class="{ 'active': $route.name === 'AdminReports' }"
          >
            <span class="text-xl ml-3">📈</span>
            التقارير والإحصائيات
          </router-link>
        </nav>

        <!-- User Info -->
        <div class="px-4 py-4 border-t border-gray-200">
          <div class="flex items-center">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-700">{{ authStore.user?.name || 'المدير' }}</p>
              <p class="text-xs text-gray-500">{{ authStore.user?.email }}</p>
            </div>
            <button @click="logout" class="text-red-600 hover:text-red-700">
              <span class="text-lg">🚪</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="mr-64">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">{{ pageTitle }}</h1>
              <p class="text-sm text-gray-500">{{ pageDescription }}</p>
            </div>
            <div class="flex items-center space-x-4 space-x-reverse">
              <div class="text-sm text-gray-600">
                {{ currentTime }}
              </div>
              <div class="flex items-center space-x-2 space-x-reverse">
                <span class="w-3 h-3 bg-green-500 rounded-full"></span>
                <span class="text-sm text-gray-700">متصل</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const currentTime = ref(new Date().toLocaleString('ar-SA'))

const pageTitle = computed(() => {
  const titles = {
    'AdminDashboard': 'لوحة التحكم الرئيسية',
    'AdminExams': 'إدارة الامتحانات',
    'AdminQuestions': 'بنك الأسئلة',
    'AdminStudents': 'إدارة الطلاب',
    'AdminReports': 'التقارير والإحصائيات'
  }
  return titles[route.name] || 'لوحة التحكم'
})

const pageDescription = computed(() => {
  const descriptions = {
    'AdminDashboard': 'نظرة عامة على النظام والإحصائيات',
    'AdminExams': 'إنشاء وإدارة الامتحانات',
    'AdminQuestions': 'إدارة الأسئلة وإضافة أسئلة جديدة',
    'AdminStudents': 'عرض وإدارة بيانات الطلاب',
    'AdminReports': 'تحليل النتائج والتقارير التفصيلية'
  }
  return descriptions[route.name] || 'إدارة النظام'
})

const logout = async () => {
  if (confirm('هل تريد تسجيل الخروج؟')) {
    const result = await authStore.logout()
    if (result.success) {
      router.push('/login')
    }
  }
}

const updateTime = () => {
  currentTime.value = new Date().toLocaleString('ar-SA')
}

onMounted(() => {
  const timer = setInterval(updateTime, 1000)
  
  onUnmounted(() => {
    clearInterval(timer)
  })
})
</script>