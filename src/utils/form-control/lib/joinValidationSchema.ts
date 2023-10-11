import { FormValidationSchema, FormConfig } from "./types";

export default function joinValidationSchema<const Config extends FormConfig>(config: FormConfig) {
    return config.reduce((acc, field) => {
        if (!field.submitValidation) {
            return acc;
        }
        return {
            ...acc,
            [field.name]: field.submitValidation(field as any),
        };
    }, {}) as FormValidationSchema<Config>;
}
