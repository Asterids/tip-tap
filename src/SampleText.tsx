import { useEffect, useState } from "react";
import { SelectableTimers } from "./App";

type SelectableLanguages = "english" | "lorem" | "french";

export default function SampleText({
  resetTest,
  initialTimer,
  setInitialTimer,
}: {
  resetTest: () => void;
  initialTimer: SelectableTimers;
  setInitialTimer: (num: SelectableTimers) => void;
}) {
  const [selectedLang, setSelectedLang] =
    useState<SelectableLanguages>("english");
  const [selectedTimer, setSelectedTimer] =
    useState<SelectableTimers>(initialTimer);
  const [sampleText, setSampleText] = useState<string>("");

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
        "Sample text here. Sentences of words, the quick brown fox jumped over the lazy dog. Lorem ipsum dolor sit amet."
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

  return (
    <section className="sample-text-section" title="sample-text-section">
      <div className="settings">
        <div className="lang-selection">
          <a
            href="#tab"
            className={`${highlightSelectedLang("english")}`}
            onClick={() => handleSelectLanguage("english")}
            role="tab"
            aria-controls="english"
          >
            English
          </a>
          <a
            href="#tab"
            className={`${highlightSelectedLang("french")}`}
            onClick={() => handleSelectLanguage("french")}
            role="tab"
            aria-controls="french"
          >
            French
          </a>
          <a
            href="#tab"
            className={`${highlightSelectedLang("lorem")}`}
            onClick={() => handleSelectLanguage("lorem")}
            role="tab"
            aria-controls="lorem"
          >
            Lorem
          </a>
        </div>
        <div className="timer-selection">
          <a
            href="#tab"
            className={`${highlightSelectedTimer(30)}`}
            onClick={() => handleSelectTimer(30)}
            role="tab"
            aria-controls="30s"
          >
            30s
          </a>
          <a
            href="#tab"
            className={`${highlightSelectedTimer(60)}`}
            onClick={() => handleSelectTimer(60)}
            role="tab"
            aria-controls="60s"
          >
            60s
          </a>
          <a
            href="#tab"
            className={`${highlightSelectedTimer(90)}`}
            onClick={() => handleSelectTimer(90)}
            role="tab"
            aria-controls="90s"
          >
            90s
          </a>
          <a
            href="#tab"
            className={`${highlightSelectedTimer(120)}`}
            onClick={() => handleSelectTimer(120)}
            role="tab"
            aria-controls="120s"
          >
            120s
          </a>
        </div>
      </div>
      <div className="text-block">
        <p>{sampleText}</p>
      </div>
    </section>
  );
}
