import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { store, persistor } from "./store";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { PersistGate } from "redux-persist/integration/react";


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
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </HashRouter>
  </StrictMode>
);
