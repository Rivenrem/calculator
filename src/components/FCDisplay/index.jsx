import { Input } from "Components/FCDisplay/styled.js";

export default function Display({ value }) {
  return <Input type="text" value={value} onChange={() => false} />;
}
