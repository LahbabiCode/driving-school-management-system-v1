import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy 
} from 'firebase/firestore'
import { db } from '../main.js'

export const useQuestionStore = defineStore('question', () => {
  const questions = ref([])
  const loading = ref(false)

  const questionsByCategory = computed(() => {
    const grouped = {}
    questions.value.forEach(question => {
      const category = question.category || 'عام'
      if (!grouped[category]) {
        grouped[category] = []
      }
      grouped[category].push(question)
    })
    return grouped
  })

  const fetchQuestions = async (examId = null) => {
    loading.value = true
    try {
      let q = collection(db, 'questions')
      
      if (examId) {
        q = query(q, where('examId', '==', examId))
      }
      
      q = query(q, orderBy('createdAt', 'desc'))
      
      const querySnapshot = await getDocs(q)
      questions.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (error) {
      console.error('خطأ في جلب الأسئلة:', error)
    } finally {
      loading.value = false
    }
  }

  const createQuestion = async (questionData) => {
    try {
      const docRef = await addDoc(collection(db, 'questions'), {
        ...questionData,
        createdAt: new Date()
      })
      await fetchQuestions()
      return { success: true, id: docRef.id }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const updateQuestion = async (questionId, questionData) => {
    try {
      await updateDoc(doc(db, 'questions', questionId), {
        ...questionData,
        updatedAt: new Date()
      })
      await fetchQuestions()
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const deleteQuestion = async (questionId) => {
    try {
      await deleteDoc(doc(db, 'questions', questionId))
      await fetchQuestions()
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const importQuestions = async (questionsArray) => {
    try {
      const batch = questionsArray.map(questionData => 
        addDoc(collection(db, 'questions'), {
          ...questionData,
          createdAt: new Date()
        })
      )
      
      await Promise.all(batch)
      await fetchQuestions()
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  return {
    questions,
    loading,
    questionsByCategory,
    fetchQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    importQuestions
  }
})