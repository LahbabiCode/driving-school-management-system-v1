<template>
  <div class="min-h-screen bg-gray-100 py-4">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b mb-4">
      <div class="max-w-4xl mx-auto px-4 py-3">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-xl font-bold text-gray-800">ورقة الإجابة الرقمية</h1>
            <p class="text-sm text-gray-600">امتحان: {{ examTitle }}</p>
          </div>
          <div class="text-left">
            <div class="text-sm text-gray-600">المتبقي</div>
            <div class="text-lg font-bold text-red-600">{{ timeRemaining }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4">
      <!-- معلومات الطالب -->
      <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="form-label">اسم الطالب</label>
            <input 
              v-model="studentInfo.name" 
              type="text" 
              class="form-input"
              placeholder="أدخل اسمك الكامل"
            >
          </div>
          <div>
            <label class="form-label">رقم الهوية</label>
            <input 
              v-model="studentInfo.idNumber" 
              type="text" 
              class="form-input"
              placeholder="رقم الهوية"
            >
          </div>
          <div>
            <label class="form-label">رقم المقعد</label>
            <input 
              v-model="studentInfo.seatNumber" 
              type="text" 
              class="form-input"
              placeholder="رقم المقعد"
            >
          </div>
        </div>
      </div>

      <!-- ورقة الإجابة -->
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">ورقة الإجابة</h2>
          <p class="text-gray-600">اختر الإجابة الصحيحة لكل سؤال</p>
        </div>

        <!-- Grid الأسئلة مثل الورقة التقليدية -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- العمود الأول: الأسئلة 1-25 -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-center bg-gray-50 py-2 rounded">الأسئلة 1 - 25</h3>
            <div 
              v-for="questionNum in 25" 
              :key="questionNum"
              class="question-row"
            >
              <div class="flex items-center justify-between">
                <span class="font-medium text-gray-700 w-12">{{ questionNum }}</span>
                <div class="flex space-x-2 space-x-reverse">
                  <button
                    v-for="option in ['أ', 'ب', 'ج', 'د']"
                    :key="option"
                    @click="selectAnswer(questionNum, option)"
                    :class="[
                      'answer-option',
                      answers[questionNum] === option ? 'selected' : ''
                    ]"
                  >
                    {{ option }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- العمود الثاني: الأسئلة 26-50 -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-center bg-gray-50 py-2 rounded">الأسئلة 26 - 50</h3>
            <div 
              v-for="questionNum in 25" 
              :key="questionNum + 25"
              class="question-row"
            >
              <div class="flex items-center justify-between">
                <span class="font-medium text-gray-700 w-12">{{ questionNum + 25 }}</span>
                <div class="flex space-x-2 space-x-reverse">
                  <button
                    v-for="option in ['أ', 'ب', 'ج', 'د']"
                    :key="option"
                    @click="selectAnswer(questionNum + 25, option)"
                    :class="[
                      'answer-option',
                      answers[questionNum + 25] === option ? 'selected' : ''
                    ]"
                  >
                    {{ option }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- أدوات إضافية -->
        <div class="mt-8 border-t pt-6">
          <div class="flex flex-wrap gap-4 justify-center">
            <button 
              @click="clearAllAnswers"
              class="btn-secondary"
            >
              مسح جميع الإجابات
            </button>
            <button 
              @click="showReview = !showReview"
              class="btn-primary"
            >
              مراجعة الإجابات
            </button>
            <button 
              @click="submitAnswers"
              class="btn-success"
              :disabled="!isFormValid"
            >
              تسليم الورقة
            </button>
          </div>
        </div>

        <!-- مراجعة الإجابات -->
        <div v-if="showReview" class="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 class="font-semibold mb-4">مراجعة الإجابات:</h3>
          <div class="grid grid-cols-5 md:grid-cols-10 gap-2">
            <div 
              v-for="questionNum in totalQuestions"
              :key="questionNum"
              :class="[
                'text-center p-2 rounded text-sm',
                answers[questionNum] ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
              ]"
            >
              {{ questionNum }}: {{ answers[questionNum] || 'لم يتم الإجابة' }}
            </div>
          </div>
          <div class="mt-4 text-sm text-gray-600">
            تم الإجابة على {{ answeredCount }} من {{ totalQuestions }} سؤال
          </div>
        </div>
      </div>
    </div>

    <!-- Modal تأكيد التسليم -->
    <div v-if="showSubmitModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold mb-4">تأكيد تسليم الورقة</h3>
        <p class="text-gray-600 mb-6">
          هل أنت متأكد من تسليم ورقة الإجابة؟ لن تتمكن من التعديل بعد التسليم.
        </p>
        <div class="flex gap-4">
          <button @click="confirmSubmit" class="btn-success flex-1">
            تأكيد التسليم
          </button>
          <button @click="showSubmitModal = false" class="btn-secondary flex-1">
            إلغاء
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../../main.js'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const examId = route.params.examId
const examTitle = ref('امتحان نظري - رخصة القيادة')

