import React, { useEffect, useReducer } from "react";
import {
  Error,
  Header,
  Loader,
  Questions,
  StartScreen,
  Main,
} from "./components/index";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";

let initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};
function App() {
  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return { ...state, questions: action.payload, status: "ready" };
      case "dataFailed":
        return { ...state, status: "error" };
      case "start":
        return { ...state, status: "active" };
      case "newAnswer":
        const question = state.questions[state.index];

        return {
          ...state,
          answer: action.payload,
          points:
            question.correctOption === action.payload
              ? state.points + question.points
              : state.points,
        };
      case "next":
        return { ...state, index: state.index + 1, answer: null };
      default:
        throw new Error("Error");
    }
  }
  const [{ status, questions, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const questionTotal = questions.length;

  const maxPoints = questions.reduce((a, c) => a + c.points, 0);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => {
        return res.json();
      })
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {/* <p>15/20</p>
        <p>Qustions</p> */}
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen dispatch={dispatch} />}

        {status === "active" && (
          <>
            <Progress
              points={points}
              questionTotal={questionTotal}
              maxPoints={maxPoints}
              index={index}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              answer={answer}
              dispatch={dispatch}
              index={index}
              questionTotal={questionTotal}
            />
          </>
        )}
        {status === "finish" && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
