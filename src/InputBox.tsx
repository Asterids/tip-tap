import { ChangeEvent } from "react";
import Timer from "./assets/Timer";

type InputBoxProps = {
  inputText: string;
  isTestInProgress: boolean;
  handleKeypress: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  clearInput: () => void;
};

export default function InputBox({
  inputText,
  isTestInProgress,
  handleKeypress,
  clearInput,
}: InputBoxProps) {
  return (
    <section className="input-section" title="input-section">
      <form className="input-box">
        <div className="input-box-header">
          <label htmlFor="type-here">Type to begin:</label>
          {isTestInProgress && <Timer />}
          {isTestInProgress && (
            <button id="reset" onClick={clearInput}>
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
        />
      </form>
    </section>
  );
}
