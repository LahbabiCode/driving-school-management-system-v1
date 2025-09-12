<template>
  <div class="display-screen">
    <!-- Header شاشة العرض -->
    <div class="bg-gray-800 border-b border-gray-700 p-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-4 space-x-reverse">
          <h1 class="text-2xl font-bold">امتحان نظري - رخصة القيادة</h1>
          <span class="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
            مباشر
          </span>
        </div>
        <div class="text-left">
          <div class="text-lg font-bold">{{ currentTime }}</div>
          <div class="text-sm text-gray-300">الوقت المتبقي: {{ timeRemaining }}</div>
        </div>
      </div>
    </div>

    <!-- منطقة عرض السؤال الرئيسية -->
    <div class="question-display">
      <div v-if="currentQuestion" class="animate-fade-in">
        <!-- رقم السؤال -->
        <div class="text-center mb-8">
          <span class="bg-blue-600 text-white px-6 py-3 rounded-full text-3xl font-bold">
            السؤال {{ currentQuestionNumber }}
          </span>
        </div>

        <!-- نص السؤال -->
        <div class="question-text">
          {{ currentQuestion.text }}
        </div>

        <!-- صورة السؤال (إن وجدت) -->
        <div v-if="currentQuestion.image" class="text-center mb-8">
          <img 
            :src="currentQuestion.image" 
            :alt="'صورة السؤال ' + currentQuestionNumber"
            class="max-w-2xl max-h-96 mx-auto rounded-lg shadow-lg"
          >
        </div>

        <!-- خيارات الإجابة -->
        <div class="question-options">
          <div 
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            class="option-display"
          >
            <div class="flex items-center space-x-4 space-x-reverse">
              <span class="text-2xl font-bold text-blue-400">
                {{ ['أ', 'ب', 'ج', 'د'][index] }}
              </span>
              <span class="text-xl">{{ option }}</span>
            </div>
          </div>
        </div>

        <!-- تعليمات -->
        <div class="text-center mt-12">
          <div class="bg-gray-800 inline-block px-6 py-3 rounded-lg">
            <p class="text-lg text-gray-300">
              اختر الإجابة الصحيحة في ورقة الإجابة الخاصة بك
            </p>
          </div>
        </div>
      </div>

      <!-- شاشة الانتظار -->
      <div v-else-if="!examStarted" class="text-center">
        <div class="text-6xl mb-8">⏰</div>
        <h2 class="text-4xl font-bold mb-4">الامتحان سيبدأ قريباً</h2>
        <p class="text-xl text-gray-300 mb-8">يرجى التأكد من ورقة الإجابة الخاصة بك</p>
        <div class="bg-gray-800 inline-block px-8 py-4 rounded-lg">
          <p class="text-lg">في انتظار بدء الامتحان من قبل المشرف</p>
        </div>
      </div>

      <!-- شاشة انتهاء الامتحان -->
      <div v-else-if="examEnded" class="text-center">
        <div class="text-6xl mb-8">✅</div>
        <h2 class="text-4xl font-bold mb-4">انتهى الامتحان</h2>
        <p class="text-xl text-gray-300 mb-8">شكراً لكم على المشاركة</p>
        <div class="bg-gray-800 inline-block px-8 py-4 rounded-lg">
          <p class="text-lg">يرجى تسليم أوراق الإجابة للمشرف</p>
        </div>
      </div>
    </div>

    <!-- Footer معلومات إضافية -->
    <div class="bg-gray-800 border-t border-gray-700 p-4">
      <div class="flex justify-between items-center text-sm text-gray-300">
        <div class="flex items-center space-x-6 space-x-reverse">
          <span>عدد الأسئلة: {{ totalQuestions }}</span>
          <span>وقت الامتحان: {{ examDuration }} دقيقة</span>
        </div>
        <div class="flex items-center space-x-4 space-x-reverse">
          <span>السؤال {{ currentQuestionNumber }} من {{ totalQuestions }}</span>
          <div class="w-32 bg-gray-700 rounded-full h-2">
            <div 
              class="bg-blue-600 h-2 rounded-full transition-all duration-300"
              :style="{ width: (currentQuestionNumber / totalQuestions * 100) + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- أدوات التحكم للمشرف (مخفية عن الطلاب) -->
    <div 
      v-if="showControls" 
      class="fixed bottom-4 left-4 bg-gray-800 rounded-lg p-4 border border-gray-600"
    >
      <div class="flex space-x-2 space-x-reverse">
        <button 
          @click="previousQuestion"
          :disabled="currentQuestionNumber <= 1"
          class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded text-sm"
        >
          السابق
        </button>
        <button 
          @click="nextQuestion"
          :disabled="currentQuestionNumber >= totalQuestions"
          class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded text-sm"
        >
          التالي
        </button>
        <button 
          @click="togglePause"
          class="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm"
        >
          {{ isPaused ? 'استئناف' : 'إيقاف مؤقت' }}
        </button>
        <button 
          @click="endExam"
          class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
        >
          إنهاء الامتحان
        </button>
      </div>
    </div>

    <!-- زر إظهار/إخفاء التحكم -->
    <button 
      @click="showControls = !showControls"
      class="fixed top-4 left-4 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full opacity-50 hover:opacity-100 transition-opacity"
      title="أدوات التحكم"
    >
      ⚙️
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../main.js'

