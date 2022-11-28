import { createStore } from "redux";
import { reducer } from "./reducers/index";

// convert object to string and store in localStorage
function saveToLocalStorage(state) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState === null) return undefined;
    const tmp=JSON.parse(serialisedState);
    tmp["inprogress"]=false
    tmp["updated"]=undefined
    tmp['gameover']=false
    tmp['finaltime']=0
    tmp['rawwpm']=[]
    return tmp
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

// create our store from our rootReducers and use loadFromLocalStorage
// to overwrite any values that we already have saved
const store = createStore(
  reducer,
  loadFromLocalStorage(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// listen for store changes and use saveToLocalStorage to
// save them to localStorage
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
