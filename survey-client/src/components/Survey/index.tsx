import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { Form } from "react-final-form";
import { Field } from "react-final-form";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

import styles from "./Survey.module.scss";
import Results from "../Results";

import questions from "../../questions";

import questions2 from "../../questionsNew.json";
import { Values } from "../../types";

const Survey = () => {
  const initialIsSurveyPassed = localStorage.getItem("isSurveyPassed") || false;

  console.log("questions2", questions2);

  const [isSurveyPassed, setIsSurveyPassed] = useState(!!initialIsSurveyPassed);

  const [results, setResults] = useState(questions);

  const onSubmit = async (values: Values) => {
    const results = await fetch("../../questionsNew.json");

    const data = await results.json();

    console.log("results", data);

    console.log(values);

    Object.keys(values).forEach((key: string) => {
      const questionIndex = questions.findIndex((item) => {
        return item.question === key;
      });
      const answerIndex = questions[questionIndex].answers.findIndex((item) => {
        return item.id === values[key];
      });
      questions[questionIndex].answers[answerIndex].number += 1;
    });

    console.log("questions", questions);
    setResults(questions);

    localStorage.setItem("isSurveyPassed", "true");
    setIsSurveyPassed(true);
  };

  console.log(questions);

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
            <Form onSubmit={onSubmit}>
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  {questions.map((question) => {
                    return (
                      <Paper
                        key={question.id}
                        className={styles.questionContainer}
                      >
                        <FormControl component="fieldset">
                          <FormLabel component="legend">
                            {question.question}
                          </FormLabel>
                          <RadioGroup aria-label="gender" name="gender1">
                            {question.answers.map((answerItem, index) => {
                              return (
                                <label key={question.id + index}>
                                  <Field
                                    name={question.question}
                                    component="input"
                                    type="radio"
                                    value={answerItem.id}
                                  />
                                  {answerItem.answer}
                                </label>
                              );
                            })}
                          </RadioGroup>
                        </FormControl>
                      </Paper>
                    );
                  })}
                  <Button
                    className={styles.submitButton}
                    type="submit"
                    variant="outlined"
                    color="primary"
                  >
                    Submit
                  </Button>
                </form>
              )}
            </Form>
          </>
        ) : (
          <Results results={results} />
        )}
      </Container>
    </div>
  );
};

export default Survey;
