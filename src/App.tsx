import "./App.css";
import SampleText from "./SampleText";
import InputBox from "./InputBox";
import { useEffect, useState } from "react";
import Countdown from "./Countdown";

export type TestStates = "waiting" | "running" | "completed";
export type SelectableLanguages = "english" | "lorem" | "french";
export type SelectableTimers = 30 | 60 | 90 | 120;

function App() {
  const [selectedLang, setSelectedLang] =
    useState<SelectableLanguages>("english");
  const [initialTimer, setInitialTimer] = useState<SelectableTimers>(30);
  const [selectedTimer, setSelectedTimer] =
    useState<SelectableTimers>(initialTimer);

  const [testState, setTestState] = useState<TestStates>("waiting");

  const [sampleText, setSampleText] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");

  let timeoutId: ReturnType<typeof setTimeout>;

  const finishTest = () => {
    clearTimeout(timeoutId);
    setTestState("completed");
  };

  const resetTest = () => {
    setInputText("");
    setTestState("waiting");
    clearTimeout(timeoutId);
  };

  useEffect(() => {
    // update testState to trigger timer start on keypress
    if (testState === "waiting" && inputText.length > 0) {
      setTestState("running");
    }
    // diff the inputText against the sample text and update the UI to show correct and incorrect characters
  }, [inputText]);

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
        {testState === "running" ? (
          <Countdown
            initialTimer={initialTimer}
            // @ts-ignore
            timeoutId={timeoutId}
            finishTest={finishTest}
          />
        ) : testState === "completed" ? (
          <div className="countdown">
            <div className="countdown-box">
              <p>0</p>
            </div>
          </div>
        ) : (
          <div className="countdown-placeholder"></div>
        )}
        <SampleText
          sampleText={sampleText}
          setSampleText={setSampleText}
          selectedLang={selectedLang}
          setSelectedLang={setSelectedLang}
          setInitialTimer={setInitialTimer}
          selectedTimer={selectedTimer}
          setSelectedTimer={setSelectedTimer}
          resetTest={resetTest}
        />
        <InputBox
          inputText={inputText}
          testState={testState}
          handleKeypress={(e) => setInputText(e.target.value)}
          resetTest={resetTest}
        />
      </div>
    </div>
  );
}

export default App;
