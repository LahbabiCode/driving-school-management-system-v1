import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface DatabaseStudent {
  id: string
  name: string
  email: string
  phone: string
  created_at: string
  updated_at: string
}

export interface DatabaseTestResult {
  id: string
  student_id: string
  series_number: number
  score: number
  total_questions: number
  passed: boolean
  answers: any[]
  completed_at: string
  created_at: string
}

export interface DatabaseSkillResult {
  id: string
  student_id: string
  skill_category: string
  skill_name: string
  status: 'passed' | 'failed' | 'pending'
  score: number
  notes: string
  created_at: string
  updated_at: string
}

// Student Functions
export const createStudent = async (studentData: Omit<DatabaseStudent, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('students')
    .insert(studentData)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const getStudent = async (id: string) => {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

export const getAllStudents = async () => {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const updateStudent = async (id: string, updates: Partial<DatabaseStudent>) => {
  const { data, error } = await supabase
    .from('students')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Test Result Functions
export const saveTestResult = async (resultData: Omit<DatabaseTestResult, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('test_results')
    .insert(resultData)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const getStudentTestResults = async (studentId: string) => {
  const { data, error } = await supabase
    .from('test_results')
    .select('*')
    .eq('student_id', studentId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

// Skill Result Functions
export const saveSkillResult = async (skillData: Omit<DatabaseSkillResult, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('skill_results')
    .insert(skillData)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const getStudentSkillResults = async (studentId: string) => {
  const { data, error } = await supabase
    .from('skill_results')
    .select('*')
    .eq('student_id', studentId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const updateSkillResult = async (id: string, updates: Partial<DatabaseSkillResult>) => {
  const { data, error } = await supabase
    .from('skill_results')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}
