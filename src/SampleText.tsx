import { useEffect } from "react";
import { SelectableLanguages, SelectableTimers } from "./App";

export default function SampleText({
  sampleText,
  setSampleText,
  selectedLang,
  setSelectedLang,
  setInitialTimer,
  selectedTimer,
  setSelectedTimer,
  isCorrectAtIndex,
  resetTest,
}: {
  sampleText: string;
  setSampleText: (str: string) => void;
  selectedLang: SelectableLanguages;
  setSelectedLang: (lang: SelectableLanguages) => void;
  setInitialTimer: (num: SelectableTimers) => void;
  selectedTimer: SelectableTimers;
  setSelectedTimer: (num: SelectableTimers) => void;
  isCorrectAtIndex: string[];
  resetTest: () => void;
}) {
  // TODO: Generate actual sample text
  const generateSampleText = (lang: SelectableLanguages = "english") => {
    // dummy text for now
    if (lang === "lorem") {
      setSampleText(
        "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet."
      );
    } else if (lang === "french") {
      setSampleText(
        "Le chat est sur la table, le souris est sous de la table, et le fromage est triste. Il y a des choux fleurs dans la boîte la bas."
      );
    } else {
      setSampleText(
        "The only people for me are the mad ones, the ones who are mad to live, mad to talk, mad to be saved, desirous of everything at the same time, the ones who never yawn or say a commonplace thing, but burn, burn, burn like fabulous yellow roman candles exploding like spiders across the stars."
      );
    }
  };

  const handleSelectLanguage = (lang: SelectableLanguages) => {
    setSelectedLang(lang);
    resetTest();
    generateSampleText(lang);
  };

  const handleSelectTimer = (time: SelectableTimers) => {
    setInitialTimer(time);
    setSelectedTimer(time);
    resetTest();
  };

  const highlightSelectedLang = (lang: string) => {
    return selectedLang === lang ? "selected" : "";
  };

  const highlightSelectedTimer = (time: SelectableTimers) => {
    return selectedTimer === time ? "selected" : "";
  };

  useEffect(() => {
    generateSampleText();
  }, []);

  const languageTab = (val: SelectableLanguages) => {
    return (
      <a
        href="#tab"
        className={`${highlightSelectedLang(val)}`}
        onClick={() => handleSelectLanguage(val)}
        role="tab"
        aria-controls={`${val}`}
      >
        {val}
      </a>
    );
  };

  const timerTab = (val: SelectableTimers) => {
    return (
      <a
        href="#tab"
        className={`${highlightSelectedTimer(val)}`}
        onClick={() => handleSelectTimer(val)}
        role="tab"
        aria-controls={`${val}s`}
      >
        {val}s
      </a>
    );
  };

  // TODO: Have sample text advance/scroll down as typing progresses
  return (
    <section className="sample-text-section" title="sample-text-section">
      <div className="settings">
        <div className="lang-selection">
          {languageTab("english")}
          {languageTab("french")}
          {languageTab("lorem")}
        </div>
        <div className="timer-selection">
          {timerTab(30)}
          {timerTab(60)}
          {timerTab(90)}
          {timerTab(120)}
        </div>
      </div>
      <div className="text-block">
        <p>
          {sampleText.split("").map((char, idx) => (
            <span key={idx} className={`${isCorrectAtIndex[idx]}`}>
              {char}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
