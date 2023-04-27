import React, { useCallback, useMemo, useState } from 'react';
import { useFetcher, useNavigate } from 'react-router-dom';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Fade,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ContactDialog from '../ContactDialog/ContactDialog';
import useAppSelector from '../../hooks/useAppSelector/useAppSelector';
import ContactsTable from '../ContactsTable/ContactsTable';
import { basename } from '../../router/AppRouter/AppRouter';

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
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: '40px',
        }}
      >
        <Typography
          align='center'
          variant='h3'
          component='h1'
          sx={{
            fontSize: '32px',
            mr: '30px',
            textAlign: 'left',
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
      </Box>

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
    </>
  );
};

export default Contacts;
