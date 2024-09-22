import { App } from "./App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw Error("No root found to mount app in");
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ThemeProvider theme={{}}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
