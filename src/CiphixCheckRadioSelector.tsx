import { ReactElement, createElement } from "react";
import { MxOption } from "src/helpers/types";

import { CiphixCheckRadioSelectorContainerProps } from "../typings/CiphixCheckRadioSelectorProps";

import "./ui/CiphixCheckRadioSelector.css";
import { InputComponent } from "./components/InputComponent";
import useSettings from "./hooks/useSettings";

export function CiphixCheckRadioSelector(props: CiphixCheckRadioSelectorContainerProps): ReactElement {
    const { inputType, containerClass, optionList, isEditable } = useSettings(props);

    const handleSelection = (option: MxOption) => {
        option.isSelected = !option.isSelected;

        if (props.linkedAssociation.type === "Reference") {
            props.linkedAssociation.setValue(option.isSelected ? option.mxItem : undefined);
        } else if (props.linkedAssociation.type === "ReferenceSet") {
            props.linkedAssociation.setValue(optionList.filter(item => item.isSelected).map(item => item.mxItem));
        }
    };

    const renderOptions = () => {
        return optionList.map(option => {
            return (
                <InputComponent
                    type={inputType}
                    option={option}
                    name={props.id}
                    callback={handleSelection}
                    disabled={!isEditable}
                ></InputComponent>
            );
        });
    };

    return (
        <div className={containerClass}>
            <div role={inputType === "radio" ? "radiogroup" : "group"} id={props.id} className="mx-radiogroup">
                {renderOptions()}
            </div>
        </div>
    );
}
