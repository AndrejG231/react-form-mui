import * as Yup from "yup";
import { type ReactNode } from "react";

import extractDefaultValues from "./extractDefaultValues";
import renderFields from "./renderFields";
import joinValidationSchema from "./joinValidationSchema";

import { FieldValues, FormConfig } from "./types";

type CreateConfigResult<Config extends FormConfig> = {
    fields: Config;
    defaultValues: FieldValues<Config>;
    validationSchema: any;
    render: () => ReactNode;
};

export default function createFormConfig<const Config extends FormConfig>(
    config: Config
): CreateConfigResult<Config> {
    return {
        fields: config,
        defaultValues: extractDefaultValues(config),
        validationSchema: Yup.object().shape(joinValidationSchema(config)),
        render: () => renderFields(config),
    };
}
