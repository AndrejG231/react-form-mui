import { type Control, useFormContext } from "react-hook-form";
import { type ComponentType, type FunctionComponent } from "react";

function withFormContext<Props extends { control: Control }>(
    WrappedComponent: ComponentType<Props>
) {
    function WithFormContext(props: Props) {
        const { control } = useFormContext();
        return <WrappedComponent {...props} control={control} />;
    }

    const wrappedComponentName =
        WrappedComponent.displayName || WrappedComponent.name || "Component";

    WithFormContext.displayName = `withFormContext(${wrappedComponentName})`;

    return WithFormContext as FunctionComponent<Omit<Props, "control">>;
}

export default withFormContext;
