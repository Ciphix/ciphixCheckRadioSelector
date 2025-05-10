import { useEffect, useState } from "react";
import { ListExpressionValue, ObjectItem, ValueStatus, ListValue, ListAttributeValue } from "mendix";

import { CiphixSelectorSettings, inputTypeEnum, displayTypeEnum, MxOption } from "src/helpers/types";
import { CiphixCheckRadioSelectorContainerProps } from "typings/CiphixCheckRadioSelectorProps";

const getOptionList = (
    items: readonly ObjectItem[],
    assocCaption: ListExpressionValue<string> | ListAttributeValue<string>,
    selected?: ObjectItem[]
): MxOption[] => {
    return items.map(
        (item, i): MxOption => ({
            mxItem: item,
            caption: assocCaption.get(item).value,
            index: i,
            isSelected: !!selected?.includes(item)
        })
    );
};

const notEmptyAndLoaded = (
    objectsDatasource: ListValue,
    assocCaption: ListExpressionValue<string> | ListAttributeValue<string>
): boolean => {
    if (objectsDatasource?.items) {
        const assocCaptionLoading = objectsDatasource.items.some(
            i => assocCaption.get(i).status !== ValueStatus.Available
        );
        return !assocCaptionLoading;
    }
    return false;
};

export default function useSettings(props: CiphixCheckRadioSelectorContainerProps): CiphixSelectorSettings {
    const [className, setClassName] = useState<string>();
    const [options, setOptions] = useState<MxOption[]>([]);
    const [disabled, setDisabled] = useState<boolean>();
    const [displayType, setDisplayType] = useState<displayTypeEnum>("input");

    const inputType: inputTypeEnum = props.linkedAssociation.type === "Reference" ? "radio" : "checkbox";

    const assocCaption: ListExpressionValue<string> | ListAttributeValue<string> =
        props.assocCaptionType === "attribute" ? props.assocCaptionAttribute : props.assocCaptionTemplate;

    // Populate the options list when dataSource items change
    useEffect(() => {
        if (
            props.objectsDatasource.items &&
            props.linkedAssociation &&
            notEmptyAndLoaded(props.objectsDatasource, assocCaption)
        ) {
            console.log("setOptions for: " + props.id);
            if (props.linkedAssociation.value === undefined) {
                setOptions(getOptionList(props.objectsDatasource.items, assocCaption));
            } else {
                setOptions(
                    getOptionList(
                        props.objectsDatasource.items,
                        assocCaption,
                        props.linkedAssociation.type === "Reference"
                            ? [props.linkedAssociation.value]
                            : props.linkedAssociation.value
                    )
                );
            }
        } else {
            setOptions([]);
        }
    }, [
        props.id,
        props.objectsDatasource,
        props.objectsDatasource?.items,
        props.linkedAssociation,
        props.linkedAssociation.status,
        props.linkedAssociation.value,
        assocCaption
    ]);

    // Check if the item is editable and set className and displayType accordingly
    useEffect(() => {
        if (props.linkedAssociation?.readOnly === true && props.readOnlyStle !== "control") {
            setClassName("form-control-static mx-radiobuttons");
            setDisplayType("text");
            setDisabled(undefined);
        } else {
            setClassName(props.orientation === "horizontal" ? "mx-radiobuttons inline" : "mx-radiobuttons");
            setDisplayType("input");
            if (props.linkedAssociation?.readOnly === true) {
                setDisabled(true);
            } else {
                setDisabled(undefined);
            }
        }
    }, [props.linkedAssociation, props.linkedAssociation?.readOnly, props.readOnlyStle, props.orientation]);

    return { inputType, displayType, className, optionList: options, disabled };
}
