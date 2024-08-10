import React from "react";

function Option({ questions, dispatch, answer }) {
  return (
    <div className="options">
      {questions.options.map((option, index) => (
        <button
          className={`btn btn-option ${answer === index ? "answer" : ""} ${
            answer !== null
              ? index === questions.correctOption
                ? "correct"
                : "wrong"
              : ""
          } "" `}
          key={option}
          disabled={answer !== null}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Option;
