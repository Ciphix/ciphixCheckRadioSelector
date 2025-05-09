import { ObjectItem } from "mendix";

export type inputTypeEnum = "radio" | "checkbox";

export interface MxOption {
    readonly mxItem: ObjectItem;
    readonly caption: string | undefined;
    readonly index: number;
    isSelected: boolean;
}

export interface CiphixSelectorSettings {
    inputType: inputTypeEnum;
    containerClass: string;
    optionList: MxOption[];
    isEditable: boolean;
}
