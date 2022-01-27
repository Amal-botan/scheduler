import { useState } from "react"

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode)
  const [history, setHistory] = useState([initialMode]);

  function transition(newMode, replace = false) {
    if (replace) {
      history.pop();
    }
    setMode(newMode);
    history.push(newMode);

    setHistory([...history]);


  }

  function back() {
    if (history.length > 1) {

      setHistory([...history]);
      setMode(history[history.length - 1])
    }
  }




  return { mode, transition, back };
}

