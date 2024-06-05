import { ChangeEvent } from "react";

type InputBoxProps = {
  inputText: string;
  isTestInProgress: boolean;
  handleKeypress: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  resetTest: () => void;
};

export default function InputBox({
  inputText,
  isTestInProgress,
  handleKeypress,
  resetTest,
}: InputBoxProps) {
  return (
    <section className="input-section" title="input-section">
      <form className="input-box">
        <div className="input-box-header">
          <label htmlFor="type-here">Type to begin:</label>
          {isTestInProgress && (
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
        />
      </form>
    </section>
  );
}
