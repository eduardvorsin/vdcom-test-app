import * as validation from './validation';

describe('isEmpty tests', () => {
  it('should return an error if not a string is passed', () => {
    expect(() => {
      // @ts-expect-error testing wrong argument type
      validation.isEmpty(null);
    }).toThrow('the passed value must be of string type');
  });

  it('should return false if the string length is not 0', () => {
    expect(validation.isEmpty('abcdef')).toBeFalsy();
  });

  it('should return true if the string length is 0', () => {
    expect(validation.isEmpty('')).toBeTruthy();
  });
});

describe('isRequiredAndEmpty', () => {
  const input = document.createElement('input');

  beforeEach(() => {
    input.value = '';
    input.required = false;
  });

  it('should return an error if the target argument is not an input element', () => {
    expect(() => {
      // @ts-expect-error testing wrong argument type
      validation.isRequiredAndEmpty(null);
    }).toThrow('the target argument must be an input element');
  });

  it('should return false if the field is optional', () => {
    input.value = '100';

    expect(validation.isRequiredAndEmpty(input)).toBeFalsy();
  });

  it('should return false if the field is required and the value is not empty', () => {
    input.required = true;
    input.value = '123';
    expect(validation.isRequiredAndEmpty(input)).toBeFalsy();
  });

  it('should return true if the field is required and the value is empty', () => {
    input.required = true;
    expect(validation.isRequiredAndEmpty(input)).toBeTruthy();
  });
});

describe('longerOrEqualThan3 tests', () => {
  it('should return an error if the value is not of string type', () => {
    expect(() => {
      // @ts-expect-error testing wrong argument type
      validation.longerOrEqualThan3(null);
    }).toThrow('the value must be of string type');
  });

  it('should return false if the value is less than 3', () => {
    expect(validation.longerOrEqualThan3('1')).toBeFalsy();
  });

  it('Should return true if the value is greater than or equal to 3', () => {
    expect(validation.longerOrEqualThan3('123')).toBeTruthy();
  });
});

describe('longerOrEqualThan5 tests', () => {
  it('should return an error if the value is not of string type', () => {
    expect(() => {
      // @ts-expect-error testing wrong argument type
      validation.longerOrEqualThan5(null);
    }).toThrow('the value must be of string type');
  });

  it('should return false if the value is less than 5', () => {
    expect(validation.longerOrEqualThan5('123')).toBeFalsy();
  });

  it('Should return true if the value is greater than or equal to 5', () => {
    expect(validation.longerOrEqualThan5('12345')).toBeTruthy();
  });
});

describe('hasOneOrMoreLowercaseCharachers tests', () => {
  it('should return an error if the value is not of string type', () => {
    expect(() => {
      // @ts-expect-error testing wrong argument type
      validation.hasOneOrMoreLowercaseCharachers(null);
    }).toThrow('the value must be of string type');
  });

  it('should return false if the value does not contain at least one lowercase character', () => {
    expect(validation.hasOneOrMoreLowercaseCharachers('UDP')).toBeFalsy();
  });

  it('should return true if the value contains at least one lowercase character', () => {
    expect(validation.hasOneOrMoreLowercaseCharachers('abc')).toBeTruthy();
  });
});

describe('isISODateString tests', () => {
  it('should return an error if the value is not of string type', () => {
    expect(() => {
      // @ts-expect-error testing wrong argument type
      validation.isISODateString(null);
    }).toThrow('the value must be of string type');
  });

  it('should return false if the date passed does not match the ISO format', () => {
    expect(validation.isISODateString('2022/07/15')).toBeFalsy();
  });

  it('should return true if the date passed corresponds to the ISO format', () => {
    expect(validation.isISODateString('2022-07-15')).toBeTruthy();
  });
});

describe('isEmail tests', () => {
  it('should return an error if the value is not of string type', () => {
    expect(() => {
      // @ts-expect-error testing wrong argument type
      validation.isEmail(null);
    }).toThrow('the value must be of string type');
  });

  it('should return false if the value does not match the pattern example@email.com', () => {
    expect(validation.isEmail('adam1@')).toBeFalsy();
  });

  it('should return true if the value matches the pattern example@email.com', () => {
    expect(validation.isEmail('sam_jones@email.com')).toBeTruthy();
  });
});

