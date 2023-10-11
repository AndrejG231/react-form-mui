import i18n from "i18next";
import { type PropsWithChildren } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";

import translations_cs from "./resources/cs/translations.json";

const resources = {
	cs: {
		translation: translations_cs,
	}
};

i18n
	.use(initReactI18next)
	.init({
		resources,
		lng: "cs",
		interpolation: {
			escapeValue: false,
		},
	});

function TranslationsProvider({ children }: PropsWithChildren) {
	return (
		<I18nextProvider i18n={i18n}>{children}</I18nextProvider>
	);
}

export default TranslationsProvider;