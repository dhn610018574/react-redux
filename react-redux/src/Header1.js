import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// pure（dumb）组件Header:只依赖外部props数据(只需要看props类型传入响应props就可以)
class Header extends Component {
  static propTypes = {
    themeColor: PropTypes.string
  }
  render(){
    return (
      <h1 style={{color:this.props.themeColor}}>react header</h1>
    )
  }
}
// 指定需要获取的数据
const mapStateToProps = (state) => {
  return {
    themeColor:state.themeColor
  }
}

Header = connect(mapStateProps)(Header)
export default Header