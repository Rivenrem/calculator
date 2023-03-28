import PropTypes from "prop-types";

import { Input } from "Components/FC_Display/styled.js";

export default function FC_Display({ value }) {
  return <Input type="text" value={value} onChange={() => false} />;
}

FC_Display.propTypes = {
  value: PropTypes.string,
};
