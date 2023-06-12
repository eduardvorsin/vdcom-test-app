import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import ContactForm from '../ContactForm/ContactForm';

type ContactDialogProps = {
  title: string,
  open: boolean,
  actionType: 'add' | 'change',
  onClose: (event: React.SyntheticEvent, reason: string) => void,
}

const ContactDialog: React.FC<ContactDialogProps> = ({
  title,
  open,
  actionType,
  onClose,
}) => {
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    onClose(e, 'on submit form');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      data-testid='contact-dialog'
    >
      <DialogTitle
        component={'h2'}
        sx={{
          fontFamily: 'Poppins',
          textAlign: 'center',
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent
      >
        <ContactForm
          actionType={actionType}
          onSubmit={submitHandler}
        />
      </DialogContent>
    </Dialog >
  );
};

export default ContactDialog;
