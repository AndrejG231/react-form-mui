import { type FormConfig, type SelectConfig, type TextFieldConfig } from "../lib/types";
import renderFields from "../lib/renderFields";

describe("renderFields", () => {
  it("should render fields as JSX elements", () => {
    const textConfig: TextFieldConfig<"string"> = {
      inputType: "text",
      valueType: "string",
      name: "textField",
      label: "Text Field",
      render: () => <input type="text" />,
    };

    const selectConfig: SelectConfig<"number"> = {
      inputType: "select",
      valueType: "number",
      name: "selectField",
      label: "Select Field",
      options: [{ value: 1, label: "Option 1" }],
      render: () => <select />,
    };

    const config: FormConfig = [textConfig, selectConfig];
    const view = renderFields(config as any);

    expect(view).toEqual([<input type="text" />, <select />]);
  });

  it("should handle an empty configuration", () => {
    const config: FormConfig = [];
    const view = renderFields(config as any);

    expect(view).toEqual([]);
  });
});
