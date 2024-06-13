import { ChangeEvent } from "react";
import { TestStates } from "./App";

type InputBoxProps = {
  inputText: string;
  testState: TestStates;
  handleKeypress: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  resetTest: () => void;
};

export default function InputBox({
  inputText,
  testState,
  handleKeypress,
  resetTest,
}: InputBoxProps) {
  return (
    <section className="input-section" title="input-section">
      <form className="input-box">
        <div className="input-box-header">
          <label htmlFor="type-here">Type to begin:</label>
          {(testState === "running" || testState === "completed") && (
            <button id="reset" onClick={resetTest}>
              Reset
            </button>
          )}
        </div>
        <textarea
          id="type-here"
          rows={10}
          cols={19}
          value={inputText}
          onChange={handleKeypress}
          disabled={testState === "completed"}
        />
      </form>
    </section>
  );
}
