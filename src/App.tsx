import "./App.css";
import SampleText from "./SampleText";
import InputBox from "./InputBox";
import { useEffect, useState } from "react";

function App() {
  const [inputText, setInputText] = useState<string>("");
  const [isTestInProgress, setIsTestInProgress] = useState<boolean>(false);
  const [testState, setTestState] = useState<
    "waiting" | "running" | "completed"
  >("waiting");
  const [secondsRemaining, setSecondsRemaining] = useState<number>(30);

  const clearInput = () => {
    setInputText("");
    setIsTestInProgress(false);
  };

  useEffect(() => {
    if (testState === "running") {
      setIsTestInProgress(true);
    } else {
      setIsTestInProgress(false);
    }
  }, [testState]);

  return (
    <div className="content">
      <header>
        <hr />
        <h1 className="title">tip tap</h1>
        <hr />
        <p>
          Welcome to <b>tip tap</b>, a typing test!
        </p>
      </header>

      <div>
        <SampleText clearInput={clearInput} />
        <InputBox
          inputText={inputText}
          isTestInProgress={isTestInProgress}
          handleKeypress={(e) => setInputText(e.target.value)}
          clearInput={clearInput}
        />
      </div>
    </div>
  );
}

export default App;
