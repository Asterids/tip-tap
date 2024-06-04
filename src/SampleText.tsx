import { useState } from "react"

export type SelectableLanguages = 'english' | 'lorem' | 'french';

export default function SampleText ({ clearInput }: any) {
  const [selectedLang, setSelectedLang] = useState<SelectableLanguages>('english');
  const [sampleText, setSampleText] = useState<string>("Sample text here. Sentences of words, the quick brown fox jumped over the lazy dog. Lorem ipsum dolor sit amet.");

  const generateSampleText = () => {
    return "Sample text here. Sentences of words, the quick brown fox jumped over the lazy dog. Lorem ipsum dolor sit amet."
  };

  const handleSelectTab = (lang: SelectableLanguages) => {
    setSelectedLang(lang);
    clearInput();
    setSampleText(generateSampleText());
  }

  const highlightIfSelected = (lang: string) => {
    return selectedLang === lang ? 'selected' : '';
  }

  return (
    <section className="sample-text">
      <div className="lang-selection">
        <button className={`lang-selection-tab ${highlightIfSelected('lorem')}`} onClick={() => handleSelectTab('lorem')} value="lorem" name="lorem">Lorem</button>
        <button className={`lang-selection-tab ${highlightIfSelected('english')}`} onClick={() => handleSelectTab('english')} value="english" name="english">English</button>
        <button className={`lang-selection-tab ${highlightIfSelected('french')}`} onClick={() => handleSelectTab('french')} value="french" name="french">French</button>
      </div>
      <div className="text-block">
        <p>
          {sampleText}
        </p>
      </div>
    </section>
  )
};
