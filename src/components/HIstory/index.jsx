import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function History() {
  const currentHistory = useSelector((state) => state.calculator.history);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory([...history, currentHistory]);
  }, [currentHistory]);

  return (
    <div>
      {history.map((historyItem, index) => (
        <p key={index}>{historyItem}</p>
      ))}
    </div>
  );
}
