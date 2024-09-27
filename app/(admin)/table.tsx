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

// export function TableView({ listItem }: ITableViewProps) {
//   return (
//     <div>
//       <TableContainer component={Paper}>
//         <Table size='small' sx={{ minWidth: 650 }} aria-label='simple table'>
//           <TableHead sx={{ backgroundColor: '#2e7d32 !important' }}>
//             <TableRow>
//               <TableCell sx={{ color: 'white' }}>ID</TableCell>
//               <TableCell sx={{ color: 'white' }}>Name</TableCell>
//               <TableCell sx={{ color: 'white' }}>Email</TableCell>
//               <TableCell sx={{ color: 'white' }}>Password</TableCell>
//               <TableCell sx={{ color: 'white' }}>Verify</TableCell>
//               <TableCell sx={{ color: 'white' }}>Phone</TableCell>
//               <TableCell sx={{ color: 'white' }}>Created_by</TableCell>
//               <TableCell sx={{ color: 'white' }}>Created</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {listItem.map((user: any) => {
//               const formattedCreatedAt = moment(user.createdAt)
//                 .tz('Asia/Ho_Chi_Minh')
//                 .format('YYYY-MM-DD HH:mm:ss')
//               return (
//                 <TableRow key={user.id}>
//                   <TableCell component='th' scope='row'>
//                     {user.id}
//                   </TableCell>
//                   <TableCell>{user.name}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.password}</TableCell>
//                   <TableCell>{user.isVerify ? 'Yes' : 'No'}</TableCell>
//                   <TableCell>{user.phoneModel}</TableCell>
//                   <TableCell>{user.createdBy}</TableCell>
//                   <TableCell>{formattedCreatedAt}</TableCell>
//                 </TableRow>
//               )
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   )
// }

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

const paginationModel = { page: 0, pageSize: 100 }

export function TableView({ listItem }: ITableViewProps) {
  return (
    <Paper sx={{ width: '100%' }}>
      <DataGrid
        rows={listItem}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[50, 100]}
        checkboxSelection
        autoHeight
        sx={{ border: 0 }}
      />
    </Paper>
  )
}
