import { ReactElement, createElement } from "react";

export interface TextComponentProps {
    className?: string;
    name?: string;
    optionList?: Array<string | undefined>;
}

export function TextComponent({ className, name, optionList }: TextComponentProps): ReactElement {
    const renderOptions = (): ReactElement[] => {
        return optionList
            ? optionList?.map((option, i) => {
                  return (
                      <span key={name + "_" + i} id={name + "_" + i}>
                          {i > 0 ? ", " : undefined}
                          {option}
                      </span>
                  );
              })
            : [];
    };
    return <span className={className}>{renderOptions()}</span>;
}
