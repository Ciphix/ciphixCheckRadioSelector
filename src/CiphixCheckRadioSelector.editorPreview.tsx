import { ReactElement, createElement } from "react";
import { CiphixCheckRadioSelectorPreviewProps } from "../typings/CiphixCheckRadioSelectorProps";

export function preview(props: CiphixCheckRadioSelectorPreviewProps): ReactElement {
    const items = [
        props.linkedAssociation + ": #1",
        props.linkedAssociation + ": #2",
        props.linkedAssociation + ": #3"
    ].map(item => {
        return (
            <div className="radio" key={item}>
                <input type="radio" />
                <label>{item}</label>
            </div>
        );
    });

    return (
        <div className={props.orientation === "horizontal" ? "mx-radiobuttons inline" : "mx-radiobuttons"}>{items}</div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/CiphixCheckRadioSelector.css");
}
