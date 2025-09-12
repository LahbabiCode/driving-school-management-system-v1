import { useState, useEffect } from 'react';
import { 
  supabase, 
  createStudent, 
  getStudent, 
  getAllStudents, 
  updateStudent,
  saveTestResult,
  getStudentTestResults,
  saveSkillResult,
  getStudentSkillResults,
  updateSkillResult,
  DatabaseStudent,
  DatabaseTestResult,
  DatabaseSkillResult
} from '../services/supabaseService';

export const useSupabase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Student operations
  const addStudent = async (studentData: Omit<DatabaseStudent, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createStudent(studentData);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create student');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchStudent = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getStudent(id);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch student');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchAllStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getAllStudents();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch students');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editStudent = async (id: string, updates: Partial<DatabaseStudent>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await updateStudent(id, updates);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update student');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Test result operations
  const saveTest = async (resultData: Omit<DatabaseTestResult, 'id' | 'created_at'>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await saveTestResult(resultData);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save test result');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchTestResults = async (studentId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getStudentTestResults(studentId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch test results');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Skill result operations
  const saveSkill = async (skillData: Omit<DatabaseSkillResult, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await saveSkillResult(skillData);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save skill result');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchSkillResults = async (studentId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getStudentSkillResults(studentId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch skill results');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editSkillResult = async (id: string, updates: Partial<DatabaseSkillResult>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await updateSkillResult(id, updates);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update skill result');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    // Student methods
    addStudent,
    fetchStudent,
    fetchAllStudents,
    editStudent,
    // Test methods
    saveTest,
    fetchTestResults,
    // Skill methods
    saveSkill,
    fetchSkillResults,
    editSkillResult,
    // Direct supabase access
    supabase
  };
};

export default useSupabase;
