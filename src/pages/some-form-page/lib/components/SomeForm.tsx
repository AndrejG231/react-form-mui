import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper, styled } from "@mui/material";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ContextControlledSelect } from "components/form/ControlledSelect";
import { ContextControlledTextField } from "components/form/ControlledTextField";

import {
    digitsValidationRegex,
    emailValidationRegex,
    phoneValidationRegex,
} from "utils/validators";
import {
    type SelectConfigProps,
    type TextFieldConfigProps,
    createFormConfig,
} from "utils/form-control";

function renderTextField({
    label,
    name,
    inputType,
    changeValidation,
}: TextFieldConfigProps<"string">) {
    return (
        <ContextControlledTextField
            type={inputType}
            key={name}
            label={label}
            name={name}
            changeValidator={changeValidation}
        />
    );
}

function renderSelect({ label, name, options }: SelectConfigProps<"string">) {
    return <ContextControlledSelect key={name} label={label} name={name} options={options} />;
}

export default function SomeForm() {
    const { t } = useTranslation();

    const {
        render: renderFields,
        defaultValues,
        validationSchema,
    } = useMemo(() => {
        const requiredStr = (field: string) =>
            Yup.string().required(t("form.helpers.requiredField", { field }));

        return createFormConfig([
            {
                name: "name",
                label: t("form.fields.name"),
                inputType: "text",
                valueType: "string",
                defaultValue: "",
                render: renderTextField,
                submitValidation: ({ label }) => requiredStr(label),
            },
            {
                name: "phone",
                label: t("form.fields.phone"),
                inputType: "tel",
                valueType: "string",
                defaultValue: "",
                render: renderTextField,
                changeValidation: (value) =>
                    value.length === 0 || digitsValidationRegex.test(value),
                submitValidation: ({ label }) =>
                    requiredStr(label).matches(
                        phoneValidationRegex,
                        t("form.helpers.invalidField", { field: label })
                    ),
            },
            {
                name: "mail",
                label: t("form.fields.mail"),
                inputType: "mail",
                valueType: "string",
                defaultValue: "",
                render: renderTextField,
                submitValidation: ({ label }) =>
                    requiredStr(label).matches(
                        emailValidationRegex,
                        t("form.helpers.invalidField", { field: label })
                    ),
            },
            {
                name: "lang",
                label: t("form.fields.mainLang"),
                inputType: "select",
                valueType: "string",
                defaultValue: "",
                options: [
                    {
                        label: t("form.helpers.selectValue"),
                        value: "",
                    },
                    {
                        label: t("lang.cs"),
                        value: "cs",
                    },
                    {
                        label: t("lang.en"),
                        value: "en",
                    },
                    {
                        label: t("lang.sk"),
                        value: "sk",
                    },
                ],
                render: renderSelect,
                submitValidation: ({ label }) => requiredStr(label),
            },
        ]);
    }, [t]);

    const form = useForm({
        defaultValues,
        resolver: yupResolver(validationSchema),
		mode: "onTouched",
    });

    const handleSubmitSuccess = () => {
        form.reset();
    };

    return (
        <FormProvider {...form}>
            <StyledFormPaper as="form" onSubmit={form.handleSubmit(handleSubmitSuccess)}>
                {renderFields()}
                <StyledSubmitButton
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disabled={!form.formState.isValid}
                >
                    {t("form.submit")}
                </StyledSubmitButton>
            </StyledFormPaper>
        </FormProvider>
    );
}

const StyledFormPaper = styled(Paper)(() => ({
    margin: "32px 16px",
    width: "100%",
    maxWidth: "600px",
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
}));

const StyledSubmitButton = styled(Button)(() => ({
    margin: "16px 0 0 0",
    alignSelf: "flex-end",
}));
