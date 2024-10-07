'use client'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Box, Button, Container, Pagination } from '@mui/material'
import { useEffect, useState } from 'react'
import { TableView } from './tableview'
import { fetcher } from '../utils/fetch-data'
import { AccountRes, PaginationResponse } from '../../models/account-api'

const HomePage = () => {
  const [accounts, setAccounts] = useState<AccountRes[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 50

  const fetchAccounts = async (page: number) => {
    try {
      const data = await fetcher<PaginationResponse<AccountRes>>(
        `https://project-gmail-gamma.vercel.app/account?page=${page}&items_per_page=${itemsPerPage}`
      )
      data && setAccounts(data.data)
      data && setTotalPages(data.lastPage)
    } catch (error) {
      console.error('Error fetching accounts:', error)
    }
  }

  useEffect(() => {
    fetchAccounts(currentPage)
  }, [currentPage])

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value)
  }

  return (
    <Container>
      <Button
        variant='contained'
        sx={{ mt: 2, mb: 2 }}
        color='success'
        size='small'
        startIcon={<AddCircleOutlineIcon />}
      >
        Create new user
      </Button>
      <TableView listItem={accounts} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '16px',
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color='primary'
          shape='rounded'
        />
      </Box>
    </Container>
  )
}

export default HomePage
