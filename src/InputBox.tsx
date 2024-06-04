export default function InputBox ({ inputText }: any) {
  return (
    <section className="input-container">
      <form className="input-box">
        <div className="input-box-header">
          <label htmlFor="type-here">Type to begin:</label>
          {/* if isTestInProgress, show timer counting down & Reset button */}
            {/* <p id="timer">{timerLabel}</p> */}
            {/* <button id="reset" onClick={resetTest}>Reset</button> */}
        </div>
        <textarea id="type-here" rows={10} cols={19} value={inputText} />
      </form>
    </section>
)
};
