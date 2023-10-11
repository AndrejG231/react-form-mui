import { FormControl, FormHelperText, InputLabel, MenuItem, Select, styled } from "@mui/material";
import {
    Control,
    Controller,
    ControllerProps,
    FieldPath,
    FieldPathValue,
    FieldValues,
} from "react-hook-form";

import { SelectOptions } from "utils/form-control";

import withFormContext from "./withFormContext";

type ControlledTextFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
    name: TName;
    control: Control<TFieldValues, TName>;
    rules?: ControllerProps<TFieldValues, TName>["rules"];
    defaultValue?: FieldPathValue<TFieldValues, TName>;
    disabled?: boolean;
    label: string;
    options: SelectOptions<TFieldValues[TName]>;
};

export default function ControlledSelect<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: ControlledTextFieldProps<TFieldValues, TName>) {
    const { label, name, defaultValue, disabled, options, control } = props;

    return (
        <Controller
            name={name}
            control={control}
            disabled={disabled}
            defaultValue={defaultValue}
            render={({ field, fieldState: { error } }) => (
                <FormControl fullWidth margin="normal">
                    <InputLabel error={!!error} htmlFor={name}>
                        {label}
                    </InputLabel>
                    <Select
                        {...field}
                        placeholder="Hello"
                        label={label}
                        id={name}
                        error={!!error}
                        variant="outlined"
                    >
                        {options.map(({ value, label }) => (
                            <StyledMenuItem key={value} value={value}>
                                {label}
                            </StyledMenuItem>
                        ))}
                    </Select>
                    {error && <FormHelperText error={!!error}>{error?.message}</FormHelperText>}
                </FormControl>
            )}
        />
    );
}

export const ContextControlledSelect = withFormContext(ControlledSelect);

const StyledMenuItem = styled(MenuItem)(() => ({
    fontSize: 14,
    "&.Mui-selected": {
        background: "#FBF4F4",
    },
}));
