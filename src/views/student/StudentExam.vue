<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <!-- Header -->
    <div class="max-w-4xl mx-auto px-4">
      <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-800">مرحباً بك في منصة الامتحانات</h1>
            <p class="text-gray-600">اختر الامتحان المتاح للبدء</p>
          </div>
          <div class="text-left">
            <div class="text-sm text-gray-600">مرحباً، {{ authStore.user?.name || 'الطالب' }}</div>
            <button @click="logout" class="text-red-600 hover:text-red-700 text-sm">
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>

      <!-- Available Exams -->
      <div class="space-y-4">
        <h2 class="text-xl font-semibold text-gray-800">الامتحانات المتاحة</h2>
        
        <div v-if="availableExams.length === 0" class="bg-white rounded-lg shadow-sm border p-8 text-center">
          <div class="text-gray-500 text-lg">لا توجد امتحانات متاحة حالياً</div>
          <p class="text-gray-400 mt-2">يرجى انتظار المشرف لتفعيل الامتحان</p>
        </div>

        <div v-else v-for="exam in availableExams" :key="exam.id" class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-800">{{ exam.title }}</h3>
              <p class="text-gray-600 mt-1">{{ exam.description }}</p>
              <div class="flex items-center space-x-4 space-x-reverse mt-3 text-sm text-gray-500">
                <span class="flex items-center">
                  <span class="ml-1">⏱️</span>
                  {{ exam.duration }} دقيقة
                </span>
                <span class="flex items-center">
                  <span class="ml-1">❓</span>
                  {{ exam.totalQuestions || 50 }} سؤال
                </span>
                <span class="flex items-center">
                  <span class="ml-1">📊</span>
                  {{ getDifficultyText(exam.difficulty) }}
                </span>
              </div>
            </div>

            <div class="flex flex-col space-y-3">
              <router-link 
                :to="`/student/answer-sheet/${exam.id}`"
                class="btn-primary text-center"
              >
                بدء الامتحان
              </router-link>
              
              <button 
                @click="viewExamDetails(exam)"
                class="btn-secondary text-center"
              >
                تفاصيل الامتحان
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Previous Results -->
      <div class="mt-8 space-y-4">
        <h2 class="text-xl font-semibold text-gray-800">نتائجك السابقة</h2>
        
        <div v-if="previousResults.length === 0" class="bg-white rounded-lg shadow-sm border p-8 text-center">
          <div class="text-gray-500">لم تشارك في أي امتحان بعد</div>
        </div>

        <div v-else class="bg-white rounded-lg shadow-sm border">
          <div class="overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الامتحان
                  </th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    التاريخ
                  </th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    النتيجة
                  </th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="result in previousResults" :key="result.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ result.examTitle }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(result.submittedAt) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span :class="[
                      'font-bold',
                      result.score >= 70 ? 'text-green-600' : 'text-red-600'
                    ]">
                      {{ result.score }}%
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      result.score >= 70 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]">
                      {{ result.score >= 70 ? 'نجح' : 'لم ينجح' }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Exam Details Modal -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold mb-4">تفاصيل الامتحان</h3>
        <div v-if="selectedExam" class="space-y-3">
          <div>
            <strong>العنوان:</strong> {{ selectedExam.title }}
          </div>
          <div>
            <strong>الوصف:</strong> {{ selectedExam.description }}
          </div>
          <div>
            <strong>المدة:</strong> {{ selectedExam.duration }} دقيقة
          </div>
          <div>
            <strong>عدد الأسئلة:</strong> {{ selectedExam.totalQuestions || 50 }}
          </div>
          <div>
            <strong>مستوى الصعوبة:</strong> {{ getDifficultyText(selectedExam.difficulty) }}
          </div>
          <div>
            <strong>الفئة:</strong> {{ getCategoryText(selectedExam.category) }}
          </div>
        </div>
        <div class="flex justify-end space-x-3 space-x-reverse mt-6">
          <button @click="showDetailsModal = false" class="btn-secondary">
            إغلاق
          </button>
          <router-link 
            :to="`/student/answer-sheet/${selectedExam?.id}`"
            class="btn-primary"
          >
            بدء الامتحان
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useExamStore } from '../../stores/exam'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { db } from '../../main.js'

const router = useRouter()
const authStore = useAuthStore()
const examStore = useExamStore()

const showDetailsModal = ref(false)
const selectedExam = ref(null)
const previousResults = ref([])

const availableExams = computed(() => examStore.activeExams)

const getDifficultyText = (difficulty) => {
  const difficulties = {
    'easy': 'سهل',
    'medium': 'متوسط',
    'hard': 'صعب'
  }
  return difficulties[difficulty] || difficulty
}

const getCategoryText = (category) => {
  const categories = {
    'driving-theory': 'النظري - رخصة القيادة',
    'traffic-signs': 'إشارات المرور',
    'safety': 'السلامة المرورية',
    'general': 'عام'
  }
  return categories[category] || category
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date.toDate()).toLocaleString('ar-SA')
}

const viewExamDetails = (exam) => {
  selectedExam.value = exam
  showDetailsModal.value = true
}

const logout = async () => {
  if (confirm('هل تريد تسجيل الخروج؟')) {
    const result = await authStore.logout()
    if (result.success) {
      router.push('/login')
    }
  }
}

const loadPreviousResults = async () => {
  try {
    const resultsQuery = query(
      collection(db, 'submissions'),
      where('studentId', '==', authStore.user?.uid),
      where('submittedAt', '!=', null),
      orderBy('submittedAt', 'desc')
    )
    
    const resultsSnapshot = await getDocs(resultsQuery)
    previousResults.value = resultsSnapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        score: calculateScore(data)
      }
    })
  } catch (error) {
    console.error('خطأ في تحميل النتائج السابقة:', error)
  }
}

const calculateScore = (submission) => {
  const totalQuestions = submission.totalQuestions || 50
  const answeredQuestions = Object.keys(submission.answers || {}).length
  return Math.round((answeredQuestions / totalQuestions) * 100)
}

onMounted(() => {
  examStore.fetchExams()
  loadPreviousResults()
})
</script>