import { MouseEvent, ReactElement, createElement } from "react";
import { inputTypeEnum, MxOption } from "src/helpers/types";

export interface InputComponentProps {
    type: inputTypeEnum;
    option: MxOption;
    name: string;
    callback: CallableFunction;
    disabled?: boolean;
}

export function InputComponent({ type, option, name, callback, disabled = false }: InputComponentProps): ReactElement {
    const id: string = name + "_" + option.index;

    const onClickHandler = (e: MouseEvent<HTMLInputElement>): void => {
        e.preventDefault();
        if (!disabled) {
            callback(option);
        }
    };

    return (
        <div className={type} onClick={onClickHandler}>
            <input
                type={type}
                id={id}
                name={name}
                value={option.caption}
                readOnly
                checked={option.isSelected}
                disabled={disabled}
            />
            <label htmlFor={id}>{option.caption}</label>
        </div>
    );
}
