import { FC, createContext } from 'react';

const FormContext = createContext({});
FormContext.displayName = 'FormContext';
const validateResults = {};

const FormValidation: FC = ({ children }) => {
  return (
    <FormContext.Provider value={validateResults}>
      {children}
    </FormContext.Provider>
  );
};

export default FormValidation;
