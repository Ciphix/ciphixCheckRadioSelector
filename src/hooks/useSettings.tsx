import { useEffect, useState } from "react";
import { ListExpressionValue, ObjectItem, ValueStatus, ListValue, ListAttributeValue } from "mendix";

import { CiphixSelectorSettings, inputTypeEnum, MxOption } from "src/helpers/types";
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
            isSelected: selected?.includes(item) ? true : false
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
    const [options, setOptions] = useState<MxOption[]>([]);
    const [isEditable, setisEditable] = useState<boolean>(false);

    const inputType: inputTypeEnum = props.linkedAssociation.type === "Reference" ? "radio" : "checkbox";

    const containerClass: string = props.orientation === "horizontal" ? "mx-radiobuttons inline" : "mx-radiobuttons";

    const assocCaption: ListExpressionValue<string> | ListAttributeValue<string> =
        props.assocCaptionType === "attribute" ? props.assocCaptionAttribute : props.assocCaptionTemplate;

    // Check if the item is editable
    useEffect(() => {
        setisEditable(props.linkedAssociation && !props.linkedAssociation?.readOnly);
    }, [props.linkedAssociation, props.linkedAssociation?.readOnly]);

    // Populate the options list when dataSource items change
    useEffect(() => {
        if (props.objectsDatasource.items && props.linkedAssociation && notEmptyAndLoaded(props.objectsDatasource, assocCaption)) {
            console.log('setOptions for: ' + props.id)
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
        props.objectsDatasource?.items,
        props.linkedAssociation.status,
        props.linkedAssociation.value,
        assocCaption
    ]);

    return { inputType: inputType, containerClass: containerClass, optionList: options, isEditable: isEditable };
}
