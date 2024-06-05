import { ChangeEvent } from "react";

type InputBoxProps = {
  inputText: string;
  handleKeypress: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  clearInput: () => void;
}

export default function InputBox ({ inputText, handleKeypress, clearInput }: InputBoxProps) {
  return (
    <section className="input-section" title="input-section">
      <form className="input-box">
        <div className="input-box-header">
          <label htmlFor="type-here">Type to begin:</label>
          {/* if isTestInProgress, show timer counting down & Reset button */}
            {/* <p id="timer">{timerLabel}</p> */}
            <button id="reset" onClick={clearInput}>Reset</button>
        </div>
        <textarea id="type-here" rows={10} cols={19} value={inputText} onChange={handleKeypress} />
      </form>
    </section>
)
};
