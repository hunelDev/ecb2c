import { DOMAttributes, FC, HTMLAttributes } from 'react';
import FormValidation from '../contexts/FormValidation';

type OtherProps = {};
type InputProps = OtherProps &
  DOMAttributes<HTMLFormElement> &
  HTMLAttributes<HTMLFormElement>;

const Form: FC<InputProps> = ({ children, ...props }) => {
  return (
    <FormValidation>
      <form className="" {...props}>
        {children}
      </form>
    </FormValidation>
  );
};

export default Form;
