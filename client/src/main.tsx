import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const theme = createTheme({
  typography: {
    fontFamily: "'Orbitron', 'Helvetica', 'Arial', sans-serif",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
        <ToastContainer />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
