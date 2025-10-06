import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { store } from "./store";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";
import { CssBaseline, ThemeProvider, createTheme} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" }, // blue
    secondary: { main: "#dc004e" }, // red/pink
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Provider>
    </HashRouter>
  </StrictMode>
);
