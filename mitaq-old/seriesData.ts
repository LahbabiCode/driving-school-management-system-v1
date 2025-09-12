export interface QuestionAnswer {
    q: number;
    a: number[];
}

export interface SeriesData {
    seriesId: number;
    answers: QuestionAnswer[];
}

// Helper to generate mock data for 40 questions per series
const generateMockAnswers = (numQuestions: number): QuestionAnswer[] => {
    const answers: QuestionAnswer[] = [];
    for (let i = 1; i <= numQuestions; i++) {
        // Most questions have 1 or 2 correct answers in Moroccan driving tests.
        const numCorrectAnswers = Math.random() > 0.7 ? 2 : 1; // 30% chance of 2 answers
        const correctAnswers = new Set<number>();
        while (correctAnswers.size < numCorrectAnswers) {
            correctAnswers.add(Math.floor(Math.random() * 4) + 1); // Answers are 1, 2, 3, or 4
        }
        answers.push({ q: i, a: Array.from(correctAnswers).sort() });
    }
    return answers;
};

// Generate data for all 40 series
export const SERIES_ANSWERS: SeriesData[] = Array.from({ length: 40 }, (_, i) => ({
    seriesId: i + 1,
    answers: generateMockAnswers(40),
}));
