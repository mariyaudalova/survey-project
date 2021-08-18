import React, { useEffect } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { Question } from "../../types";
import styles from "../Survey/Survey.module.scss";

const Results = ({
  results,
  userResults,
}: {
  results: Array<Question>;
  userResults: any;
}) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  useEffect(() => {
    getResultsWithStatistics();
  }, []);

  if (Object.keys(userResults).length === 0) {
    userResults = localStorage.getItem("userAnswers");
  }

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  let totalCount = 0;

  const getTotalNumberByQuestion = () => {
    results[0].answers.map((answer) => {
      totalCount += answer.number;
    });

    return totalCount;
  };

  const getResultsWithStatistics = () => {
    const resultsWithStatistics = [...results];

    const newResultsWithStatistics = resultsWithStatistics.map(
      (question: Question, index) => {
        totalCount = 0;
        const totalSurveyCompletes = getTotalNumberByQuestion();

        const valueOfAnswer = userResults[question.question];

        question.answers.forEach((answer) => {
          answer.percentValue = (answer.number / totalCount) * 100;

          answer.isUserAnswer = valueOfAnswer === answer.id;

          return answer;
        });
        return question;
      }
    );

    localStorage.setItem(
      "statistics",
      JSON.stringify(newResultsWithStatistics)
    );
  };

  getResultsWithStatistics();

  return (
    <div>
      <p className={styles.surveyCompleteContent}>
        <b>{totalCount - 1} users</b> passed this survey except you. See
        extended results:
      </p>
      {results.map((question, index) => {
        return (
          <Accordion
            key={question.id}
            className={styles.questionContainer}
            expanded={expanded === ("panel" + question.id).toString()}
            onChange={handleChange("panel" + question.id)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <p>
                {index + 1}. {question.question} - "
                {
                  question.answers[
                    question.answers.findIndex((answer) => {
                      return answer.isUserAnswer;
                    })
                  ].answer
                }
                " (as{" "}
                {question.answers[
                  question.answers.findIndex((answer) => {
                    return answer.isUserAnswer;
                  })
                ].percentValue?.toFixed(2)}
                % of all applicants)
              </p>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                {question.answers.map((answer) => {
                  return (
                    <li
                      key={answer.id}
                      className={styles.statisticsDataContent}
                    >
                      The <b>"{answer.answer}"</b> option was selected{" "}
                      <b>{answer.percentValue?.toFixed(2)} % </b> by other
                      users.
                    </li>
                  );
                })}
              </ul>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};
export default Results;
