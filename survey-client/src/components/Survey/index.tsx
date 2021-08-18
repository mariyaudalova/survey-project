import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { Form } from "react-final-form";
import { Field } from "react-final-form";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

import { Values, QuestionsArray } from "../../types";
import styles from "./Survey.module.scss";
import Results from "../Results";

const Survey = () => {
  const [currentSurveyState, setCurrentSurveyState] = useState<QuestionsArray>(
    []
  );
  const [userResults, setUserResults] = useState({});

  const getQuestions = async () => {
    const response = await fetch("../../questions.json");
    const data = await response.json();
    console.log("data.questions", data.questions);
    setCurrentSurveyState(data.questions);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const initialIsSurveyPassed = localStorage.getItem("isSurveyPassed") || false;

  const [isSurveyPassed, setIsSurveyPassed] = useState(!!initialIsSurveyPassed);

  const onSubmit = async (values: Values) => {
    setUserResults(values);
    localStorage.setItem("userAnswers", JSON.stringify(values));

    /*  We cannot save as values keys id of answers.
     *  This is technical limitation of react-final-form. After we implement integration with Formik instead of
     *  Final-form the following part of realization will be more easily
     */

    Object.keys(values).forEach((key: string) => {
      const questionIndex = currentSurveyState.findIndex((item) => {
        return item.question === key;
      });
      const answerIndex = currentSurveyState[questionIndex].answers.findIndex(
        (item) => {
          return item.id === values[key];
        }
      );
      currentSurveyState[questionIndex].answers[answerIndex].number += 1;
    });

    localStorage.setItem("isSurveyPassed", "true");
    setCurrentSurveyState(currentSurveyState);
    setIsSurveyPassed(true);
  };

  const formValidation = (values: any) => {
    const errors: { [key: string]: string } = {};
    const quesionsList = currentSurveyState.map((item) => {
      return item.question;
    });
    quesionsList.forEach((question: any) => {
      if (!values[question]) {
        errors[question] = "Choose answer please";
      }
    });
    return errors;
  };

  return (
    <div className={styles.pageContainer}>
      <p className={styles.surveyTitle}>
        {!isSurveyPassed
          ? " Welcome to survey!"
          : "Thank you for completing the survey!"}
      </p>
      <p className={styles.surveyHeading}>
        {!isSurveyPassed
          ? "Be careful - you can take the survey only once"
          : "We'll inform you if we have a new survey for you"}
      </p>

      <Container>
        {!isSurveyPassed ? (
          <>
            <Form onSubmit={onSubmit} validate={formValidation}>
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  {currentSurveyState.map((item) => {
                    const { question } = item;
                    return (
                      <Paper key={item.id} className={styles.questionContainer}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">
                            {item.question}
                          </FormLabel>
                          <RadioGroup>
                            {item.answers.map((answerItem) => {
                              return (
                                <label key={item.id + answerItem.id}>
                                  <Field
                                    name={item.question}
                                    component="input"
                                    type="radio"
                                    className={styles.radioButton}
                                    value={answerItem.id}
                                  />
                                  {answerItem.answer}
                                </label>
                              );
                            })}
                          </RadioGroup>
                          <span className={styles.errorMessage}>
                            {(props.touched as { [key: string]: boolean })[
                              question
                            ] &&
                              (props.errors as { [key: string]: string })[
                                question
                              ]}
                          </span>
                        </FormControl>
                      </Paper>
                    );
                  })}
                  <div className={styles.submitButton}>
                    <Button type="submit" variant="outlined" color="primary">
                      Submit
                    </Button>
                  </div>
                </form>
              )}
            </Form>
          </>
        ) : (
          <Results results={currentSurveyState} userResults={userResults} />
        )}
      </Container>
    </div>
  );
};

export default Survey;
