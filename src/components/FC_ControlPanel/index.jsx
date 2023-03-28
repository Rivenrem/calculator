import { useDispatch, useSelector } from "react-redux";

import { setShowHistory } from "Store/slices/calculatorSlice.js";

import { Button } from "Components/FC_ControlPanel/styled.js";

export default function FC_ControlPanel() {
  const dispatch = useDispatch();
  const isHistoryVisible = useSelector((state) => state.calculator.showHistory);

  return (
    <Button onClick={() => dispatch(setShowHistory())}>
      {isHistoryVisible ? "Hide History" : "Show History"}
    </Button>
  );
}
