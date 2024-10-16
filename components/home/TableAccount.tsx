'use client';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AccountsResponse, AccountType, ErrorResponse } from '../../types';
import { useRouter, useSearchParams } from 'next/navigation';

import { blueGrey, red } from '@mui/material/colors';
import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import { apiCall } from '../../utils';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: blueGrey[300],
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const OverlayContainer = styled('div')(({ theme }) => ({
  position: 'relative',
}));

const Overlay = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  zIndex: 1,
}));

async function getData(
  page: number,
  itemsPerPage: number
): Promise<AccountsResponse | ErrorResponse> {
  const url = `/account?page=${page}&items_per_page=${itemsPerPage}`;

  const response = await apiCall<AccountsResponse>(url);

  return response; // Trả về trực tiếp kết quả, có thể là AccountsResponse hoặc ErrorResponse
}

export interface TableAccountProps {
  list: AccountType[];
  lastPage: number | null;
}

export default function TableAccount(props: TableAccountProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [listAccounts, setListAccounts] = React.useState<AccountType[]>(
    props.list
  );
  const [loading, setLoading] = React.useState(false);

  const [page, setPage] = React.useState(Number(searchParams.get('page')) || 1);
  const [itemsPerPage, setItemsPerPage] = React.useState(
    searchParams.get('itemsPerPage') || '20'
  );
  const [lastPage, setLastPage] = React.useState(props.lastPage);

  React.useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      // const newPage = Number(searchParams.get('page')) || 1;
      // const newItemsPerPage = Number(searchParams.get('itemsPerPage')) || 20;

      // try {
      //   const data = await getData(newPage, newItemsPerPage);
      //   setListAccounts(data.data);
      //   setLastPage(data.lastPage);
      // } catch (error) {
      //   console.error('Failed to fetch data:', error);
      // } finally {
      //   setLoading(false);
      // }
      setLoading(true);
      const newPage = Number(searchParams.get('page')) || 1;
      const newItemsPerPage = Number(searchParams.get('itemsPerPage')) || 20;

      const data = await getData(newPage, newItemsPerPage);

      if ('error' in data) {
        console.error('Failed to fetch data:', data.error);
      } else {
        setListAccounts(data.data);
        setLastPage(data.lastPage);
      }

      setLoading(false);
    };

    fetchData();
  }, [searchParams]);

  const handleChangeItemsPerPage = (event: SelectChangeEvent) => {
    const newItemsPerPage = event.target.value;
    setItemsPerPage(newItemsPerPage);
    setPage(1);
    router.push(`?page=1&itemsPerPage=${newItemsPerPage}`);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    router.push(`?page=${value}&itemsPerPage=${itemsPerPage}`);
  };

  const headers =
    1 < 2
      ? ['id', 'name', 'email', 'isLive', 'isVerify', 'createdAt']
      : ['id', 'name', 'email', 'password', 'isLive', 'isVerify', 'createdAt'];

  const main = {
    '& .Mui-selected': {
      bgcolor: '#B88E2F !Important',
    },
  };

  return (
    <Box>
      <OverlayContainer>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: 'calc(100vh - 200px)' }}
        >
          <Table sx={{ minWidth: 700 }} aria-label='customized table'>
            <TableHead>
              <StyledTableRow>
                {headers.map((header) => (
                  <StyledTableCell
                    key={header}
                    align='center'
                    sx={{
                      minWidth:
                        header === 'isLive' || header === 'isVerify'
                          ? 80
                          : 'auto',
                      maxWidth: header === 'email' ? 200 : 'auto',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    }}
                  >
                    {header.charAt(0).toUpperCase() + header.slice(1)}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {listAccounts.map((row) => (
                <StyledTableRow key={row.id}>
                  {headers.map((header) => (
                    <TableCell
                      key={header}
                      align='center'
                      sx={{
                        minWidth:
                          header === 'isLive' || header === 'isVerify'
                            ? 80
                            : 'auto',
                        maxWidth: header === 'email' ? 200 : 'auto',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                      }}
                    >
                      {typeof row[header as keyof AccountType] === 'boolean'
                        ? row[header as keyof AccountType]
                          ? 'True'
                          : 'False'
                        : row[header as keyof AccountType] !== undefined
                        ? row[header as keyof AccountType]
                        : 'N/A'}
                    </TableCell>
                  ))}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {loading && (
          <Overlay>
            <CircularProgress />
          </Overlay>
        )}
      </OverlayContainer>

      <Stack
        sx={{ my: 4 }}
        width='100%'
        direction='row'
        spacing={2}
        justifyContent='flex-end'
        alignItems='center'
      >
        <FormControl sx={{ minWidth: 120 }} size='small'>
          <InputLabel id='demo-select-small-label'>Items per page</InputLabel>
          <Select
            labelId='demo-select-small-label'
            id='demo-select-small'
            value={itemsPerPage}
            label='Items per page'
            onChange={handleChangeItemsPerPage}
          >
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
        <Pagination
          sx={main}
          variant='outlined'
          color='primary'
          count={lastPage || 1} // Tổng số trang, bạn có thể thay đổi theo dữ liệu
          page={page}
          onChange={handleChange}
          showFirstButton
          showLastButton
        />
      </Stack>
    </Box>
  );
}
