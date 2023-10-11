import { FormConfig } from "./types";

function renderField<Element extends FormConfig[number]>({ render, ...props }: Element) {
    return render(props as any);
}

export default function renderFields<Config extends FormConfig>(config: Config) {
    return config.map(renderField);
}
