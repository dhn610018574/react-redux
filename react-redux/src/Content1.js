import React, { Component } from "react";
import PropTypes from "prop-types";
import ThemeSwitch from "./ThemeSwitch";
import {connect} from 'react-redux';
class Content extends Component {
  static propTypes = {
    themeColor: PropTypes.string
  }
  render(){
    return(
      <h1 style={{color:this.props.themeColor}}>react content</h1>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    themeColor:state.themeColor
  }
}
Content = connect(mapStateToProps)(Content)
export default Content