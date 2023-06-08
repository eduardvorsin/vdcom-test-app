import React, { useState } from 'react';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  IconButton,
  ButtonGroup,
  TableContainer,
  TablePagination,
  styled,
  TableFooter,
  TableSortLabel,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Form, useSubmit } from 'react-router-dom';
import { SortOrder, sortContactsBy } from '../../utils/helpers/helpers';
import { IContact } from '../../models/IContact';
import { visuallyHiddenStyles } from '../../App';

const StyledTable = styled(Table)(({ theme }) => ({
  borderCollapse: 'separate',
  borderSpacing: '0px 12px',
  tableLayout: 'fixed',
  width: '1600px',
  [theme.breakpoints.up('lg')]: {
    width: '100%',
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  backgroundColor: '#ffffff',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontFamily: 'Poppins',
  padding: '10px 6px',
  lineHeight: '1',
  fontSize: '16px',
  textAlign: 'center',
  verticalAlign: 'top',
  width: '15%',
  '&.MuiTableCell-head': {
    position: 'relative',
    '&:not(:last-child)': {
      '&::after': {
        content: '""',
        height: '25px',
        width: '2px',
        backgroundColor: '#000000',
        position: 'absolute',
        right: '0px',
        top: '50%',
        transform: 'translateY(-50%)',
      },
    },
  },
  [theme.breakpoints.up('xl')]: {
    verticalAlign: 'middle',
    fontSize: '18px',
    padding: '16px 4px 16px 4px',
    '&:first-child': {
      padding: '16px 4px 16px 8px',
    },
    '&:last-child': {
      padding: '16px 8px 16px 4px',
    },
  },
  [theme.breakpoints.up('lg')]: {
    overflowWrap: 'anywhere',
    width: 'calc((100% - 18%) / 7)',
    '&.MuiTableCell-head:first-child, &.MuiTableCell-head:nth-child(3), &.MuiTableCell-head:last-child': {
      width: '7%',
    },
  },
}));

const StyledTableSortLabel = styled(TableSortLabel)(({ theme }) => ({
  display: 'inline-flex',
  flexDirection: 'column',
  [theme.breakpoints.up('xl')]: {
    flexDirection: 'row',
  },
}));

const StyledIconButton = styled(IconButton)(() => ({
  '&': {
    width: '30px',
    height: '30px',
    padding: '5px',
  },
  '& > svg': {
    width: '100%',
    height: '100%',
  },
}));

const TableActions = styled(ButtonGroup)(({ theme }) => ({
  '& > .MuiButtonBase-root:first-child': {
    color: '#EDBC4A',
    mr: '15px',
  },
  [theme.breakpoints.between('lg', 'xl')]: {
    flexDirection: 'column',
    '& > .MuiButtonBase-root:first-child': {
      mr: '0',
      mb: '10px',
    },
  },
  '& svg': {
    pointerEvents: 'none',
  },
}));

const columnHeaders = [
  { id: 'clientId', text: 'Client ID' },
  { id: 'clientName', text: 'Client name' },
  { id: 'TRN/PPSN', text: 'TRN/PPSN' },
  { id: 'yearEnd', text: 'Year end' },
  { id: 'ARD', text: 'ARD' },
  { id: 'companyNumber', text: 'Company number' },
  { id: 'email', text: 'Email' },
  { id: 'phoneNumber', text: 'Phone number' },
  { id: 'companyAdress', text: 'Company adress' },
  { id: 'actions', text: 'Actions' },
];

const rowsPerPage = 9;

type ContactsTableProps = {
  onEdit: (id: number) => void,
  onDelete: (id: number) => void,
  rows: IContact[],
}
const ContactsTable: React.FC<ContactsTableProps> = ({
  onEdit,
  onDelete,
  rows,
}) => {
  const [visibleRows, setVisibleRows] = useState<IContact[]>(rows.slice(0, rowsPerPage));
  const [page, setPage] = useState<number>(0);
  const submit = useSubmit();
  const [orderBy, setOrderBy] = useState<keyof IContact>('clientId');
  const [order, setOrder] = useState<SortOrder>('asc');

  const pageChangeHandler = (e: React.MouseEvent<HTMLButtonElement> | null, nextPage: number) => {
    setPage(nextPage);

    const updatedRows = rows.slice(
      rowsPerPage * nextPage,
      rowsPerPage * nextPage + rowsPerPage,
    );

    setVisibleRows(updatedRows);
  };

  const deleteSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-alert
    const confirmation = window.confirm('Please confirm you want to delete this record.');

    if (confirmation) {
      submit(e.currentTarget, { replace: true });
    }
  };

  const deleteHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const contactId = e.currentTarget.parentElement?.id;

    if (contactId) {
      onDelete(+contactId);
    }
  };

  const editHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const contactId = e.currentTarget.parentElement?.id;

    if (contactId) {
      onEdit(+contactId);
    }
  };

  const sortHandler: React.MouseEventHandler = (e) => {
    const field = e.currentTarget.id as keyof IContact;
    const currentOrder = order === 'asc' ? 'desc' : 'asc';
    setOrderBy(field);
    setOrder(currentOrder);
    setVisibleRows(sortContactsBy(rows, field, currentOrder));
  };

  return (
    <TableContainer>
      <StyledTable
      >
        <TableHead>
          <StyledTableRow>
            {columnHeaders.map((headerCell) => (
              <StyledTableCell
                key={headerCell.id}
                sortDirection={orderBy === headerCell.id ? order : false}
              >
                {headerCell.id !== 'actions' && (
                  <StyledTableSortLabel
                    id={headerCell.id}
                    active={orderBy === headerCell.id}
                    direction={orderBy === headerCell.id ? order : 'asc'}
                    onClick={sortHandler}
                  >
                    {headerCell.text}
                    {orderBy === headerCell.id && (
                      <Box
                        component='span'
                        sx={visuallyHiddenStyles}
                      >
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    )}
                  </StyledTableSortLabel>
                )}

                {headerCell.id === 'actions' && (headerCell.text)}
              </StyledTableCell>
            ))}
          </StyledTableRow>
        </TableHead>

        <TableBody>
          {visibleRows.map((row) => (
            <StyledTableRow
              key={row.clientId}
            >
              <StyledTableCell
              >
                {row.clientId}
              </StyledTableCell>
              <StyledTableCell
              >
                {row.clientName}
              </StyledTableCell>
              <StyledTableCell
              >
                {row['TRN/PPSN']}
              </StyledTableCell>
              <StyledTableCell
              >
                {row.yearEnd}
              </StyledTableCell>
              <StyledTableCell
              >
                {row.ARD}
              </StyledTableCell>
              <StyledTableCell
              >
                {row.companyNumber}
              </StyledTableCell>
              <StyledTableCell
              >
                {row.email}
              </StyledTableCell>
              <StyledTableCell
              >
                {row.phoneNumber}
              </StyledTableCell>
              <StyledTableCell
              >
                {row.companyAdress}
              </StyledTableCell>
              <StyledTableCell
              >
                <TableActions
                  id={row.clientId.toString()}
                >
                  <StyledIconButton
                    onClick={editHandler}
                  >
                    <EditIcon />
                  </StyledIconButton>

                  <Form
                    method='post'
                    action={`${row.clientId}/delete`}
                    onSubmit={deleteSubmitHandler}
                  >
                    <StyledIconButton
                      type='submit'
                      color='error'
                      onClick={deleteHandler}
                    >
                      <DeleteIcon />
                    </StyledIconButton>
                  </Form>

                </TableActions>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter>
          <StyledTableRow
            sx={{
              backgroundColor: 'transparent',
              boxShadow: 'none',
            }}
          >
            <TablePagination
              rowsPerPage={rowsPerPage}
              count={rows.length}
              onPageChange={pageChangeHandler}
              page={page}
              rowsPerPageOptions={[]}
              sx={{
                border: 'none',
              }}
            />
          </StyledTableRow>
        </TableFooter>
      </StyledTable>
    </TableContainer>
  );
};

export default ContactsTable;
