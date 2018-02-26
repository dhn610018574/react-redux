// 制作createStore
function createStore(reducer) {
  let state = null;
  const listeners = [];
  const getState = () => state;
  const subscribe = listener => listeners.push(listener);
  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };
  dispatch({}); //初始化state
  return { getState, dispatch, subscribe };
}
//初始化state 定义规则
function themeReducer (state, action) {
  if (!state) return {
    themeName: 'Red Theme',
    themeColor: 'red'
  }
  switch (action.type) {
    case 'UPATE_THEME_NAME':
      return { ...state, themeName: action.themeName }
    case 'UPATE_THEME_COLOR':
      return { ...state, themeColor: action.themeColor }
    default:
      return state
  }
}
// 渲染函数
function renderTitle(newTitle, oldTitle) {
  if (newTitle === oldTitle) return;
  console.log("render title");
  const titleDOM = document.getElementById("title");
  titleDOM.innerHTML = newTitle.themeName;
  titleDOM.style.color = newTitle.themeColor;
}


const store = createStore(themeReducer)
let oldState = store.getState();
renderTitle(oldState,{})
store.subscribe(() => {
  let newState = store.getState()
  renderTitle(newState,oldState)
  oldState = newState
})
store.dispatch({type:'UPATE_THEME_NAME',themeName:'blue Theme'})
store.dispatch({type:'UPATE_THEME_COLOR',themeColor:'blue'})