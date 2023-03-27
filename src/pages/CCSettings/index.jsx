import { Component } from "react";
import { connect } from "react-redux";

import {
  Container,
  Button,
  Header,
  Theme,
  Select,
} from "Pages/FCSettings/styled.js";

import {
  setLightTheme,
  setDarkTheme,
  setDefaultTheme,
} from "Store/slices/themeSlice.js";

class ClassSettingsPage extends Component {
  selectHandler = () => {
    const { dispatch } = this.props;

    const value = document.querySelector("#themeSelect").value;
    if (value === "dark") {
      dispatch(setDarkTheme());
    } else if (value === "light") {
      dispatch(setLightTheme());
    } else {
      dispatch(setDefaultTheme());
    }
  };

  render() {
    return (
      <Container>
        <Header>Settings</Header>
        <Theme>
          <label htmlFor="themeSelect">Switch Theme</label>
          <Select id="themeSelect" onChange={this.selectHandler}>
            <option value="default">System Theme</option>
            <option value="light">Light Theme</option>
            <option value="dark">Dark Theme</option>
          </Select>
        </Theme>
        <Button>Clean All History</Button>
      </Container>
    );
  }
}

export default connect()(ClassSettingsPage);
