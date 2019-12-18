import React, { Component } from "react";
import classes from "./Layout.module.css";
import { connect } from "react-redux";

import Toolbar from "../../components/Navigation/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer";

class Layout extends Component {
  state = {
    sideDrawerOn: false
  };

  closeSideDrawer = () => {
    this.setState({
      sideDrawerOn: false
    });
  };

  toggleSideDrawer = () => {
    this.setState(prevState => {
      return { sideDrawerOn: !prevState.sideDrawerOn };
    });
  };

  render() {
    return (
      <>
        <Toolbar
          isLoggedIn={this.props.isLoggedIn}
          toggleSideDrawer={this.toggleSideDrawer}
        />
        <SideDrawer
          isLoggedIn={this.props.isLoggedIn}
          sideDrawerOn={this.state.sideDrawerOn}
          closeSideDrawer={this.closeSideDrawer}
          backdropOn={this.state.sideDrawerOn}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = ({ auth: { token } }) => ({
  isLoggedIn: token !== null
});

export default connect(mapStateToProps)(Layout);
