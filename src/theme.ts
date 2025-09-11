import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#3B82F6", dark: "#2563EB" },
    error: { main: "#DC2626" },
    background: { default: "#f8fafc", paper: "#f8fafc" },
    text: { primary: "#111827", secondary: "#6B7280" },
    divider: "#E5E7EB",
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: { root: { textTransform: "none", boxShadow: "none" } },
    },
    MuiCssBaseline: {
      styleOverrides: { body: { backgroundColor: "#f8fafc" } },
    },
  },
  // (선택) 폰트
  typography: {
    fontFamily:
      'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans KR", sans-serif',
  },
});
