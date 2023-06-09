import React, { useReducer } from 'react';
import {
  Box,
  Button,
  TextField,
  styled,
} from '@mui/material';
import { Form, useSubmit } from 'react-router-dom';
import { ContactWithoutId } from '../../models/IContact';
import { getCurrentValidationMessage, isEmpty } from '../../utils/validation/validation';

type ContactFormElements = HTMLFormControlsCollection &
  Record<keyof ContactWithoutId, HTMLInputElement>;

type ContactWithoutIdFormState = Record<keyof ContactWithoutId, string>;
type ContactFormProps = {
  actionType: 'add' | 'change',
  onSubmit: React.FormEventHandler<HTMLFormElement>,
};

type ContactFormAction = {
  type: keyof ContactWithoutId,
  payload: string,
};

const FormInner = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridAutoRows: 'min-content',
  gap: '20px',
  padding: '10px 0px',
}));

const StyledTextField = styled(TextField)(() => ({
  '& > .MuiFormHelperText-root': {
    textDecoration: 'line-through',
  },
}));

const formStateReducer = (state: ContactWithoutIdFormState, action: ContactFormAction) => {
  const unknowAction = Object.keys(state).every((type) => type !== action.type);

  if (unknowAction) {
    return state;
  }

  return {
    ...state,
    [action.type]: action.payload,
  };
};

const initializeEmptyFormState = (): ContactWithoutIdFormState => ({
  clientName: '',
  'TRN/PPSN': '',
  yearEnd: '',
  ARD: '',
  companyNumber: '',
  email: '',
  phoneNumber: '',
  companyAdress: '',
});

const ContactForm: React.FC<ContactFormProps> = ({
  actionType,
  onSubmit,
}) => {
  const [formState, dispatchFormState] = useReducer<typeof formStateReducer, null>(
    formStateReducer,
    null,
    initializeEmptyFormState,
  );

  const [formErrorState, dispatchFormErrorState] = useReducer<typeof formStateReducer, null>(
    formStateReducer,
    null,
    initializeEmptyFormState,
  );

  const submit = useSubmit();

  const submitValidationHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formElements = e.currentTarget.elements as ContactFormElements;
    const formFields = [...new FormData(e.currentTarget).keys()] as (keyof ContactWithoutId)[];

    const errors = [] as string[];

    formFields.forEach((field) => {
      const currentErrorMessage = getCurrentValidationMessage(formElements[field]);

      if (currentErrorMessage !== '') {
        dispatchFormErrorState({
          type: field,
          payload: currentErrorMessage,
        });
        errors.push(currentErrorMessage);
      }
    });

    if (errors.length < 1) {
      submit(e.currentTarget, { replace: true });
      onSubmit(e);
    }
  };

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    const type = name as keyof ContactWithoutId;

    dispatchFormState({
      type,
      payload: value,
    });

    const currentErrorMessage = getCurrentValidationMessage(e.target);

    dispatchFormErrorState({
      type,
      payload: currentErrorMessage,
    });
  };

  return (
    <Form
      method='post'
      action={actionType}
      onSubmit={submitValidationHandler}
      noValidate
      data-testid='contact-form'
    >
      <FormInner>
        <StyledTextField
          value={formState.clientName}
          required
          error={!isEmpty(formErrorState.clientName)}
          helperText={formErrorState.clientName}
          onChange={changeHandler}
          name='clientName'
          label='Client Name'
        />
        <StyledTextField
          value={formState['TRN/PPSN']}
          required
          error={!isEmpty(formErrorState['TRN/PPSN'])}
          helperText={formErrorState['TRN/PPSN']}
          onChange={changeHandler}
          name='TRN/PPSN'
          label='TRN/PPSN'
        />
        <StyledTextField
          value={formState.yearEnd}
          required
          error={!isEmpty(formErrorState.yearEnd)}
          helperText={formErrorState.yearEnd}
          onChange={changeHandler}
          name='yearEnd'
          label='Year End'
        />
        <StyledTextField
          value={formState.ARD}
          required
          error={!isEmpty(formErrorState.ARD)}
          helperText={formErrorState.ARD}
          onChange={changeHandler}
          name='ARD'
          label='ARD'
        />
        <StyledTextField
          value={formState.companyNumber}
          required
          error={!isEmpty(formErrorState.companyNumber)}
          helperText={formErrorState.companyNumber}
          onChange={changeHandler}
          name='companyNumber'
          label='Company Number'
        />
        <StyledTextField
          value={formState.email}
          type='email'
          required
          error={!isEmpty(formErrorState.email)}
          helperText={formErrorState.email}
          onChange={changeHandler}
          name='email'
          label='Email'
        />
        <StyledTextField
          value={formState.phoneNumber}
          type='tel'
          required
          error={!isEmpty(formErrorState.phoneNumber)}
          helperText={formErrorState.phoneNumber}
          onChange={changeHandler}
          name='phoneNumber'
          label='Phone Number'
        />
        <StyledTextField
          value={formState.companyAdress}
          required
          error={!isEmpty(formErrorState.companyAdress)}
          helperText={formErrorState.companyAdress}
          onChange={changeHandler}
          name='companyAdress'
          label='Company Adress'
        />
        <Button
          variant='contained'
          color='primary'
          type='submit'
        >
          To accept
        </Button>
      </FormInner>
    </Form>
  );
};

export default ContactForm;
