import React, { useEffect, useReducer } from "react";
import { Error, Header, Loader, Main } from "./components";

function App() {
  const initialState = {
    questions: [],
    status: "loading",
  };
  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return { ...state, questions: action.payload, status: "ready" };
      case "dataFailed":
        return { ...state, status: "error" };
      default:
        throw new Error("Error");
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  const { status } = state;
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
      </Main>
    </div>
  );
}

export default App;
