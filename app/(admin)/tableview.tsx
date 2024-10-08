'use client'
import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import moment from 'moment-timezone'
import { AccountRes } from '../../models/account-api'

export interface ITableViewProps {
  listItem: AccountRes[]
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein }
}
export function TableView({ listItem }: ITableViewProps) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: 'calc(100vh - 200px)', // Trừ chiều cao của header (64px) khỏi chiều cao toàn màn hình
      }}
    >
      <Table sx={{ minWidth: 700 }} aria-label='customized table' stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Password</StyledTableCell>
            <StyledTableCell>Verify</StyledTableCell>
            <StyledTableCell>Live</StyledTableCell>
            <StyledTableCell>Phone</StyledTableCell>
            <StyledTableCell>Created by</StyledTableCell>
            <StyledTableCell>Created at</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listItem.map((account) => {
            const formattedCreatedAt = moment(account.createdAt)
              .tz('Asia/Ho_Chi_Minh')
              .format('HH:mm:ss YYYY-MM-DD')
            return (
              <StyledTableRow key={account.id}>
                <StyledTableCell>{account.id}</StyledTableCell>
                <StyledTableCell>{account.name}</StyledTableCell>
                <StyledTableCell>{account.email}</StyledTableCell>
                <StyledTableCell>{account.password}</StyledTableCell>
                <StyledTableCell>
                  {account.isVerify ? 'Yes' : 'No'}
                </StyledTableCell>
                <StyledTableCell>
                  {account.isLive ? 'Yes' : 'No'}
                </StyledTableCell>
                <StyledTableCell>{account.phoneModel}</StyledTableCell>
                <StyledTableCell>{account.createdBy}</StyledTableCell>
                <StyledTableCell>{formattedCreatedAt}</StyledTableCell>
              </StyledTableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
