import { TextField } from "@mui/material";
import { type ChangeEvent, type ChangeEventHandler, type HTMLInputTypeAttribute } from "react";
import {
    Controller,
    type Control,
    type ControllerProps,
    type FieldPath,
    type FieldPathValue,
    type FieldValues,
} from "react-hook-form";

import withFormContext from "./withFormContext";

function createChangeHandlerWithValidator(
    onChange: ChangeEventHandler<HTMLInputElement>,
    validator?: (value: string) => boolean
) {
    if (!validator) {
        return onChange;
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const isValid = validator(event.target.value);

        if (!isValid) {
            return;
        }

        onChange(event);
    };

    return handleChange;
}

type ControlledTextFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
    name: TName;
    rules?: ControllerProps<TFieldValues, TName>["rules"];
    defaultValue?: FieldPathValue<TFieldValues, TName>;
    control: Control<TFieldValues, TName>;
    disabled?: boolean;
    label: string;
    className?: string;
    type?: HTMLInputTypeAttribute;
    changeValidator?: (value: string) => boolean;
};

export default function ControlledTextField<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: ControlledTextFieldProps<TFieldValues, TName>) {
    const { name, rules, defaultValue, label, className, type, control, changeValidator } = props;

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue}
            render={({ field: { onChange, ...field }, fieldState: { error } }) => {
                return (
                    <TextField
                        {...field}
                        onChange={createChangeHandlerWithValidator(onChange, changeValidator)}
                        error={!!error}
                        helperText={error?.message}
                        className={className}
                        label={label}
                        type={type}
                        id={name}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                );
            }}
        />
    );
}

export const ContextControlledTextField = withFormContext(ControlledTextField);
