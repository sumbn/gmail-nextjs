// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from '@mui/material'
import moment from 'moment-timezone'
import * as React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'

export interface ITableViewProps {
  listItem: any
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  { field: 'password', headerName: 'Password', width: 130 },
  {
    field: 'isVerify',
    headerName: 'Verify Phone',
    width: 100,
    renderCell: (params) => <Checkbox checked={params.value} />,
  },
  {
    field: 'isLive',
    headerName: 'Sent email',
    width: 100,
    renderCell: (params) => <Checkbox checked={params.value} />,
  },
  { field: 'phoneModel', headerName: 'Model', width: 90 },
  { field: 'createdBy', headerName: 'Created By', width: 130 },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 200,
    valueFormatter: (params) => {
      if (params) {
        return moment(params)
          .tz('Asia/Ho_Chi_Minh')
          .format('HH:mm:ss YYYY-MM-DD')
      }
      return ''
    },
  },
]

export function TableView({ listItem }: ITableViewProps) {
  const pageSize = 100

  const totalRows = listItem.length
  const lastPage = Math.ceil(totalRows / pageSize) - 1

  return (
    <Paper sx={{ width: '100%', height: '700px' }}>
      {' '}
      <DataGrid
        rows={listItem}
        columns={columns}
        pageSizeOptions={[100]}
        checkboxSelection
        paginationModel={{ page: lastPage, pageSize }}
        sx={{
          border: 0,
          '& .MuiDataGrid-root': {
            minHeight: '100%', // Đảm bảo bảng chiếm toàn bộ chiều cao
          },
        }}
        disableColumnMenu
      />
    </Paper>
  )
}
