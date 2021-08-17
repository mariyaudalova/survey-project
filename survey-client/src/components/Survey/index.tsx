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

  let formData = {
    1: "no",
    2: "no",
  };

  const [value, setValue] = React.useState("female");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onSubmit = async (values: any) => {
    console.log(values);
  };

  return (
    <Container>
      <h2>Survey</h2>
      <Form
        onSubmit={onSubmit}
        initialValues={{
          ...formData,
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            {questions.map((question) => {
              return (
                <Paper key={question.id}>
                  <p>{question.question}</p>

                  <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      value={value}
                      onChange={handleChange}
                    >
                      {question.answers.map((answerItem) => {
                        console.log(answerItem.answer);
                        return (
                          <Field type="radio" name={question.id}>
                            {(props) => (
                              <FormControlLabel
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
          </form>
        )}
      </Form>
    </Container>
  );
};

export default Survey;
