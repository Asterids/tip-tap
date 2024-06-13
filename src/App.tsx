import "./App.css";
import SampleText from "./SampleText";
import InputBox from "./InputBox";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
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
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [keyPressed, setKeyPressed] = useState<string | null>(null);

  const [isCorrectAtIndex, setIsCorrectAtIndex] = useState<string[]>([]);
  const [overallErrorsCount, setOverallErrorsCount] = useState<number>(0);
  const [errorsAtEnd, setErrorsAtEnd] = useState<number>(0);

  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);

  let timeoutId: ReturnType<typeof setTimeout>;

  const finishTest = () => {
    const words = inputText.length / 5;
    setErrorsAtEnd(isCorrectAtIndex.filter((el) => el === "incorrect").length);

    const wpmGross = words / (initialTimer / 60);
    const wpmNet = Math.round(wpmGross - errorsAtEnd / (initialTimer / 60));
    setWpm(wpmNet);

    const correctCount = inputText.length - overallErrorsCount;
    const acc = Math.round((correctCount / inputText.length) * 100);
    setAccuracy(acc);

    clearTimeout(timeoutId);
    setTestState("completed");
  };

  const resetTest = () => {
    setInputText("");
    setIsCorrectAtIndex([]);
    setTestState("waiting");
    clearTimeout(timeoutId);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.currentTarget.value);
    setCursorPosition(e.currentTarget.selectionStart);
  };

  const handleOnKeyUp = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    setKeyPressed(e.key);
  };

  useEffect(() => {
    if (inputText.length) {
      // update testState to trigger timer start when user begins typing in the field
      if (testState === "waiting") {
        setTestState("running");
      }

      const idxBeforeCursor = cursorPosition - 1;
      const typedChar = inputText[idxBeforeCursor];

      // if cursor got moved inside text or backspace pressed, recalculate entire correctness array.
      // else, diff the typedChar against the sample text and update the correctness array
      if (cursorPosition !== inputText.length || keyPressed === "Backspace") {
        let newCorrectnessArray: string[] = [];
        for (let i = 0; i < inputText.length; i++) {
          if (inputText[i] === sampleText[i]) {
            newCorrectnessArray.push("correct");
          } else {
            newCorrectnessArray.push("incorrect");
          }
        }
        setIsCorrectAtIndex([...newCorrectnessArray]);
      } else if (typedChar === sampleText[idxBeforeCursor]) {
        setIsCorrectAtIndex([
          ...isCorrectAtIndex.slice(0, cursorPosition),
          "correct",
        ]);
      } else {
        setOverallErrorsCount(overallErrorsCount + 1);
        setIsCorrectAtIndex([
          ...isCorrectAtIndex.slice(0, cursorPosition),
          "incorrect",
        ]);
      }
    } else {
      setIsCorrectAtIndex([]);
    }
  }, [inputText]);

  const renderCountdown = () => {
    if (testState === "running") {
      return (
        <Countdown
          initialTimer={initialTimer}
          // @ts-ignore
          timeoutId={timeoutId}
          finishTest={finishTest}
        />
      );
    } else if (testState === "completed") {
      // TODO: clean up how the stats display at the end
      return (
        <div className="countdown">
          <div>
            <p>WPM: {`${wpm}`}</p>
            <p>Accuracy: {`${accuracy}%`}</p>
            <p>Errors at finish: {`${errorsAtEnd}`}</p>
            <p>Overall errors made: {`${overallErrorsCount}`}</p>
          </div>
          <div className="countdown-box">
            <p>0</p>
          </div>
        </div>
      );
    } else {
      return <div className="countdown-placeholder"></div>;
    }
  };

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
        {renderCountdown()}
        <SampleText
          sampleText={sampleText}
          setSampleText={setSampleText}
          selectedLang={selectedLang}
          setSelectedLang={setSelectedLang}
          setInitialTimer={setInitialTimer}
          selectedTimer={selectedTimer}
          setSelectedTimer={setSelectedTimer}
          isCorrectAtIndex={isCorrectAtIndex}
          resetTest={resetTest}
        />
        <InputBox
          inputText={inputText}
          testState={testState}
          handleChange={handleChange}
          handleOnKeyUp={handleOnKeyUp}
          resetTest={resetTest}
        />
      </div>
    </div>
  );
}

export default App;