describe('isPhoneNumber tests', () => {
  it('should return an error if the value is not of string type', () => {
    expect(() => {
      // @ts-expect-error testing wrong argument type
      validation.isPhoneNumber(null);
    }).toThrow('the value must be of string type');
  });

  it('should return false if the value does not contain digits from 0 to 9 with a length of 10 characters', () => {
    expect(validation.isPhoneNumber('a2446731')).toBeFalsy();
  });

  it('should return true if the value contains digits from 0 to 9 with a length of 10 characters', () => {
    expect(validation.isPhoneNumber('0123456789')).toBeTruthy();
  });
});

describe('validatePassword tests', () => {
  const input = document.createElement('input');

  beforeEach(() => {
    input.value = '';
    input.required = true;
  });

  it('should return an error if the target argument is not an input element', () => {
    expect(() => {
      // @ts-expect-error testing wrong argument type
      validation.validatePassword(null);
    }).toThrow('the target argument must be an input element');
  });

  it('should return "This field is mandatory" if the field is required and the value is missing', () => {
    expect(validation.validatePassword(input)).toBe('This field is mandatory');
  });

  it('should return "The password must be more than 5 characters" if the length of the value is less than 5', () => {
    input.value = 'abcd';
    expect(validation.validatePassword(input)).toBe('The password must be more than 5 characters');
  });

  it('should return "The password must contain at least one lowercase character" if the value does not contain lowercase characters', () => {
    input.value = '123456';
    expect(validation.validatePassword(input)).toBe('The password must contain at least one lowercase character');
  });

  it('should return an empty string if the value passes validation', () => {
    input.value = 'abcdef';
    expect(validation.validatePassword(input)).toBe('');
  });
});

describe('validateUsername tests', () => {
  const input = document.createElement('input');

  beforeEach(() => {
    input.value = '';
    input.required = true;
  });

  it('should return an error if the target argument is not an input element', () => {
    expect(() => {
      // @ts-expect-error testing wrong argument type
      validation.validateUsername(null);
    }).toThrow('the target argument must be an input element');
  });

  it('should return "This field is mandatory" if the field is required and the value is missing', () => {
    expect(validation.validateUsername(input)).toBe('This field is mandatory');
  });

  it('should return "The username must be more than 3 characters long" if the length of the value is less than 3', () => {
    input.value = 'ab';
    expect(validation.validateUsername(input)).toBe('The username must be more than 3 characters long');
  });

  it('should return an empty string if the value passes validation', () => {
    input.value = 'abcdef';
    expect(validation.validateUsername(input)).toBe('');
  });
});

describe('validateEmail tests', () => {
  const input = document.createElement('input');

  beforeEach(() => {
    input.value = '';
    input.required = true;
  });

  it('should return an error if the target argument is not an input element', () => {
    expect(() => {
      // @ts-expect-error testing wrong argument type
      validation.validateEmail(null);
    }).toThrow('the target argument must be an input element');
  });

  it('should return "This field is mandatory" if the field is required and the value is missing', () => {
    expect(validation.validateEmail(input)).toBe('This field is mandatory');
  });

  it('should return "the entered value must match the following pattern example@email.com " if the value does not match the pattern example@email.com', () => {
    input.value = 'example@.';
    expect(validation.validateEmail(input)).toBe('the entered value must match the following pattern example@email.com');
  });

  it('should return an empty string if the value passes validation', () => {
    input.value = 'example@email.com';
    expect(validation.validateEmail(input)).toBe('');
  });
});

describe('validatePhoneNumber tests', () => {
  const input = document.createElement('input');

  beforeEach(() => {
    input.value = '';
    input.required = true;
  });

  it('should return an error if the target argument is not an input element', () => {
    expect(() => {
      // @ts-expect-error testing wrong argument type
      validation.validatePhoneNumber(null);
    }).toThrow('the target argument must be an input element');
  });

  it('should return "This field is mandatory" if the field is required and the value is missing', () => {
    expect(validation.validatePhoneNumber(input)).toBe('This field is mandatory');
  });

  it('should return "the entered value must correspond to the following pattern 0123456789" if the value does not match the pattern 0123456789', () => {
    input.value = '000000';
    expect(validation.validatePhoneNumber(input)).toBe('the entered value must correspond to the following pattern 0123456789');
  });

  it('should return an empty string if the value passes validation', () => {
    input.value = '1234567890';
    expect(validation.validatePhoneNumber(input)).toBe('');
  });
});

