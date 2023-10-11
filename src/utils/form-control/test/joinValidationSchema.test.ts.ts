import * as Yup from "yup";

import { type FormConfig, type SelectConfig, type TextFieldConfig } from "..";
import joinValidationSchema from "../lib/joinValidationSchema";

describe("joinValidationSchema", () => {
    it("should join validation schemas from the configuration", () => {
        const textConfig: TextFieldConfig<"string"> = {
            inputType: "text",
            valueType: "string",
            name: "textField",
            label: "Text Field",
            render: () => null,
            submitValidation: () => Yup.string().required("Text Field is required"),
        };

        const selectConfig: SelectConfig<"number"> = {
            inputType: "select",
            valueType: "number",
            name: "selectField",
            label: "Select Field",
            options: [{ value: 1, label: "Option 1" }],
            render: () => null,
            submitValidation: () => Yup.number().required("Select Field is required"),
        };

        const config: FormConfig = [textConfig, selectConfig];
        const validationSchema = joinValidationSchema(config);

        expect(validationSchema).toEqual({
            textField: Yup.string().required("Text Field is required"),
            selectField: Yup.number().required("Select Field is required"),
        });
    });

    it("should handle missing submitValidation functions", () => {
        const textConfig: TextFieldConfig<"string"> = {
            inputType: "text",
            valueType: "string",
            name: "textField",
            label: "Text Field",
            render: () => null,
        };

        const selectConfig: SelectConfig<"number"> = {
            inputType: "select",
            valueType: "number",
            name: "selectField",
            label: "Select Field",
            options: [{ value: 1, label: "Option 1" }],
            render: () => null,
        };

        const config: FormConfig = [textConfig, selectConfig];
        const validationSchema = joinValidationSchema(config);

        expect(validationSchema).toEqual({});
    });

    it("should handle an empty configuration", () => {
        const config: FormConfig = [];
        const validationSchema = joinValidationSchema(config);

        expect(validationSchema).toEqual({});
    });
});
