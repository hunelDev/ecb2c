import {
  DOMAttributes,
  FC,
  FocusEventHandler,
  HTMLAttributes,
  InputHTMLAttributes,
} from 'react';
import { checkForValidation, ValidateObject } from '../utils/validation';

type OtherProps = {
  validation?: ValidateObject;
};
type InputProps = OtherProps &
  DOMAttributes<HTMLInputElement> &
  HTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = ({ validation, onBlur, ...props }) => {
  const blurHandler: FocusEventHandler<HTMLInputElement> = (e) => {
    if (validation) {
      const { value } = e.target;
      checkForValidation(validation, value);
    }
    if (onBlur) onBlur(e);
  };

  return (
    <div>
      <input {...props} onBlur={blurHandler} />
    </div>
  );
};

export default Input;
