
import React, { Component } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import './Layout.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
      state = {
            showSideDrawer: false
      }
      sideDrawerCloseHandler = () => {
            this.setState({ showSideDrawer: false })
      }

      sideDrawerToggleHandler = () => {
            this.setState({ showSideDrawer: !this.state.showSideDrawer })
      }

      render() {
            return (
                  <Auxiliary>
                        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                        <SideDrawer
                              open={this.state.showSideDrawer}
                              closed={this.sideDrawerCloseHandler} />
                        <main className="Content">
                              {this.props.children}
                        </main>
                  </Auxiliary>
            )
      }
}
export default Layout;
