import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/app";
import { RootStore } from "./stores/rootStore";
import { StoreContext } from "./hooks/useStore";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = new RootStore();

root.render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </StoreContext.Provider>
);
