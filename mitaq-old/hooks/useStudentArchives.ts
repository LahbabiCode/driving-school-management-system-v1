import { useLocalStorage } from './useLocalStorage';

type StudentAnswers = { [q: number]: number[] };
type SeriesResults = { [seriesId: string]: StudentAnswers };
type AllStudentArchives = { [studentName: string]: SeriesResults };

export const useStudentArchives = () => {
  const [archives, setArchives] = useLocalStorage<AllStudentArchives>('student-exam-archives', {});

  const getStudentResults = (studentName: string): SeriesResults => {
    return archives[studentName] || {};
  };

  const saveStudentResult = (studentName: string, seriesId: number, answers: StudentAnswers) => {
    setArchives(prev => {
      // Create a deep copy to avoid mutation issues with state
      const newArchives = JSON.parse(JSON.stringify(prev));
      if (!newArchives[studentName]) {
        newArchives[studentName] = {};
      }
      newArchives[studentName][`series_${seriesId}`] = answers;
      return newArchives;
    });
  };
  
  const clearStudentResult = (studentName: string, seriesId: number) => {
     setArchives(prev => {
        const newArchives = JSON.parse(JSON.stringify(prev));
        if (newArchives[studentName]) {
            delete newArchives[studentName][`series_${seriesId}`];
        }
        return newArchives;
     });
  }

  return { getStudentResults, saveStudentResult, clearStudentResult };
};
