
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  hint: string;
}

export type Step = 'entry' | 'quiz' | 'score' | 'letter' | 'result';

export interface LetterData {
  favThing: string;
  promise: string;
  excitedFor: string;
}
