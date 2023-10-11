import { screen, render, renderHook } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import withFormContext from "../withFormContext";

function MockComponent(props: any) {
    return <div data-testid="mock-component">{props.control && "Control Prop Received"}</div>;
}

describe("withFormContext", () => {
    it("should pass the 'control' prop to the wrapped component", () => {
        const { result } = renderHook(() => useForm());

        const WrappedComponent = withFormContext(MockComponent);
        render(
            <FormProvider {...result.current}>
                <WrappedComponent />
            </FormProvider>
        );

        expect(screen.getByTestId("mock-component")).toHaveTextContent("Control Prop Received");
    });
});
