import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { Question } from "../../types";

import styles from "./Survey.module.scss";

const Results = ({
  results,
  userResults,
}: {
  results: Array<Question>;
  userResults: any;
}) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  if (Object.keys(userResults).length == 0) {
    userResults = localStorage.getItem("userAnswers");
  }

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const getTotalNumberByQuestion = () => {
    // find total amount of answers
    let totalCount = 0;

    results[0].answers.map((answer) => {
      totalCount += answer.number;
    });

    return totalCount;
  };

  const getResultsWithStatistics = () => {
    const resultsWithStatistics = [...results];

    const newresultsWithStatistics = resultsWithStatistics.forEach(
      (question, index) => {
        // вызвать нахожденние тотала
        const totalSurveyCompletes = getTotalNumberByQuestion();

        // найти вопрос key которого начинается с question.id

        console.log("userResults", userResults);
        const assignmentsdv = "1 Question";

        /*console.log("Object.keys(userResults)", Object.keys(userResults));

        const questionIndexInAnswers = Object.keys(userResults).findIndex(
          (item) => {
            console.log("item[0]", item[0], "question.id", question.id);
            return item[0] == question.id;
          }
        );
        console.log("questionIndexInAnswers", questionIndexInAnswers);
        console.log("keys", Object.keys(userResults));
        console.log(
          "userResults[questionIndexInAnswers]",
          userResults[questionIndexInAnswers]
        );
        // пройтись по ответам и добавить поле isUserAnswer

        /*question.answers.map((answer) => {
          // Object.keys(userResults).findIndex(k => k.startsWith({question.id}));
          const userAnswerIndex = userResults[questionIndexInAnswers];

          console.log("questionIndexInAnswers", userAnswerIndex);

          // const isUserAnswer = userResults[index] === answer.id;

          // answer["isUserAnswer"] = (question.id === );
          return answer;
        });

        // посчитать number / total

        const questionIndex = Object.keys(userResults).findIndex((item) => {
          return item === question.question;
        });

        console.log(questionIndex);

        Object.keys(userResults).forEach((key: string) => {
          const questionIndex = results.findIndex((item) => {
            return item.question === key;
          });
        });

        console.log("resultsWithStatistics", resultsWithStatistics);

        /*  const answerIndex = results[questionIndex].answers.findIndex((item) => {
          return item.id === userResults[key];
        });*/
      }
    );
  };

  getResultsWithStatistics();

  return (
    <div>
      sdvsdv
      {results.map((question, index) => {
        return (
          <Accordion
            expanded={expanded === ("panel" + question.id).toString()}
            onChange={handleChange("panel" + question.id)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <p>
                {index + 1} {question.question}
              </p>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                feugiat. Aliquam eget maximus est, id dignissim quam.
              </p>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};
export default Results;
