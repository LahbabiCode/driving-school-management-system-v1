import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../main.js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(true)

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isStudent = computed(() => user.value?.role === 'student')

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
      
      if (userDoc.exists()) {
        user.value = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          ...userDoc.data()
        }
        return { success: true }
      } else {
        throw new Error('بيانات المستخدم غير موجودة')
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      user.value = null
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const checkAuth = () => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
        if (userDoc.exists()) {
          user.value = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            ...userDoc.data()
          }
        }
      } else {
        user.value = null
      }
      loading.value = false
    })
  }

  return {
    user,
    loading,
    isAuthenticated,
    isAdmin,
    isStudent,
    login,
    logout,
    checkAuth
  }
})