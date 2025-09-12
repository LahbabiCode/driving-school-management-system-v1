import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy 
} from 'firebase/firestore'
import { db } from '../main.js'

export const useExamStore = defineStore('exam', () => {
  const exams = ref([])
  const currentExam = ref(null)
  const loading = ref(false)

  const activeExams = computed(() => 
    exams.value.filter(exam => exam.status === 'active')
  )

  const fetchExams = async () => {
    loading.value = true
    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'exams'), orderBy('createdAt', 'desc'))
      )
      exams.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (error) {
      console.error('خطأ في جلب الامتحانات:', error)
    } finally {
      loading.value = false
    }
  }

  const getExam = async (examId) => {
    try {
      const examDoc = await getDoc(doc(db, 'exams', examId))
      if (examDoc.exists()) {
        currentExam.value = {
          id: examDoc.id,
          ...examDoc.data()
        }
        return currentExam.value
      }
    } catch (error) {
      console.error('خطأ في جلب الامتحان:', error)
    }
    return null
  }

  const createExam = async (examData) => {
    try {
      const docRef = await addDoc(collection(db, 'exams'), {
        ...examData,
        createdAt: new Date(),
        status: 'draft'
      })
      await fetchExams()
      return { success: true, id: docRef.id }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const updateExam = async (examId, examData) => {
    try {
      await updateDoc(doc(db, 'exams', examId), {
        ...examData,
        updatedAt: new Date()
      })
      await fetchExams()
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const deleteExam = async (examId) => {
    try {
      await deleteDoc(doc(db, 'exams', examId))
      await fetchExams()
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const activateExam = async (examId) => {
    try {
      // إلغاء تفعيل جميع الامتحانات الأخرى
      const activeExamsQuery = query(
        collection(db, 'exams'), 
        where('status', '==', 'active')
      )
      const activeExamsSnapshot = await getDocs(activeExamsQuery)
      
      const batch = []
      activeExamsSnapshot.forEach(doc => {
        batch.push(updateDoc(doc.ref, { status: 'inactive' }))
      })
      
      await Promise.all(batch)
      
      // تفعيل الامتحان المحدد
      await updateDoc(doc(db, 'exams', examId), { 
        status: 'active',
        activatedAt: new Date()
      })
      
      await fetchExams()
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const deactivateExam = async (examId) => {
    try {
      await updateDoc(doc(db, 'exams', examId), { 
        status: 'inactive',
        deactivatedAt: new Date()
      })
      await fetchExams()
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  return {
    exams,
    currentExam,
    loading,
    activeExams,
    fetchExams,
    getExam,
    createExam,
    updateExam,
    deleteExam,
    activateExam,
    deactivateExam
  }
})