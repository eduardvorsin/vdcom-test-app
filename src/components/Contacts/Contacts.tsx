import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Fade,
  Typography,
  styled,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ContactDialog from '../ContactDialog/ContactDialog';
import useAppSelector from '../../hooks/useAppSelector/useAppSelector';
import ContactsTable from '../ContactsTable/ContactsTable';
import Spinner from '../UI/Spinner/Spinner';

const ContactsHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '0px',
  flexWrap: 'wrap',
  '& > :first-of-type, & > :last-of-type': {
    marginBottom: '20px',
  },
  [theme.breakpoints.up('sm')]: {
    flexWrap: 'no-wrap',
    marginBottom: '30px',
    '& > :first-of-type, & > :last-of-type': {
      marginBottom: '0px',
    },
  },
  [theme.breakpoints.up('md')]: {
    marginBottom: '40px',
  },
}));

const Contacts = () => {
  const [addContactModalOpen, setAddContactModalOpen] = useState(false);
  const [updateContactModalOpen, setUpdateContactModalOpen] = useState(false);

  const {
    data,
    status,
    error,
  } = useAppSelector((state) => state.contact);

  const navigate = useNavigate();

  const handleAddContactOpen = () => setAddContactModalOpen(true);
  const handleAddContactClose = () => setAddContactModalOpen(false);
  const handleUpdateContactOpen = (id: number) => {
    navigate(`/contacts/${id}`);
    setUpdateContactModalOpen(true);
  };
  const handleUpdateContactClose = () => setUpdateContactModalOpen(false);

  const MemoContactsTable = useMemo(() => (
    <ContactsTable
      rows={data}
      onDelete={() => { }}
      onEdit={handleUpdateContactOpen}
    />
  ), [data]);

  return (
    <Box
      data-testid='contacts'
    >
      <ContactsHeader>
        <Typography
          variant='h3'
          component='h1'
          sx={{
            fontSize: '32px',
            mr: '30px',
          }}
        >
          Total Contacts
        </Typography>

        {status === 'resolved' && (
          <Button
            disableRipple
            variant='text'
            onClick={handleAddContactOpen}
          >
            Add
            <AddIcon />
          </Button>
        )}
      </ContactsHeader>

      {
        status === 'rejected' && (
          <Fade
            in={Boolean(error)}
          >
            <Alert
              severity='error'
              variant='filled'
              sx={{
                mb: '30px',
              }}
            >
              <AlertTitle>{error}</AlertTitle>
              {error}
            </Alert>
          </Fade>
        )
      }

      <Box>
        {status === 'loading' && (
          <Spinner size={200} />
        )}

        {status === 'resolved' && (
          <>
            {MemoContactsTable}
          </>
        )}
      </Box>

      <ContactDialog
        actionType='add'
        title='Create new contact'
        open={addContactModalOpen}
        onClose={handleAddContactClose}
      />

      <ContactDialog
        actionType='change'
        title='Change current contact'
        open={updateContactModalOpen}
        onClose={handleUpdateContactClose}
      />
    </Box>
  );
};

export default Contacts;
