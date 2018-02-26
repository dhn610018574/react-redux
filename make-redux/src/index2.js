// 初始数据
const appState = {
  title: {
    text: "react 小书",
    color: "red"
  },
  content: {
    text: "react 内容",
    color: "blue"
  }
};
// 渲染title
function renderTitle(newTitle, oldTitle) {
  if (newTitle === oldTitle) return;
  console.log("render title");
  const titleDOM = document.getElementById("title");
  titleDOM.innerHTML = newTitle.text;
  titleDOM.style.color = newTitle.color;
}
// 渲染内容
function renderContent(newContent, oldContent) {
  if (newContent === oldContent) return;
  console.log("render content");
  const contentDOM = document.getElementById("content");
  contentDOM.innerHTML = newContent.text;
  contentDOM.style.color = newContent.color;
}
// 渲染函数
function renderApp(newAppState, oldAppState = {}) {
  if (newAppState == oldAppState) return;
  console.log("render app");
  renderTitle(newAppState.title, oldAppState.title);
  renderContent(newAppState.content, oldAppState.content);
}
// 监控数据变化函数
function dispatch(action) {
  console.log(action);
  switch (action.type) {
    case "UPDATE_TITLE_TEXT":
      appState.title.text = action.text;
      break;
    case "UPDATE_TITLE_COLOR":
      appState.title.color = action.color;
      break;
    default:
      break;
  }
}
// 生产state,dispatch 和 subscribe
function createStore(state, stateChange) {
  const listeners = [];
  const subscribe = listener => listeners.push(listener);
  const getState = () => state;
  const dispatch = action => {
    state = stateChange(state, action);//覆盖原来的state
    listeners.forEach(listener => listener());
  };
  return { getState, dispatch, subscribe };
}
// state变化规则函数
function stateChange(state, action) {//返回更新后的state，没有更新则返回老的state
  switch (action.type) {
    case 'UPDATE_CONTENT_TEXT':
      return {
        ...state,
        content:{
          ...state.content,
          text:action.text
        }
      }
      break;
    case "UPDATE_CONTENT_COLOR":
      return {
        ...state,
        content:{
          ...state.content,
          color:action.color
        }
      }
      break;
    default:
    return state
      break;
  }
}
const store = createStore(appState, stateChange);
let oldState = store.getState();//缓存老的数据
store.subscribe(() => {
  let newState = store.getState();//数据可能发生变化，重新获取最新数据
  renderApp(newState,oldState);
  oldState = newState; //更新老数据
}); //传入渲染函数，不必每次手动更新渲染
renderApp(store.getState()); //首次渲染
store.dispatch({ type: "UPDATE_CONTENT_TEXT", text: "2018" });
store.dispatch({ type: "UPDATE_CONTENT_COLOR", color: "cyan" });
// renderApp(store.getState()); //更新数据后重新渲染

// renderApp(appState);
// dispatch({ type: "UPDATE_TITLE_TEXT", text: "练习" });
// dispatch({ type: "UPDATE_TITLE_COLOR", color: "cyan" });
// renderApp(appState);
