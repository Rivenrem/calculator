import { useSelector } from "react-redux";
import { Input } from "./styled.js";

export default function Display() {
  let value = useSelector((state) => state.calculator.inputValue);

  return (
    <Input
      type="text"
      value={value}
      onChange={() => {
        return;
      }}
    ></Input>
  );
}
