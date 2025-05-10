import { ObjectItem } from "mendix";

export type inputTypeEnum = "radio" | "checkbox";
export type displayTypeEnum = "input" | "text";

export interface MxOption {
    readonly mxItem: ObjectItem;
    readonly caption: string | undefined;
    readonly index: number;
    isSelected: boolean;
}

export interface CiphixSelectorSettings {
    inputType: inputTypeEnum;
    displayType?: displayTypeEnum;
    className?: string;
    optionList: MxOption[];
    disabled?: boolean;
}
