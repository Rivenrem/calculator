import { Input } from "Components/FCDisplay/styled.js";

import PropTypes from "prop-types";

export default function Display({ value }) {
  return <Input type="text" value={value} onChange={() => false} />;
}

Display.propTypes = {
  value: PropTypes.string,
};
