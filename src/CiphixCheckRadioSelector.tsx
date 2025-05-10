import { ReactElement, createElement } from "react";
import { MxOption } from "src/helpers/types";

import { CiphixCheckRadioSelectorContainerProps } from "../typings/CiphixCheckRadioSelectorProps";

import "./ui/CiphixCheckRadioSelector.css";
import { InputComponent } from "./components/InputComponent";
import useSettings from "./hooks/useSettings";
import { TextComponent } from "./components/TextComponent";

export function CiphixCheckRadioSelector(props: CiphixCheckRadioSelectorContainerProps): ReactElement {
    const { inputType, className, optionList, disabled, displayType } = useSettings(props);

    const handleSelection = (option: MxOption): void => {
        option.isSelected = !option.isSelected;

        if (props.linkedAssociation.type === "Reference") {
            props.linkedAssociation.setValue(option.isSelected ? option.mxItem : undefined);
        } else if (props.linkedAssociation.type === "ReferenceSet") {
            props.linkedAssociation.setValue(optionList.filter(item => item.isSelected).map(item => item.mxItem));
        }
    };

    const renderOptions = (): ReactElement[] => {
        return optionList.map(option => {
            return (
                <InputComponent
                    key={props.id + "_" + option.index}
                    type={inputType}
                    option={option}
                    name={props.id}
                    callback={handleSelection}
                    disabled={disabled}
                ></InputComponent>
            );
        });
    };

    const renderText = (): ReactElement => {
        return (
            <TextComponent
                name={props.id}
                optionList={optionList.filter(option => option.isSelected).map(option => option.caption)}
            ></TextComponent>
        );
    };

    return (
        <div className={className}>
            <div role={inputType === "radio" ? "radiogroup" : "group"} id={props.id} className="mx-radiogroup">
                {displayType === "input" ? renderOptions() : renderText()}
            </div>
        </div>
    );
}
