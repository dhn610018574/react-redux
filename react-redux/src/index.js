import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./index.css";
import Header1 from "./Header";
import Content1 from "./Content";
import { Provider } from 'react-redux'
import { createStore } from 'redux'

class Index extends Component {
  // static childContextTypes = {
  //   store:PropTypes.object
  // }
  // getChildContext () {
  //   return {store}
  // }
  render() {
    return (
      <div>
        <Header1 />
        <Content1 />
      </div>
    );
  }
}
//制作store
// function createStore(reducer) {
//   let state = null;
//   const listeners = [];
//   const getState = () => state;
//   const subscribe = listener => listeners.push(listener);
//   const dispatch = (action) => {
//     state = reducer(state, action);
//     listeners.forEach(listener => listener());
//   };
//   dispatch({});
//   return { getState, dispatch, subscribe };
// }
const themeReducer = (state,action) => {
  if(!state) return {
    themeColor:'red'
  }
  switch(action.type) {
    case 'CHANGE_COLOR':
    return {...state,themeColor:action.themeColor}
    default:
    return state
  }
}

const store = createStore(themeReducer)
ReactDOM.render(
  <Provider store={store}>
    <Index></Index>
  </Provider>,
  document.getElementById('root')
)