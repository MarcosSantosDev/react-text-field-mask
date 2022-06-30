/* eslint-disable no-param-reassign */
import * as React from "react";
import masks, { MaskTypes } from "../lib/masks";

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
  const mask = React.useMemo(() => {
    if (maskType) {
      const maskObject = masks[maskType];
      return maskObject;
    }
    return null;
  }, [maskType]);

  const inputValue = value || undefined;

  const handleChangeInput = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (mask !== null) {
        event.currentTarget.value = mask.maskEvent(event);
      }
      if (typeof onChange === "function") {
        onChange(event);
      }
    },
    [mask, onChange]
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
