import React, { useState, useRef } from 'react'

const App = () => {
  const [time, setTime] = useState(0);
  const [renders, setRenders] = useState(0);
  const [inputText, setInputText] = useState('');
  // Create 'didReset' stste to check if the 'reset' button was clicked or not
  const [didReset, setDidReset] = useState(false);
  // 'useRef' is a hook that is used to make reference to a value that is not required for rendering
  // 'useRef' returns an object whose 'ref.current' value is set to the initial that is passed to the hook when it's being initialized
  const timer = useRef(0);
  const inputCounterRef = useRef(0);
  const timerIdRef = useRef(null);
  const inputRef = useRef(null);
  console.log(timer, typeof(timer));

  const handleChange = e => {
    e.preventDefault();
    setInputText(e.target.value);
    // 'ref.current' can only be read, written or updated in either the body of an event-handler or useEffect
    inputCounterRef.current++;
    console.log(inputCounterRef.current);
    setRenders(inputCounterRef.current);
  }

  const handleStart = () => {
    // If 'reset' was clicked
    if(didReset === true) {
      // Set 'timer.current' value to zero
      timer.current = 0;
      timerIdRef.current = setInterval(() => {
        timer.current++;
        console.log(timer.current);
        setTime(timer.current);
      }, 1000);
    } else {
      timerIdRef.current = setInterval(() => {
        timer.current++;
        console.log(timer.current);
        setTime(timer.current);
      }, 1000);
    }
  }

  const handleStop = () => {
    clearInterval(timerIdRef.current);
    setDidReset(false);
  }

  const handleReset = () => {
    setDidReset(true);
    clearInterval(timerIdRef.current);
    setTime(0);
  }

  const handleFocus = () => {
    inputRef.current.focus();
  }

  return (
    <div className='container'>
      <input className="inputContainer" ref={inputRef} type="text" placeholder="Provide a random text..." id="words" value={inputText} onChange={handleChange} />
      <p className="renders">Renders: {renders} times</p>
      <button onClick={handleFocus} className="focusBtn">Focus</button>
      <div className="btnContainer">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <p className="seconds">Seconds: {time} sec(s)</p>
      <p className="data">{inputText}</p>
    </div>
  )
}

export default App
