import React from "react";

function NextButton({ answer, dispatch }) {
  if (answer === null) return null;
  if ()
  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "next" })}>
      Next
    </button>
  );
}

export default NextButton;
