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
    <div className="content">
      <header>
        <hr />
        <h1 className="title">tip tap</h1>
        <hr />
        <p>Welcome to <i>tip tap</i>, a typing test!</p>
      </header>

      <div>
        <SampleText clearInput={clearInput} />
        <InputBox inputText={inputText} handleKeypress={(e) => setInputText(e.target.value)} clearInput={clearInput} />
      </div>
    </div>
  )
}

export default App;
