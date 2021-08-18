export interface Question {
  id: string;
  question: string;
  answers: Array<Answer>;
}

export interface Answer {
  id: string;
  answer: string;
  number: number;
  isUserAnswer: boolean | null;
  percentValue: number | null;
}

export interface Values {
  [key: string]: string;
}

export type QuestionsArray = Array<Question>;
