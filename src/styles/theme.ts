import { createTheme } from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: "'Helvetica Neue', sans-serif;",
        body1: {
            fontSize: "0.875rem",
        },
    },
    palette: {
        primary: {
            light: "#757ce8",
            main: "#3f50b5",
            dark: "#002884",
            contrastText: "#fff",
        },
        secondary: {
            light: "#ff7961",
            main: "#CA5F5C",
            dark: "#ba000d",
            contrastText: "#fff",
        },
    },
});

export default theme;
