<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
    <div class="max-w-md w-full space-y-8 p-8">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          تسجيل الدخول
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          منصة الامتحانات الرقمية
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <div class="space-y-4">
          <div>
            <label class="form-label">البريد الإلكتروني</label>
            <input
              v-model="email"
              type="email"
              required
              class="form-input"
              placeholder="أدخل البريد الإلكتروني"
            />
          </div>

          <div>
            <label class="form-label">كلمة المرور</label>
            <input
              v-model="password"
              type="password"
              required
              class="form-input"
              placeholder="أدخل كلمة المرور"
            />
          </div>

          <div>
            <label class="form-label">نوع المستخدم</label>
            <select v-model="userType" class="form-input">
              <option value="admin">مدير</option>
              <option value="student">طالب</option>
            </select>
          </div>
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full btn-primary"
        >
          {{ loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول' }}
        </button>
      </form>

      <div class="text-center text-sm text-gray-600">
        <p>حسابات تجريبية:</p>
        <p>المدير: admin@test.com / admin123</p>
        <p>الطالب: student@test.com / student123</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('admin@test.com')
const password = ref('admin123')
const userType = ref('admin')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const result = await authStore.login(email.value, password.value)
    
    if (result.success) {
      if (authStore.user?.role === 'admin') {
        router.push('/admin')
      } else if (authStore.user?.role === 'student') {
        router.push('/student')
      } else {
        router.push('/')
      }
    } else {
      error.value = result.error || 'فشل تسجيل الدخول'
    }
  } catch (err) {
    error.value = 'حدث خطأ في تسجيل الدخول'
  }

  loading.value = false
}
</script>