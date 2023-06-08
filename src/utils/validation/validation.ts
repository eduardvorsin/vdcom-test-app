export const isEmpty = (value: string) => {
  if (typeof value !== 'string') {
    throw new Error('the passed value must be of string type');
  }

  return value.length < 1;
};

export const isRequiredAndEmpty = (target: HTMLInputElement): boolean => {
  if (!(target instanceof HTMLInputElement)) {
    throw new Error('the target argument must be an input element');
  }

  return target.required && isEmpty(target.value);
};

export const longerOrEqualThan3 = (value: string) => {
  if (typeof value !== 'string') {
    throw new Error('the value must be of string type');
  }

  return value.length >= 3;
};

export const longerOrEqualThan5 = (value: string) => {
  if (typeof value !== 'string') {
    throw new Error('the value must be of string type');
  }

  return value.length >= 5;
};

export const hasOneOrMoreLowercaseCharachers = (value: string) => {
  if (typeof value !== 'string') {
    throw new Error('the value must be of string type');
  }

  return value.search(/[a-z]+/) >= 0;
};

export const isISODateString = (value: string): boolean => {
  if (typeof value !== 'string') {
    throw new Error('the value must be of string type');
  }

  const regexp = /\d{4}(-\d{2}){2}/;
  return regexp.test(value) && !Number.isNaN(Date.parse(value));
};
export const isEmail = (value: string): boolean => {
  if (typeof value !== 'string') {
    throw new Error('the value must be of string type');
  }

  const regexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  return regexp.test(value);
};
export const isPhoneNumber = (value: string): boolean => {
  if (typeof value !== 'string') {
    throw new Error('the value must be of string type');
  }

  const regexp = /^[0-9]{10}$/;
  return regexp.test(value);
};

export const validatePassword = (target: HTMLInputElement): string => {
  if (!(target instanceof HTMLInputElement)) {
    throw new Error('the target argument must be an input element');
  }

  const { value } = target;
  let currentErrorMessage = '';

  if (isRequiredAndEmpty(target)) {
    currentErrorMessage = 'This field is mandatory';
  } else if (!longerOrEqualThan5(value)) {
    currentErrorMessage = 'The password must be more than 5 characters';
  } else if (!hasOneOrMoreLowercaseCharachers(value)) {
    currentErrorMessage = 'The password must contain at least one lowercase character';
  }

  return currentErrorMessage;
};

export const validateUsername = (target: HTMLInputElement): string => {
  if (!(target instanceof HTMLInputElement)) {
    throw new Error('the target argument must be an input element');
  }

  const { value } = target;
  let currentErrorMessage = '';

  if (isRequiredAndEmpty(target)) {
    currentErrorMessage = 'This field is mandatory';
  } else if (!longerOrEqualThan3(value)) {
    currentErrorMessage = 'The username must be more than 3 characters long';
  }

  return currentErrorMessage;
};

export const validateEmail = (target: HTMLInputElement): string => {
  if (!(target instanceof HTMLInputElement)) {
    throw new Error('the target argument must be an input element');
  }

  const { value } = target;
  let currentErrorMessage = '';

  if (isRequiredAndEmpty(target)) {
    currentErrorMessage = 'This field is mandatory';
  } else if (!isEmail(value)) {
    currentErrorMessage = 'the entered value must match the following pattern example@email.com';
  }

  return currentErrorMessage;
};

export const validatePhoneNumber = (target: HTMLInputElement): string => {
  if (!(target instanceof HTMLInputElement)) {
    throw new Error('the target argument must be an input element');
  }

  const { value } = target;
  let currentErrorMessage = '';

  if (isRequiredAndEmpty(target)) {
    currentErrorMessage = 'This field is mandatory';
  } else if (!isPhoneNumber(value)) {
    currentErrorMessage = 'the entered value must correspond to the following pattern 0123456789';
  }

  return currentErrorMessage;
};

export const validateDate = (target: HTMLInputElement): string => {
  if (!(target instanceof HTMLInputElement)) {
    throw new Error('the target argument must be an input element');
  }

  const { value } = target;
  let currentErrorMessage = '';

  if (isRequiredAndEmpty(target)) {
    currentErrorMessage = 'This field is mandatory';
  } else if (!isISODateString(value)) {
    currentErrorMessage = 'You need to enter the date in the format "yyyy-mm-dd"';
  }

  return currentErrorMessage;
};

export const validateNumber = (target: HTMLInputElement): string => {
  if (!(target instanceof HTMLInputElement)) {
    throw new Error('the target argument must be an input element');
  }

  const { value } = target;
  let currentErrorMessage = '';

  if (isRequiredAndEmpty(target)) {
    currentErrorMessage = 'This field is mandatory';
  } else if (Number.isNaN(+value)) {
    currentErrorMessage = 'the entered value must be a number';
  }

  return currentErrorMessage;
};

export const getCurrentValidationMessage = (target: HTMLInputElement): string => {
  if (!(target instanceof HTMLInputElement)) {
    throw new Error('the target argument must be an input element');
  }

  const { name } = target;

  switch (name) {
    case 'username': {
      return validateUsername(target);
    }
    case 'password': {
      return validatePassword(target);
    }
    case 'email': {
      return validateEmail(target);
    }
    case 'phoneNumber': {
      return validatePhoneNumber(target);
    }
    case 'companyNumber':
    case 'TRN/PPSN': {
      return validateNumber(target);
    }
    case 'yearEnd':
    case 'ARD': {
      return validateDate(target);
    }
    default: {
      return isRequiredAndEmpty(target) ? 'This field is mandatory' : '';
    }
  }
};
