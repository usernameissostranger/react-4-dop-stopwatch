import React, { useState, useEffect } from 'react';
import './style.css';

function App() {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [results, setResults] = useState([]);

  useEffect(() => {
    let timer = null;

    if (running) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [running]);

  const handleStart = () => {
    setRunning(true);
  };

  const handleStop = () => {
    setRunning(false);
    setResults(prevResults => [time, ...prevResults]);
  };

  const formatTime = milliseconds => {
    const seconds = Math.floor(milliseconds / 1000);
    const remainingMilliseconds = milliseconds % 1000;
    return `${seconds}.${remainingMilliseconds}`;
  };

  return (
    <div className="container">
      <h1 className="heading">Stopwatchs</h1>
      <p className="timer">Время: {formatTime(time)} сек.</p>
      <button className="button" onClick={handleStart}>
        Старт
      </button>
      <button className="button" onClick={handleStop}>
        Стоп
      </button>
      <h2 className="heading">Последние результаты:</h2>
      <ul className="resultsList">
        {results.map((result, index) => (
          <li key={index} className="resultItem">
            {formatTime(result)} сек.
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
