import React from "react";
import { Provider } from "react-redux";

import { Router } from "./components/Router";
import { store } from "./store";

import "./App.css";

function App() {
  // const [name, setName] = useState("default");
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;

