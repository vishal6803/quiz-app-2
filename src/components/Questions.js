import React from "react";
import Option from "./Option";

function Questions({ question, dispatch, answer }) {
  return (
    <div>
      <h2>{question.question}</h2>
      <Option
        questions={question}
        key={question.id}
        dispatch={dispatch}
        answer={answer}
      />
    </div>
  );
}

export default Questions;
