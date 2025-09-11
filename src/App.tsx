import { Outlet } from "react-router-dom";

import "./App.css";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { theme } from "./theme";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Outlet />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
