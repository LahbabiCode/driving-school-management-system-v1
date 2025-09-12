<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-xl font-semibold text-gray-800">إدارة الامتحانات</h2>
          <p class="text-gray-600">إنشاء وإدارة الامتحانات وتحديد الأسئلة</p>
        </div>
        <button @click="showCreateModal = true" class="btn-primary">
          إنشاء امتحان جديد
        </button>
      </div>

      <!-- Filters -->
      <div class="card">
        <div class="flex flex-wrap gap-4">
          <select v-model="statusFilter" class="form-input max-w-xs">
            <option value="">جميع الحالات</option>
            <option value="draft">مسودة</option>
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
          </select>
          <input 
            v-model="searchTerm" 
            type="text" 
            placeholder="البحث في الامتحانات..."
            class="form-input max-w-xs"
          >
        </div>
      </div>

      <!-- Exams List -->
      <div class="space-y-4">
        <div v-if="filteredExams.length === 0" class="card text-center py-12">
          <div class="text-gray-500">لا توجد امتحانات</div>
        </div>

        <div v-else v-for="exam in filteredExams" :key="exam.id" class="card">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 space-x-reverse">
                <h3 class="text-lg font-semibold text-gray-800">{{ exam.title }}</h3>
                <span 
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    exam.status === 'active' ? 'bg-green-100 text-green-800' :
                    exam.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                  ]"
                >
                  {{ getStatusText(exam.status) }}
                </span>
              </div>
              <p class="text-gray-600 mt-1">{{ exam.description }}</p>
              <div class="flex items-center space-x-4 space-x-reverse mt-2 text-sm text-gray-500">
                <span>{{ exam.duration }} دقيقة</span>
                <span>{{ exam.totalQuestions || 0 }} سؤال</span>
                <span>تم الإنشاء: {{ formatDate(exam.createdAt) }}</span>
              </div>
            </div>

            <div class="flex items-center space-x-2 space-x-reverse">
              <!-- زر العرض على الشاشة -->
              <router-link 
                v-if="exam.status === 'active'"
                :to="`/display/${exam.id}`" 
                target="_blank"
                class="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                عرض على الشاشة
              </router-link>

              <!-- أزرار التحكم -->
              <button 
                v-if="exam.status !== 'active'"
                @click="activateExam(exam.id)"
                class="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                تفعيل
              </button>

              <button 
                v-if="exam.status === 'active'"
                @click="deactivateExam(exam.id)"
                class="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                إيقاف
              </button>

              <button 
                @click="editExam(exam)"
                class="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                تعديل
              </button>

              <button 
                @click="deleteExam(exam.id)"
                class="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Create/Edit Modal -->
      <div v-if="showCreateModal || showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <h3 class="text-lg font-semibold mb-4">
            {{ showEditModal ? 'تعديل الامتحان' : 'إنشاء امتحان جديد' }}
          </h3>

          <form @submit.prevent="saveExam" class="space-y-4">
            <div>
              <label class="form-label">عنوان الامتحان</label>
              <input 
                v-model="examForm.title" 
                type="text" 
                required
                class="form-input"
                placeholder="أدخل عنوان الامتحان"
              >
            </div>

            <div>
              <label class="form-label">وصف الامتحان</label>
              <textarea 
                v-model="examForm.description" 
                rows="3"
                class="form-input"
                placeholder="وصف مختصر للامتحان"
              ></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="form-label">مدة الامتحان (بالدقائق)</label>
                <input 
                  v-model.number="examForm.duration" 
                  type="number" 
                  required
                  min="1"
                  max="180"
                  class="form-input"
                >
              </div>

              <div>
                <label class="form-label">عدد الأسئلة</label>
                <input 
                  v-model.number="examForm.totalQuestions" 
                  type="number" 
                  required
                  min="1"
                  max="100"
                  class="form-input"
                >
              </div>
            </div>

            <div>
              <label class="form-label">الفئة</label>
              <select v-model="examForm.category" class="form-input">
                <option value="driving-theory">النظري - رخصة القيادة</option>
                <option value="traffic-signs">إشارات المرور</option>
                <option value="safety">السلامة المرورية</option>
                <option value="general">عام</option>
              </select>
            </div>

            <div>
              <label class="form-label">صعوبة الامتحان</label>
              <select v-model="examForm.difficulty" class="form-input">
                <option value="easy">سهل</option>
                <option value="medium">متوسط</option>
                <option value="hard">صعب</option>
              </select>
            </div>

            <div class="flex justify-end space-x-3 space-x-reverse pt-4">
              <button 
                type="button" 
                @click="closeModal"
                class="btn-secondary"
              >
                إلغاء
              </button>
              <button 
                type="submit" 
                class="btn-primary"
                :disabled="loading"
              >
                {{ loading ? 'جاري الحفظ...' : (showEditModal ? 'تحديث' : 'إنشاء') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AdminLayout from './Layout.vue'
import { useExamStore } from '../../stores/exam'

const examStore = useExamStore()

const showCreateModal = ref(false)
const showEditModal = ref(false)
const loading = ref(false)
const statusFilter = ref('')
const searchTerm = ref('')

const examForm = ref({
  title: '',
  description: '',
  duration: 30,
  totalQuestions: 50,
  category: 'driving-theory',
  difficulty: 'medium'
})

const currentExamId = ref(null)

const filteredExams = computed(() => {
  let exams = examStore.exams

  if (statusFilter.value) {
    exams = exams.filter(exam => exam.status === statusFilter.value)
  }

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    exams = exams.filter(exam => 
      exam.title.toLowerCase().includes(term) ||
      exam.description?.toLowerCase().includes(term)
    )
  }

  return exams
})

const getStatusText = (status) => {
  const statusTexts = {
    'active': 'نشط',
    'inactive': 'غير نشط',
    'draft': 'مسودة'
  }
  return statusTexts[status] || status
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date.toDate()).toLocaleDateString('ar-SA')
}

