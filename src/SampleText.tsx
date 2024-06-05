import { useEffect, useState } from "react"

export type SelectableLanguages = 'english' | 'lorem' | 'french';

export default function SampleText ({ clearInput }: any) {
  const [selectedLang, setSelectedLang] = useState<SelectableLanguages>('english');
  const [sampleText, setSampleText] = useState<string>('');

  const generateSampleText = (lang: SelectableLanguages = 'english') => {
    // dummy text for now
    if (lang === 'lorem') {
      setSampleText('Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.')
    } else if (lang === 'french') {
      setSampleText('Le chat est sur la table, le souris es sous de la table, et le fromage est triste. Il y a des choux fleurs dans la boîte la bas.')
    } else {
      setSampleText('Sample text here. Sentences of words, the quick brown fox jumped over the lazy dog. Lorem ipsum dolor sit amet.')
    }
  }

  const handleSelectTab = (lang: SelectableLanguages) => {
    setSelectedLang(lang);
    clearInput();
    generateSampleText(lang);
  }

  const highlightIfSelected = (lang: string) => {
    return selectedLang === lang ? 'selected' : '';
  }

  useEffect(() => {
    generateSampleText();
  }, [])

  return (
    <section className="sample-text-section" title="sample-text-section">
      <div className="lang-selection">
        <a href="#tab" className={`${highlightIfSelected('english')}`} onClick={() => handleSelectTab('english')} data-value="english" role="tab" aria-controls="english">English</a>
        <a href="#tab" className={`${highlightIfSelected('french')}`} onClick={() => handleSelectTab('french')} data-value="french" role="tab" aria-controls="french">French</a>
        <a href="#tab" className={`${highlightIfSelected('lorem')}`} onClick={() => handleSelectTab('lorem')} data-value="lorem" role="tab" aria-controls="lorem">Lorem</a>
      </div>
      <div className="text-block">
        <p>
          {sampleText}
        </p>
      </div>
    </section>
  )
};
