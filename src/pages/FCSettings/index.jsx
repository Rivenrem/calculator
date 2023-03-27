import {
  Container,
  Button,
  Header,
  Theme,
  Select,
} from "Pages/FCSettings/styled.js";
import { useDispatch } from "react-redux";
import {
  setLightTheme,
  setDarkTheme,
  setDefaultTheme,
} from "Store/slices/themeSlice.js";

import { setHistory } from "Store/slices/calculatorSlice.js";

export default function Settings() {
  const dispatch = useDispatch();

  function selectHandler() {
    const value = document.querySelector("#themeSelect").value;
    if (value === "dark") {
      dispatch(setDarkTheme());
    } else if (value === "light") {
      dispatch(setLightTheme());
    } else {
      dispatch(setDefaultTheme());
    }
  }

  return (
    <Container>
      <Header>Settings</Header>

      <Theme>
        <label htmlFor="themeSelect">Switch Theme</label>
        <Select
          id="themeSelect"
          onChange={() => {
            selectHandler();
          }}
        >
          <option value="default">System Theme</option>
          <option value="light">Light Theme</option>
          <option value="dark">Dark Theme</option>
        </Select>
      </Theme>

      <Button onClick={() => dispatch(setHistory([]))}>
        Clean All History
      </Button>
    </Container>
  );
}
