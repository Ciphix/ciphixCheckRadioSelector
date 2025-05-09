/**
 * This file was generated from CiphixCheckRadioSelector.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ListValue, ListAttributeValue, ListExpressionValue, ReferenceValue, ReferenceSetValue } from "mendix";

export type OrientationEnum = "vertical" | "horizontal";

export type AssocCaptionTypeEnum = "attribute" | "template";

export interface CiphixCheckRadioSelectorContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    orientation: OrientationEnum;
    linkedAssociation: ReferenceValue | ReferenceSetValue;
    objectsDatasource: ListValue;
    assocCaptionType: AssocCaptionTypeEnum;
    assocCaptionAttribute: ListAttributeValue<string>;
    assocCaptionTemplate: ListExpressionValue<string>;
}

export interface CiphixCheckRadioSelectorPreviewProps {
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    orientation: OrientationEnum;
    linkedAssociation: string;
    objectsDatasource: {} | { caption: string } | { type: string } | null;
    assocCaptionType: AssocCaptionTypeEnum;
    assocCaptionAttribute: string;
    assocCaptionTemplate: string;
    onChangeAction: {} | null;
}
