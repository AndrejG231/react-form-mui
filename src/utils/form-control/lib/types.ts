import * as Yup from "yup";
import { type HTMLInputTypeAttribute, type ReactNode } from "react";

type ValueType = "string" | "number" | "boolean";

export type SelectOptions<TValue extends ValueType> = ReadonlyArray<{
    value: ValueRealType<TValue>;
    label: string;
}>;

export type BaseControlConfig<
    TInput extends HTMLInputTypeAttribute,
    TValue extends ValueType = ValueType
> = {
    inputType: TInput;
    valueType: TValue;
    name: string;
    label: string;
    defaultValue?: ValueRealType<TValue>;
};

export type TextFieldConfig<TValue extends ValueType> = BaseControlConfig<
    HTMLInputTypeAttribute,
    TValue
> & {
    render: (props: TextFieldConfigProps<TValue>) => ReactNode;
    changeValidation?: (value: string) => boolean;
    submitValidation?: (config: SelectConfig<TValue>) => ValueYupType<TValue>;
};

export type SelectConfig<TValue extends ValueType> = BaseControlConfig<"select", TValue> & {
    options: SelectOptions<TValue>;
    render: (props: SelectConfigProps<TValue>) => ReactNode;
    submitValidation?: (config: SelectConfig<TValue>) => ValueYupType<TValue>;
};

export type SelectConfigProps<TValue extends ValueType> = Omit<SelectConfig<TValue>, "render">;
export type TextFieldConfigProps<TValue extends ValueType> = Omit<
    TextFieldConfig<TValue>,
    "render"
>;

export type FormControl =
    | TextFieldConfig<"string">
    | TextFieldConfig<"number">
    | SelectConfig<"string">
    | SelectConfig<"number">;

export type FormConfig = ReadonlyArray<FormControl>;

type ValueToRealType = {
    string: string;
    number: number;
    boolean: boolean;
};

export type ValueRealType<TValue extends ValueType> = ValueToRealType[TValue];

type ValueToYupType = {
    string: Yup.StringSchema;
    number: Yup.NumberSchema;
    boolean: Yup.BooleanSchema;
};

export type ValueYupType<TValue extends ValueType> = ValueToYupType[TValue];

export type NameFieldMap<T extends FormConfig> = {
    [K in T[number]["name"]]: Extract<T[number], { name: K }>;
};

export type FormValidationSchema<T extends FormConfig> = {
    [K in keyof NameFieldMap<T>]: NameFieldMap<T>[K]["submitValidation"] extends Function
        ? ValueYupType<NameFieldMap<T>[K]["valueType"]>
        : never;
};

export type FieldValues<T extends FormConfig> = {
    [K in keyof NameFieldMap<T>]: ValueRealType<NameFieldMap<T>[K]["valueType"]>;
};
