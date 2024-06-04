import './App.css'
import SampleText from './SampleText'
import InputBox from './InputBox'
import { useState } from 'react'

function App() {
  const [inputText, setInputText] = useState<string>('');

  const clearInput = () => {
    setInputText('');
  };

  return (
    <>
      <header>
        <hr />
        <h1 className="title">tip tap</h1>
        <hr />
        <p>Welcome to <i>tip tap</i>, a typing test!</p>
      </header>

      <section className="content">
        <SampleText clearInput={clearInput} />
        <InputBox inputText={inputText} setInputText={setInputText} />
      </section>
    </>
  )
}

export default App;
