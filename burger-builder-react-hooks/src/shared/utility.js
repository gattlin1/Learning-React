export const updateObject = (oldObject, updatedProperties) => {
  return { ...oldObject, ...updatedProperties };
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }
  return isValid;
};

export const createInputElement = (
  type,
  configType,
  configOptions,
  placeholder,
  value,
  validation
) => {
  return {
    elementType: type,
    elementConfig: {
      type: configType,
      placeholder: placeholder,
      options: configOptions,
    },
    value: value,
    validation: validation,
    valid: false,
    touched: false,
  };
};
