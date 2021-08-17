import React from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { Form } from "react-final-form";
import { Field } from "react-final-form";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

import styles from "./Survey.module.scss";

//import questions from "../../questions.js";

const Survey = () => {
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

  const questions = [
    {
      id: "1",
      question: "Are you like your job?",
      answers: [
        {
          id: "1",
          answer: "yes",
          number: "0",
        },
        {
          id: "2",
          answer: "no",
          number: "2",
        },
        {
          id: "3",
          answer: "not really",
          number: "5",
        },
      ],
    },
    {
      id: "2",
      question: "And this",
      answers: [
        {
          id: "1",
          answer: "yes",
          number: "0",
        },
        {
          id: "2",
          answer: "no",
          number: "2",
        },
        {
          id: "3",
          answer: "not really",
          number: "5",
        },
      ],
    },
  ];

  const [value, setValue] = React.useState("female");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onSubmit = async (values: any) => {
    console.log(values);
  };

  return (
    <div className={styles.pageContainer}>
      <Container>
        <p className={styles.surveyTitle}>Welcome to survey!</p>
        <p className={styles.surveyHeading}>
          Be careful - you can take the survey only once
        </p>
        <Form onSubmit={onSubmit}>
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              {questions.map((question) => {
                return (
                  <Paper key={question.id} className={styles.questionContainer}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        {question.question}
                      </FormLabel>
                      <RadioGroup
                        aria-label="gender"
                        name="gender1"
                        value={value}
                        onChange={handleChange}
                      >
                        {question.answers.map((answerItem) => {
                          return (
                            <Field
                              key={answerItem.id}
                              type="radio"
                              name={answerItem.answer}
                            >
                              {(props) => (
                                <FormControlLabel
                                  checked={props.input.checked}
                                  id={answerItem.id}
                                  control={<Radio />}
                                  label={answerItem.answer}
                                  value={props.input.value}
                                  onChange={props.input.onChange}
                                />
                              )}
                            </Field>
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
      </Container>
    </div>
  );
};

export default Survey;
