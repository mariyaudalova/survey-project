import React from "react";

import styles from "./Survey.module.scss";

//import questions from "../../questions.js";
interface Question {
  id: string;
  question: string;
  answers: Array<Answer>;
}

interface Answer {
  id: string;
  answer: string;
  number: number;
}

const Results = ({ results }: { results: Array<Question> }) => {
  return <div>{results[0].answers[0].number}</div>;
};
export default Results;
