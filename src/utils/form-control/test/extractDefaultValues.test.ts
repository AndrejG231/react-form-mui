import extractDefaultValues from "../lib/extractDefaultValues";
import { type FormConfig } from "../lib/types";

describe("extractDefaultValues", () => {
    it("should extract default values from the configuration", () => {
        const config: FormConfig = [
            {
                inputType: "text",
                valueType: "string",
                name: "field1",
                label: "Field 1",
                defaultValue: "Default Value 1",
                render: () => null,
            },
            {
                inputType: "select",
                valueType: "number",
                name: "field2",
                label: "Field 2",
                defaultValue: 42,
                options: [{ value: 42, label: "Option 1" }],
                render: () => null,
            },
        ];

        const defaultValues = extractDefaultValues(config);

        expect(defaultValues).toEqual({
            field1: "Default Value 1",
            field2: 42,
        });
    });

    it("should handle missing default values", () => {
        const config: FormConfig = [
            {
                inputType: "text",
                valueType: "string",
                name: "field1",
                label: "Field 1",
                render: () => null,
            },
        ];

        const defaultValues = extractDefaultValues(config);

        expect(defaultValues).toEqual({
            field1: undefined,
        });
    });

    it("should handle multiple fields with the same name and different types", () => {
        const config: FormConfig = [
            {
                inputType: "text",
                valueType: "string",
                name: "field1",
                label: "Field 1",
                defaultValue: "Default String",
                render: () => null,
            },
            {
                inputType: "number",
                valueType: "number",
                name: "field1",
                label: "Field 2",
                defaultValue: 42,
                render: () => null,
            },
        ];

        const defaultValues = extractDefaultValues(config);

        expect(defaultValues).toEqual({
			field1: 42
        });
    });

    it("should handle fields with different value types", () => {
        const config: FormConfig = [
            {
                inputType: "text",
                valueType: "string",
                name: "field1",
                label: "Field 1",
                defaultValue: "Default String",
                render: () => null,
            },
            {
                inputType: "text",
                valueType: "number",
                name: "field2",
                label: "Field 2",
                defaultValue: 42,
                render: () => null,
            },
        ];

        const defaultValues = extractDefaultValues(config);

        expect(defaultValues).toEqual({ field1: 'Default String', field2: 42 });
    });
});
