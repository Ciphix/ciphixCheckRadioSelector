import { CiphixCheckRadioSelectorPreviewProps } from "../typings/CiphixCheckRadioSelectorProps";
import { Properties, hidePropertyIn } from "@mendix/pluggable-widgets-tools";

export type Platform = "web" | "desktop";

export type Problem = {
    property?: string; // key of the property, at which the problem exists
    severity?: "error" | "warning" | "deprecation"; // default = "error"
    message: string; // description of the problem
    studioMessage?: string; // studio-specific message, defaults to message
    url?: string; // link with more information about the problem
    studioUrl?: string; // studio-specific link
};

type BaseProps = {
    type: "Image" | "Container" | "RowLayout" | "Text" | "DropZone" | "Selectable" | "Datasource";
    grow?: number; // optionally sets a growth factor if used in a layout (default = 1)
};

type ImageProps = BaseProps & {
    type: "Image";
    document?: string; // svg image
    data?: string; // base64 image
    property?: object; // widget image property object from Values API
    width?: number; // sets a fixed maximum width
    height?: number; // sets a fixed maximum height
};

type ContainerProps = BaseProps & {
    type: "Container" | "RowLayout";
    children: PreviewProps[]; // any other preview element
    borders?: boolean; // sets borders around the layout to visually group its children
    borderRadius?: number; // integer. Can be used to create rounded borders
    backgroundColor?: string; // HTML color, formatted #RRGGBB
    borderWidth?: number; // sets the border width
    padding?: number; // integer. adds padding around the container
};

type RowLayoutProps = ContainerProps & {
    type: "RowLayout";
    columnSize?: "fixed" | "grow"; // default is fixed
};

type TextProps = BaseProps & {
    type: "Text";
    content: string; // text that should be shown
    fontSize?: number; // sets the font size
    fontColor?: string; // HTML color, formatted #RRGGBB
    bold?: boolean;
    italic?: boolean;
};

type DropZoneProps = BaseProps & {
    type: "DropZone";
    property: object; // widgets property object from Values API
    placeholder: string; // text to be shown inside the dropzone when empty
    showDataSourceHeader?: boolean; // true by default. Toggles whether to show a header containing information about the datasource
};

type SelectableProps = BaseProps & {
    type: "Selectable";
    object: object; // object property instance from the Value API
    child: PreviewProps; // any type of preview property to visualize the object instance
};

type DatasourceProps = BaseProps & {
    type: "Datasource";
    property: object | null; // datasource property object from Values API
    child?: PreviewProps; // any type of preview property component (optional)
};

export type PreviewProps =
    | ImageProps
    | ContainerProps
    | RowLayoutProps
    | TextProps
    | DropZoneProps
    | SelectableProps
    | DatasourceProps;

export function getProperties(
    _values: CiphixCheckRadioSelectorPreviewProps,
    defaultProperties: Properties /* , target: Platform*/
): Properties {
    if (_values.assocCaptionType === "attribute") {
        hidePropertyIn(defaultProperties, _values, "assocCaptionTemplate");
    } else {
        hidePropertyIn(defaultProperties, _values, "assocCaptionAttribute");
    }

    return defaultProperties;
}

// export function check(_values: CiphixCheckRadioSelectorPreviewProps): Problem[] {
//     const errors: Problem[] = [];
//     // Add errors to the above array to throw errors in Studio and Studio Pro.
//     /* Example
//     if (values.myProperty !== "custom") {
//         errors.push({
//             property: `myProperty`,
//             message: `The value of 'myProperty' is different of 'custom'.`,
//             url: "https://github.com/myrepo/mywidget"
//         });
//     }
//     */
//     return errors;
// }

export function getPreview(
    values: CiphixCheckRadioSelectorPreviewProps,
    isDarkMode: boolean
    // version: number[]
): PreviewProps {
    const fontColor: string = isDarkMode ? "#6DB1FE" : "#146ff4";
    const svgCircle =
        '<svg height="20" width="20"><circle cx="10" cy="10" r="5" stroke="' +
        fontColor +
        '" stroke-width="1" /></svg>';
    const items = [
        values.linkedAssociation + ": #1",
        values.linkedAssociation + ": #2",
        values.linkedAssociation + ": #3"
    ].map(item => {
        return {
            type: "RowLayout",
            borders: false,
            columnSize: "grow",
            padding: 6,
            children: [
                {
                    type: "Image",
                    document: svgCircle,
                    width: 20
                },
                {
                    type: "Text",
                    fontColor: isDarkMode ? "#6DB1FE" : "#146ff4",
                    content: "[" + item + "]",
                    fontSize: 8
                }
            ]
        };
    });

    // Customize your pluggable widget appearance for Studio Pro.
    return {
        type: "Container",
        // @ts-ignore
        children: items
    };
}

// export function getCustomCaption(values: CiphixCheckRadioSelectorPreviewProps, platform: Platform): string {
//     return "CiphixCheckRadioSelector";
// }
