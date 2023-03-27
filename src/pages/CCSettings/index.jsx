import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  Container,
  Button,
  Header,
  Theme,
  Select,
} from "Pages/CCSettings/styled.js";

import {
  setLightTheme,
  setDarkTheme,
  setDefaultTheme,
} from "Store/slices/themeSlice.js";

import { setHistory } from "Store/slices/calculatorSlice.js";

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

  cleanHistory = () => {
    const { dispatch } = this.props;
    dispatch(setHistory([]));
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
        <Button onClick={this.cleanHistory}>Clean All History</Button>
      </Container>
    );
  }
}

ClassSettingsPage.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(ClassSettingsPage);
