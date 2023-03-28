import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { Container, HistoryItem } from "Components/FC_History/styled.js";

import bracketsToString from "Utils/bracketsToString.js";

export default function FC_History({ history = [] }) {
  const isHistoryVisible = useSelector((state) => state.calculator.showHistory);

  return (
    <Container id="history" className={isHistoryVisible ? "open" : null}>
      {history.map((historyItem, index) => (
        <HistoryItem id="historyItem" key={index}>
          {bracketsToString(historyItem, historyItem)}
        </HistoryItem>
      ))}
    </Container>
  );
}

FC_History.propTypes = {
  history: PropTypes.array,
};
