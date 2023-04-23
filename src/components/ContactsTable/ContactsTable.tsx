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
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { createColumnHeaderData } from '../../helpers/helpers';
import { IContact } from '../../models/IContact';

const StyledTable = styled(Table)(({ theme }) => ({
  borderCollapse: 'separate',
  borderSpacing: '0px 12px',
  tableLayout: 'fixed',
  width: 'auto',
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
  padding: '12px 6px',
  lineHeight: '1',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  fontSize: '20px',
  [theme.breakpoints.down('xl')]: {
    fontSize: '16px',
  },
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
    padding: '24px 12px',

    '&:first-child': {
      padding: '24px 12px 24px 9px',
    },
    '&:last-child': {
      padding: '24px 9px 24px 12px',
    },
  },
  [theme.breakpoints.up('md')]: {
    '&.MuiTableCell-head:nth-child(1)': {
      width: '7.37%',
    },
    '&.MuiTableCell-head:nth-child(2)': {
      width: '10.56%',
    },
    '&.MuiTableCell-head:nth-child(3)': {
      width: '8.69%',
    },
    '&.MuiTableCell-head:nth-child(4)': {
      width: '9.41%',
    },
    '&.MuiTableCell-head:nth-child(5)': {
      width: '9.41%',
    },
    '&.MuiTableCell-head:nth-child(6)': {
      width: '12.21%',
    },
    '&.MuiTableCell-head:nth-child(7)': {
      width: '11%',
    },
    '&.MuiTableCell-head:nth-child(8)': {
      width: '11.2%',
    },
    '&.MuiTableCell-head:nth-child(9)': {
      width: '14%',
    },
    '&.MuiTableCell-head:nth-child(10)': {
      width: '7.26%',
    },
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

const headers = [
  'Client ID',
  'Client name',
  'TRN/PPSN',
  'Year end',
  'ARD',
  'Company number',
  'Email',
  'Phone number',
  'Company adress',
  'Actions',
];

const columnHeaders = createColumnHeaderData(headers);

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

  const pageChangeHandler = (e: React.MouseEvent<HTMLButtonElement> | null, nextPage: number) => {
    setPage(nextPage);

    const updatedRows = rows.slice(
      rowsPerPage * nextPage,
      rowsPerPage * nextPage + rowsPerPage,
    );

    setVisibleRows(updatedRows);
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

  return (
    <TableContainer
      sx={{
        overflowX: 'auto',
      }}
    >
      <StyledTable
      >
        <TableHead>
          <StyledTableRow>
            {columnHeaders.map((header) => (
              <StyledTableCell
                key={header.id}
              >
                {header.text}
              </StyledTableCell>
            ))}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {visibleRows.map((row) => (
            <StyledTableRow
              key={row.clientId}
              sx={{
              }}
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
                <ButtonGroup
                  id={row.clientId.toString()}
                  sx={{
                    '& > .MuiButtonBase-root:first-child': {
                      mr: '15px',
                    },
                    '@media (min-width:1200px) and (max-width:1536px)': {
                      flexDirection: 'column',
                      '& > .MuiButtonBase-root:first-child': {
                        mr: '0',
                        mb: '10px',
                      },
                    },
                  }}
                >
                  <StyledIconButton
                    onClick={editHandler}
                    sx={{
                      color: '#EDBC4A',
                    }}
                  >
                    <EditIcon
                      sx={{
                        pointerEvents: 'none',
                      }}
                    />
                  </StyledIconButton>
                  <StyledIconButton
                    onClick={deleteHandler}
                    color='error'
                  >
                    <DeleteIcon
                      sx={{
                        pointerEvents: 'none',
                      }}
                    />
                  </StyledIconButton>
                </ButtonGroup>
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