describe('validateDate tests', () => {
  const input = document.createElement('input');

  beforeEach(() => {
    input.value = '';
    input.required = true;
  });

  it('should return an error if the target argument is not an input element', () => {
    expect(() => {
      // @ts-expect-error testing wrong argument type
      validation.validateDate(null);
    }).toThrow('the target argument must be an input element');
  });

  it('should return "This field is mandatory" if the field is required and the value is missing', () => {
    expect(validation.validateDate(input)).toBe('This field is mandatory');
  });

  it('should return "You need to enter the date in the format "yyyy-mm-dd"" if the date value does not match this pattern', () => {
    input.value = '2020/07/20';
    expect(validation.validateDate(input)).toBe('You need to enter the date in the format "yyyy-mm-dd"');
  });

  it('should return an empty string if the value passes validation', () => {
    input.value = '2021-01-01';
    expect(validation.validateDate(input)).toBe('');
  });
});

describe('validateNumber tests', () => {
  const input = document.createElement('input');

  beforeEach(() => {
    input.value = '';
    input.required = true;
  });

  it('should return an error if the target argument is not an input element', () => {
    expect(() => {
      // @ts-expect-error testing wrong argument type
      validation.validateNumber(null);
    }).toThrow('the target argument must be an input element');
  });

  it('should return "This field is mandatory" if the field is required and the value is missing', () => {
    expect(validation.validateNumber(input)).toBe('This field is mandatory');
  });

  it('should return "the entered value must be a number" if you enter a non-number', () => {
    input.value = 'abc';
    expect(validation.validateNumber(input)).toBe('the entered value must be a number');
  });

  it('should return an empty string if the value passes validation', () => {
    input.value = '1234';
    expect(validation.validateNumber(input)).toBe('');
  });
});

describe('getCurrentValidationMessage tests', () => {
  const input = document.createElement('input');

  beforeEach(() => {
    input.value = '';
    input.required = true;
    input.name = 'username';
  });

  it('should return an error if the target argument is not an input element', () => {
    expect(() => {
      // @ts-expect-error testing wrong argument type
      validation.getCurrentValidationMessage(null);
    }).toThrow('the target argument must be an input element');
  });

  it('should call a mock function if the input name is username', () => {
    jest.spyOn(validation, 'validateUsername');

    validation.getCurrentValidationMessage(input);

    expect(validation.validateUsername).toHaveBeenCalledTimes(1);
  });

  it('should call a mock function if the input name is password', () => {
    jest.spyOn(validation, 'validatePassword');
    input.name = 'password';

    validation.getCurrentValidationMessage(input);

    expect(validation.validatePassword).toHaveBeenCalledTimes(1);
  });

  it('should call a mock function if the input name is email', () => {
    jest.spyOn(validation, 'validateEmail');
    input.name = 'email';

    validation.getCurrentValidationMessage(input);

    expect(validation.validateEmail).toHaveBeenCalledTimes(1);
  });

  it('should call a mock function if the input name is phoneNumber', () => {
    jest.spyOn(validation, 'validatePhoneNumber');
    input.name = 'phoneNumber';

    validation.getCurrentValidationMessage(input);

    expect(validation.validatePhoneNumber).toHaveBeenCalledTimes(1);
  });

  it('should call a mock function if the input name is companyNumber', () => {
    jest.spyOn(validation, 'validateNumber');
    input.name = 'companyNumber';

    validation.getCurrentValidationMessage(input);

    expect(validation.validateNumber).toHaveBeenCalledTimes(1);
  });

  it('should call a mock function if the input name is TRN/PPSN', () => {
    jest.spyOn(validation, 'validateNumber');
    input.name = 'TRN/PPSN';

    validation.getCurrentValidationMessage(input);

    expect(validation.validateNumber).toHaveBeenCalledTimes(1);
  });

  it('should call a mock function if the input name is yearEnd', () => {
    jest.spyOn(validation, 'validateDate');
    input.name = 'yearEnd';

    validation.getCurrentValidationMessage(input);

    expect(validation.validateDate).toHaveBeenCalledTimes(1);
  });

  it('should call a mock function if the input name does not match any of the above', () => {
    jest.spyOn(validation, 'isRequiredAndEmpty');
    input.name = 'unknown';

    validation.getCurrentValidationMessage(input);

    expect(validation.isRequiredAndEmpty).toHaveBeenCalledTimes(1);
  });
});

