import { FieldValues, FormConfig } from "./types";

export default function extractDefaultValues<Config extends FormConfig>(config: Config) {
    return config.reduce(
        (acc, field) => ({ ...acc, [field.name]: field.defaultValue }),
        {}
    ) as FieldValues<Config>;
}
