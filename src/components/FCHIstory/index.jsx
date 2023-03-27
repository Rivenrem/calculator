import bracketsToString from "Utils/bracketsToString.js";
import PropTypes from "prop-types";

import { Container, HistoryItem } from "Components/FCHistory/styled.js";
import { useState } from "react";

export default function History({ history = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container
      onClick={() => setIsOpen(!isOpen)}
      className={isOpen ? "open" : null}
    >
      <p>{isOpen ? "History:" : "Open History ↓"}</p>
      {history.map((historyItem, index) => (
        <HistoryItem key={index}>
          {bracketsToString(historyItem, historyItem)}
        </HistoryItem>
      ))}
    </Container>
  );
}

History.propTypes = {
  history: PropTypes.array,
};