// بيانات الطالب
const studentInfo = ref({
  name: '',
  idNumber: '',
  seatNumber: ''
})

// الإجابات
const answers = ref({})
const showReview = ref(false)
const showSubmitModal = ref(false)

// الوقت
const timeRemaining = ref('30:00')
const examTimer = ref(null)

// إعدادات الامتحان
const totalQuestions = 50

const answeredCount = computed(() => {
  return Object.keys(answers.value).length
})

const isFormValid = computed(() => {
  return studentInfo.value.name && 
         studentInfo.value.idNumber && 
         answeredCount.value > 0
})

const selectAnswer = (questionNumber, option) => {
  answers.value[questionNumber] = option
}

const clearAllAnswers = () => {
  if (confirm('هل تريد مسح جميع الإجابات؟')) {
    answers.value = {}
  }
}

const submitAnswers = () => {
  if (!isFormValid.value) {
    alert('يرجى إكمال بيانات الطالب والإجابة على الأقل على سؤال واحد')
    return
  }
  showSubmitModal.value = true
}

const confirmSubmit = async () => {
  try {
    const submissionData = {
      studentInfo: studentInfo.value,
      answers: answers.value,
      examId: examId,
      submittedAt: new Date(),
      studentId: authStore.user?.uid,
      totalQuestions: totalQuestions,
      answeredQuestions: answeredCount.value
    }

    await setDoc(doc(db, 'submissions', `${examId}_${authStore.user?.uid}`), submissionData)
    
    alert('تم تسليم ورقة الإجابة بنجاح!')
    router.push('/student')
    
  } catch (error) {
    console.error('خطأ في تسليم الورقة:', error)
    alert('حدث خطأ في تسليم الورقة. يرجى المحاولة مرة أخرى.')
  }
  showSubmitModal.value = false
}

const startTimer = () => {
  let minutes = 30
  let seconds = 0
  
  examTimer.value = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        // انتهى الوقت
        alert('انتهى وقت الامتحان!')
        confirmSubmit()
        return
      }
      minutes--
      seconds = 59
    } else {
      seconds--
    }
    
    timeRemaining.value = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }, 1000)
}

const loadExistingAnswers = async () => {
  try {
    const submissionDoc = await getDoc(doc(db, 'submissions', `${examId}_${authStore.user?.uid}`))
    if (submissionDoc.exists()) {
      const data = submissionDoc.data()
      if (!data.submittedAt) { // إذا لم يتم التسليم بعد
        answers.value = data.answers || {}
        studentInfo.value = data.studentInfo || {}
      }
    }
  } catch (error) {
    console.error('خطأ في تحميل الإجابات السابقة:', error)
  }
}

onMounted(() => {
  startTimer()
  loadExistingAnswers()
  
  // حفظ تلقائي كل 30 ثانية
  setInterval(async () => {
    if (Object.keys(answers.value).length > 0) {
      try {
        await setDoc(doc(db, 'submissions', `${examId}_${authStore.user?.uid}`), {
          studentInfo: studentInfo.value,
          answers: answers.value,
          examId: examId,
          studentId: authStore.user?.uid,
          lastSaved: new Date()
        }, { merge: true })
      } catch (error) {
        console.error('خطأ في الحفظ التلقائي:', error)
      }
    }
  }, 30000)
})

onUnmounted(() => {
  if (examTimer.value) {
    clearInterval(examTimer.value)
  }
})
</script>