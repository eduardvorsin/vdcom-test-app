import React, { useReducer, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Form, useFetcher } from 'react-router-dom';
import { ContactWithoutId } from '../../models/IContact';
import { getCurrentValidationMessage, isEmpty } from '../../helpers/validation';

// eslint-disable-next-line max-len
type ContactFormElements = HTMLFormControlsCollection & Record<keyof ContactWithoutId, HTMLInputElement>;
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
const formStateReducer = (state: ContactWithoutIdFormState, action: ContactFormAction) => {
  switch (action.type) {
    case 'clientName':
      return {
        ...state,
        clientName: action.payload,
      };
    case 'TRN/PPSN':
      return {
        ...state,
        'TRN/PPSN': action.payload,
      };
    case 'yearEnd':
      return {
        ...state,
        yearEnd: action.payload,
      };
    case 'ARD':
      return {
        ...state,
        ARD: action.payload,
      };
    case 'companyNumber':
      return {
        ...state,
        companyNumber: action.payload,
      };
    case 'email':
      return {
        ...state,
        email: action.payload,
      };
    case 'phoneNumber':
      return {
        ...state,
        phoneNumber: action.payload,
      };
    case 'companyAdress':
      return {
        ...state,
        companyAdress: action.payload,
      };
    default:
      return state;
  }
};

const ContactForm: React.FC<ContactFormProps> = ({
  actionType,
  onSubmit,
}) => {
  const [formState, dispatchFormState] = useReducer<typeof formStateReducer>(
    formStateReducer,
    {
      clientName: '',
      'TRN/PPSN': '',
      yearEnd: '',
      ARD: '',
      companyNumber: '',
      email: '',
      phoneNumber: '',
      companyAdress: '',
    },
  );

  const [formErrorState, dispatchFormErrorState] = useReducer<typeof formStateReducer>(
    formStateReducer,
    {
      clientName: '',
      'TRN/PPSN': '',
      yearEnd: '',
      ARD: '',
      companyNumber: '',
      email: '',
      phoneNumber: '',
      companyAdress: '',
    },
  );

  const submitValidationHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    const formData = new FormData(e.currentTarget);
    const formElements = e.currentTarget.elements as ContactFormElements;
    const formFields = [...formData.keys()] as (keyof ContactWithoutId)[];

    formFields.forEach((field) => {
      const currentErrorMessage = getCurrentValidationMessage(formElements[field]);

      if (currentErrorMessage !== '') {
        dispatchFormErrorState({
          type: field,
          payload: currentErrorMessage,
        });
      }
    });

    const hasErrors = Object.values(formErrorState).some((value) => value !== '');

    if (hasErrors) {
      e.preventDefault();
      return;
    }

    onSubmit(e);
  };

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    dispatchFormState({
      type: name as keyof ContactWithoutId,
      payload: value,
    });

    const currentErrorMessage = getCurrentValidationMessage(e.target);

    dispatchFormErrorState({
      type: name as keyof ContactWithoutId,
      payload: currentErrorMessage,
    });
  };

  return (
    <Form
      method='post'
      action={`${actionType}`}
      onSubmit={submitValidationHandler}
      noValidate
    >
      <FormInner>
        <TextField
          value={formState.clientName}
          required
          error={!isEmpty(formErrorState.clientName)}
          helperText={formErrorState.clientName}
          onChange={changeHandler}
          name='clientName'
          label='Client name'
        />
        <TextField
          value={formState['TRN/PPSN']}
          required
          error={!isEmpty(formErrorState['TRN/PPSN'])}
          helperText={formErrorState['TRN/PPSN']}
          onChange={changeHandler}
          name='TRN/PPSN'
          label='TRN/PPSN'
        />
        <TextField
          value={formState.yearEnd}
          required
          error={!isEmpty(formErrorState.yearEnd)}
          helperText={formErrorState.yearEnd}
          onChange={changeHandler}
          name='yearEnd'
          label='Year End'
        />
        <TextField
          value={formState.ARD}
          required
          error={!isEmpty(formErrorState.ARD)}
          helperText={formErrorState.ARD}
          onChange={changeHandler}
          name='ARD'
          label='ARD'
        />
        <TextField
          value={formState.companyNumber}
          required
          error={!isEmpty(formErrorState.companyNumber)}
          helperText={formErrorState.companyNumber}
          onChange={changeHandler}
          name='companyNumber'
          label='Company Number'
        />
        <TextField
          value={formState.email}
          type='email'
          required
          error={!isEmpty(formErrorState.email)}
          helperText={formErrorState.email}
          onChange={changeHandler}
          name='email'
          label='Email'
        />
        <TextField
          value={formState.phoneNumber}
          type='tel'
          required
          error={!isEmpty(formErrorState.phoneNumber)}
          helperText={formErrorState.phoneNumber}
          onChange={changeHandler}
          name='phoneNumber'
          label='Phone Number'
          inputProps={{
            pattern: '^[0-9]{10}$',
          }}
        />
        <TextField
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
