import { ThemeProvider } from "@mui/material";

import SomeFormPage from "pages/some-form-page";

import theme from "styles/theme";

import TranslationsProvider from "translations/TranslationsProvider";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <TranslationsProvider>
                <main>
                    <SomeFormPage />
                </main>
            </TranslationsProvider>
        </ThemeProvider>
    );
}

export default App;
