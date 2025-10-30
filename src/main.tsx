import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { store } from "./store";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";
import { CustomThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Provider store={store}>
        <CustomThemeProvider>
          <App />
        </CustomThemeProvider>
      </Provider>
    </HashRouter>
  </StrictMode>
);