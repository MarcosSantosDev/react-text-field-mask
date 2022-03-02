/* eslint-disable no-param-reassign */
import * as React from "react";
import inputMask, { MaskTypes } from "../lib/inputMask";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  /**
   * Input name
   */
  name: string;
  /**
   * Mask type
   */
  maskType?: MaskTypes;
};

function TextField(
  {
    name,
    maskType,
    disabled = false,
    onChange,
    ...restProps
  }: TextFieldProps,
  ref: React.Ref<HTMLInputElement>
) {
  const handleChangeInput = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (maskType) {
        const mask = inputMask[maskType];
        event.currentTarget.value = mask(event);
      }
      if (typeof onChange === "function") {
        onChange(event);
      }
    },
    [maskType, onChange]
  );

  return (
    <input
      {...restProps}
      onChange={handleChangeInput}
      id={name}
      ref={ref}
    />
  );
}

const TextFieldWithRef = React.forwardRef(TextField);

export default TextFieldWithRef;
