import { ChangeEvent, KeyboardEvent } from "react";
import { TestStates } from "./App";

type InputBoxProps = {
  inputText: string;
  testState: TestStates;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleOnKeyUp: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  resetTest: () => void;
};

export default function InputBox({
  inputText,
  testState,
  handleChange,
  handleOnKeyUp,
  resetTest,
}: InputBoxProps) {
  return (
    <section className="input-section" title="input-section">
      <form className="input-box">
        <div className="input-box-header">
          <label htmlFor="typing-textarea">Type to begin:</label>
          {(testState === "running" || testState === "completed") && (
            <button id="reset" onClick={resetTest}>
              Reset
            </button>
          )}
        </div>
        <textarea
          id="typing-textarea"
          rows={10}
          cols={19}
          value={inputText}
          onChange={handleChange}
          onKeyUp={handleOnKeyUp}
          disabled={testState === "completed"}
          className={testState === "completed" ? "inactivated" : ""}
        />
      </form>
    </section>
  );
}
