import React from "react";

function Progress({ questionTotal, maxPoints, index, points }) {
  return (
    <header className="progress">
      <progress max={questionTotal} value={index} />
      <p>
        Questions <strong>{index + 1}</strong>/{questionTotal}
      </p>
      <p>
        Points <strong>{points}</strong>/{maxPoints}
      </p>
    </header>
  );
}

export default Progress;
