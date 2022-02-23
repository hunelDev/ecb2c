type PrimaryValidation =
  | 'isEmail'
  | 'isAlpha'
  | 'alphaNumeric'
  | 'required'
  | 'maxLen'
  | 'minLen'
  | 'max'
  | 'min';

type PrimaryValidateObject = {
  [P in PrimaryValidation]?: any;
};

type CustomValidateObject = {
  [P: string]: (value: any) => void;
};

export type ValidateObject = PrimaryValidateObject & CustomValidateObject;

export const checkForValidation = (
  validateObject: ValidateObject,
  value: string
) => {
  const validateKeys = Object.keys(validateObject);
  validateKeys.forEach((key) => {
    if (typeof validateObject[key] === 'function') {
      //  validateObject[key]();
    }

    switch (key) {
      case 'isEmail':
        break;
      case 'isAlpha':
        break;
      case 'alphaNumeric':
        break;
      case 'maxLen':
        break;
      case 'minLen':
        break;
      case 'max':
        break;
      case 'min':
        break;
    }
  });
};
