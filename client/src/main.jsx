import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Custom theme with adjustable primary & secondary colors
const theme = createTheme({
  palette: {
    mode: "light", // or "dark"
    primary: {
      main: "#00802b", // Change this to any color (e.g. "#ff5722")
    },
    secondary: {
      main: "#9c27b0", // Change this to any color (e.g. "#4caf50")
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