const activateExam = async (examId) => {
  if (confirm('هل تريد تفعيل هذا الامتحان؟ سيتم إلغاء تفعيل جميع الامتحانات الأخرى.')) {
    loading.value = true
    const result = await examStore.activateExam(examId)
    if (result.success) {
      alert('تم تفعيل الامتحان بنجاح')
    } else {
      alert('حدث خطأ في تفعيل الامتحان')
    }
    loading.value = false
  }
}

const deactivateExam = async (examId) => {
  if (confirm('هل تريد إيقاف هذا الامتحان؟')) {
    loading.value = true
    const result = await examStore.deactivateExam(examId)
    if (result.success) {
      alert('تم إيقاف الامتحان بنجاح')
    } else {
      alert('حدث خطأ في إيقاف الامتحان')
    }
    loading.value = false
  }
}

const editExam = (exam) => {
  examForm.value = {
    title: exam.title,
    description: exam.description || '',
    duration: exam.duration,
    totalQuestions: exam.totalQuestions || 50,
    category: exam.category || 'driving-theory',
    difficulty: exam.difficulty || 'medium'
  }
  currentExamId.value = exam.id
  showEditModal.value = true
}

const deleteExam = async (examId) => {
  if (confirm('هل تريد حذف هذا الامتحان؟ لا يمكن التراجع عن هذا الإجراء.')) {
    loading.value = true
    const result = await examStore.deleteExam(examId)
    if (result.success) {
      alert('تم حذف الامتحان بنجاح')
    } else {
      alert('حدث خطأ في حذف الامتحان')
    }
    loading.value = false
  }
}

const saveExam = async () => {
  loading.value = true
  
  try {
    let result
    if (showEditModal.value) {
      result = await examStore.updateExam(currentExamId.value, examForm.value)
    } else {
      result = await examStore.createExam(examForm.value)
    }

    if (result.success) {
      alert(showEditModal.value ? 'تم تحديث الامتحان بنجاح' : 'تم إنشاء الامتحان بنجاح')
      closeModal()
    } else {
      alert('حدث خطأ في حفظ الامتحان')
    }
  } catch (error) {
    console.error('خطأ في حفظ الامتحان:', error)
    alert('حدث خطأ في حفظ الامتحان')
  }
  
  loading.value = false
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  currentExamId.value = null
  examForm.value = {
    title: '',
    description: '',
    duration: 30,
    totalQuestions: 50,
    category: 'driving-theory',
    difficulty: 'medium'
  }
}

onMounted(() => {
  examStore.fetchExams()
})
</script>