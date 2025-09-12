<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- إحصائيات سريعة -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="card">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span class="text-blue-600 text-xl">📝</span>
              </div>
            </div>
            <div class="mr-4 flex-1">
              <div class="text-sm font-medium text-gray-500">إجمالي الامتحانات</div>
              <div class="text-2xl font-bold text-gray-900">{{ stats.totalExams }}</div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span class="text-green-600 text-xl">✅</span>
              </div>
            </div>
            <div class="mr-4 flex-1">
              <div class="text-sm font-medium text-gray-500">الامتحانات النشطة</div>
              <div class="text-2xl font-bold text-gray-900">{{ stats.activeExams }}</div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span class="text-yellow-600 text-xl">👥</span>
              </div>
            </div>
            <div class="mr-4 flex-1">
              <div class="text-sm font-medium text-gray-500">عدد الطلاب</div>
              <div class="text-2xl font-bold text-gray-900">{{ stats.totalStudents }}</div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span class="text-purple-600 text-xl">❓</span>
              </div>
            </div>
            <div class="mr-4 flex-1">
              <div class="text-sm font-medium text-gray-500">بنك الأسئلة</div>
              <div class="text-2xl font-bold text-gray-900">{{ stats.totalQuestions }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- الامتحانات النشطة -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-lg font-semibold text-gray-800">الامتحانات النشطة</h3>
          </div>
          <div class="space-y-3">
            <div v-if="activeExams.length === 0" class="text-center py-8 text-gray-500">
              لا توجد امتحانات نشطة حالياً
            </div>
            <div v-else v-for="exam in activeExams" :key="exam.id" class="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <div class="font-medium text-gray-800">{{ exam.title }}</div>
                <div class="text-sm text-gray-600">{{ exam.duration }} دقيقة • {{ exam.totalQuestions }} سؤال</div>
              </div>
              <div class="flex space-x-2 space-x-reverse">
                <router-link 
                  :to="`/display/${exam.id}`" 
                  target="_blank"
                  class="text-blue-600 hover:text-blue-700 text-sm"
                >
                  عرض على الشاشة
                </router-link>
                <button @click="deactivateExam(exam.id)" class="text-red-600 hover:text-red-700 text-sm">
                  إيقاف
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- النتائج الأخيرة -->
        <div class="card">
          <div class="card-header">
            <h3 class="text-lg font-semibold text-gray-800">آخر النتائج</h3>
          </div>
          <div class="space-y-3">
            <div v-if="recentResults.length === 0" class="text-center py-8 text-gray-500">
              لا توجد نتائج حديثة
            </div>
            <div v-else v-for="result in recentResults" :key="result.id" class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <div class="font-medium text-gray-800">{{ result.studentName }}</div>
                <div class="text-sm text-gray-600">{{ result.examTitle }}</div>
              </div>
              <div class="text-left">
                <div :class="[
                  'text-lg font-bold',
                  result.score >= 70 ? 'text-green-600' : 'text-red-600'
                ]">
                  {{ result.score }}%
                </div>
                <div class="text-xs text-gray-500">{{ formatDate(result.submittedAt) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- إحصائيات تفصيلية -->
      <div class="card">
        <div class="card-header">
          <h3 class="text-lg font-semibold text-gray-800">إحصائيات الأداء</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600">{{ averageScore }}%</div>
            <div class="text-sm text-gray-600">متوسط الدرجات</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600">{{ passRate }}%</div>
            <div class="text-sm text-gray-600">نسبة النجاح</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-purple-600">{{ completionRate }}%</div>
            <div class="text-sm text-gray-600">نسبة الإكمال</div>
          </div>
        </div>
      </div>

      <!-- إجراءات سريعة -->
      <div class="card">
        <div class="card-header">
          <h3 class="text-lg font-semibold text-gray-800">إجراءات سريعة</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <router-link to="/admin/exams" class="btn-primary text-center">
            إنشاء امتحان جديد
          </router-link>
          <router-link to="/admin/questions" class="btn-secondary text-center">
            إضافة أسئلة
          </router-link>
          <router-link to="/admin/students" class="btn-secondary text-center">
            إدارة الطلاب
          </router-link>
          <router-link to="/admin/reports" class="btn-secondary text-center">
            عرض التقارير
          </router-link>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AdminLayout from './Layout.vue'
import { useExamStore } from '../../stores/exam'
import { useQuestionStore } from '../../stores/question'
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore'
import { db } from '../../main.js'

const examStore = useExamStore()
const questionStore = useQuestionStore()

const stats = ref({
  totalExams: 0,
  activeExams: 0,
  totalStudents: 0,
  totalQuestions: 0
})

const recentResults = ref([])
const averageScore = ref(0)
const passRate = ref(0)
const completionRate = ref(0)

const activeExams = computed(() => examStore.activeExams)

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date.toDate()).toLocaleString('ar-SA')
}

const deactivateExam = async (examId) => {
  if (confirm('هل تريد إيقاف هذا الامتحان؟')) {
    const result = await examStore.deactivateExam(examId)
    if (result.success) {
      loadStats()
    } else {
      alert('حدث خطأ في إيقاف الامتحان')
    }
  }
}

const loadStats = async () => {
  try {
    // تحميل إحصائيات الامتحانات
    await examStore.fetchExams()
    stats.value.totalExams = examStore.exams.length
    stats.value.activeExams = examStore.activeExams.length

    // تحميل إحصائيات الأسئلة
    await questionStore.fetchQuestions()
    stats.value.totalQuestions = questionStore.questions.length

    // تحميل إحصائيات الطلاب
    const studentsSnapshot = await getDocs(collection(db, 'users'))
    stats.value.totalStudents = studentsSnapshot.docs.filter(doc => 
      doc.data().role === 'student'
    ).length

    // تحميل النتائج الأخيرة
    const resultsQuery = query(
      collection(db, 'submissions'),
      where('submittedAt', '!=', null),
      orderBy('submittedAt', 'desc'),
      limit(5)
    )
    const resultsSnapshot = await getDocs(resultsQuery)
    recentResults.value = resultsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      score: calculateScore(doc.data())
    }))

    // حساب الإحصائيات
    calculatePerformanceStats()

  } catch (error) {
    console.error('خطأ في تحميل الإحصائيات:', error)
  }
}

const calculateScore = (submission) => {
  // حساب النتيجة بناءً على الإجابات الصحيحة
  const totalQuestions = submission.totalQuestions || 50
  const correctAnswers = Object.keys(submission.answers || {}).length
  return Math.round((correctAnswers / totalQuestions) * 100)
}

const calculatePerformanceStats = () => {
  if (recentResults.value.length === 0) return

  const scores = recentResults.value.map(result => result.score)
  
  // متوسط الدرجات
  averageScore.value = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
  
  // نسبة النجاح (أكثر من 70%)
  const passedCount = scores.filter(score => score >= 70).length
  passRate.value = Math.round((passedCount / scores.length) * 100)
  
  // نسبة الإكمال (تم الإجابة على جميع الأسئلة)
  const completedCount = recentResults.value.filter(result => 
    Object.keys(result.answers || {}).length === (result.totalQuestions || 50)
  ).length
  completionRate.value = Math.round((completedCount / recentResults.value.length) * 100)
}

onMounted(() => {
  loadStats()
})
</script>