const route = useRoute()
const examId = route.params.examId

// حالة الامتحان
const examData = ref(null)
const questions = ref([])
const currentQuestionNumber = ref(1)
const examStarted = ref(false)
const examEnded = ref(false)
const isPaused = ref(false)
const showControls = ref(false)

// الوقت
const currentTime = ref(new Date().toLocaleTimeString('ar-SA'))
const timeRemaining = ref('30:00')
const examTimer = ref(null)
const clockTimer = ref(null)

const currentQuestion = computed(() => {
  return questions.value[currentQuestionNumber.value - 1] || null
})

const totalQuestions = computed(() => {
  return questions.value.length
})

const examDuration = computed(() => {
  return examData.value?.duration || 30
})

const nextQuestion = async () => {
  if (currentQuestionNumber.value < totalQuestions.value) {
    currentQuestionNumber.value++
    await updateExamState()
  }
}

const previousQuestion = async () => {
  if (currentQuestionNumber.value > 1) {
    currentQuestionNumber.value--
    await updateExamState()
  }
}

const togglePause = async () => {
  isPaused.value = !isPaused.value
  await updateExamState()
}

const endExam = async () => {
  if (confirm('هل تريد إنهاء الامتحان؟')) {
    examEnded.value = true
    await updateExamState()
  }
}

const updateExamState = async () => {
  try {
    await updateDoc(doc(db, 'exam_sessions', examId), {
      currentQuestion: currentQuestionNumber.value,
      isStarted: examStarted.value,
      isEnded: examEnded.value,
      isPaused: isPaused.value,
      lastUpdated: new Date()
    })
  } catch (error) {
    console.error('خطأ في تحديث حالة الامتحان:', error)
  }
}

const startExamTimer = () => {
  let minutes = examDuration.value
  let seconds = 0
  
  examTimer.value = setInterval(() => {
    if (isPaused.value) return
    
    if (seconds === 0) {
      if (minutes === 0) {
        // انتهى الوقت
        endExam()
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

const startClock = () => {
  clockTimer.value = setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString('ar-SA')
  }, 1000)
}

const loadExam = async () => {
  try {
    // مراقبة تغييرات الامتحان في الوقت الفعلي
    const unsubscribe = onSnapshot(doc(db, 'exam_sessions', examId), (doc) => {
      if (doc.exists()) {
        const data = doc.data()
        examData.value = data
        questions.value = data.questions || []
        currentQuestionNumber.value = data.currentQuestion || 1
        examStarted.value = data.isStarted || false
        examEnded.value = data.isEnded || false
        isPaused.value = data.isPaused || false
        
        if (examStarted.value && !examTimer.value) {
          startExamTimer()
        }
      }
    })
    
    return unsubscribe
  } catch (error) {
    console.error('خطأ في تحميل الامتحان:', error)
  }
}

onMounted(async () => {
  startClock()
  const unsubscribe = await loadExam()
  
  // تنظيف المراقب عند إلغاء تحميل المكون
  onUnmounted(() => {
    if (unsubscribe) unsubscribe()
    if (examTimer.value) clearInterval(examTimer.value)
    if (clockTimer.value) clearInterval(clockTimer.value)
  })
})

// التنقل بلوحة المفاتيح للمشرف
onMounted(() => {
  const handleKeyPress = (event) => {
    if (!showControls.value) return
    
    switch(event.key) {
      case 'ArrowRight':
        if (currentQuestionNumber.value > 1) previousQuestion()
        break
      case 'ArrowLeft':
        if (currentQuestionNumber.value < totalQuestions.value) nextQuestion()
        break
      case ' ':
        event.preventDefault()
        togglePause()
        break
      case 'Escape':
        showControls.value = false
        break
    }
  }
  
  window.addEventListener('keydown', handleKeyPress)
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyPress)
  })
})
</script>

<style scoped>
/* إضافة أنماط خاصة بشاشة العرض */
.question-display {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
}

.option-display {
  transition: all 0.3s ease;
}

.option-display:hover {
  background-color: #4a5568;
  transform: translateY(-2px);
}

/* تحسين الخطوط للشاشة الكبيرة */
@media (min-width: 1024px) {
  .question-text {
    font-size: 3rem;
    line-height: 1.2;
  }
  
  .option-display {
    padding: 2rem;
    font-size: 1.5rem;
  }
}

/* تأثير الانتقال بين الأسئلة */
.animate-fade-in {
  animation: fadeInScale 0.5s ease-out;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>