import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// استيراد المكونات
const Home = () => import('../views/Home.vue')
const Login = () => import('../views/Login.vue')

// الطالب
const StudentExam = () => import('../views/student/StudentExam.vue')
const StudentAnswerSheet = () => import('../views/student/AnswerSheet.vue')

// شاشة العرض
const ExamDisplay = () => import('../views/display/ExamDisplay.vue')

// المدير
const AdminLayout = () => import('../views/admin/Layout.vue')
const AdminDashboard = () => import('../views/admin/Dashboard.vue')
const AdminExams = () => import('../views/admin/Exams.vue')
const AdminQuestions = () => import('../views/admin/Questions.vue')
const AdminStudents = () => import('../views/admin/Students.vue')
const AdminReports = () => import('../views/admin/Reports.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // مسارات الطالب
  {
    path: '/student',
    name: 'StudentExam',
    component: StudentExam,
    meta: { requiresAuth: true, role: 'student' }
  },
  {
    path: '/student/answer-sheet/:examId',
    name: 'StudentAnswerSheet',
    component: StudentAnswerSheet,
    meta: { requiresAuth: true, role: 'student' }
  },
  // شاشة العرض
  {
    path: '/display/:examId',
    name: 'ExamDisplay',
    component: ExamDisplay
  },
  // مسارات المدير
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: AdminDashboard
      },
      {
        path: 'exams',
        name: 'AdminExams',
        component: AdminExams
      },
      {
        path: 'questions',
        name: 'AdminQuestions',
        component: AdminQuestions
      },
      {
        path: 'students',
        name: 'AdminStudents',
        component: AdminStudents
      },
      {
        path: 'reports',
        name: 'AdminReports',
        component: AdminReports
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// حارس التوجيه للمصادقة
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      next('/login')
      return
    }
    
    if (to.meta.role && authStore.user?.role !== to.meta.role) {
      next('/')
      return
    }
  }
  
  next()
})

export default router