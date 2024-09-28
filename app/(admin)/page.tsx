'use client'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Button, Container, Pagination } from '@mui/material'
import { useEffect, useState } from 'react'
import ApiClient from '../utils/apiClient'
import { TableView } from './table'

const HomePage = () => {
  const [accounts, setAccounts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 50

  const fetchAccounts = async (page: number) => {
    try {
      const apiClient = ApiClient.getInstance()

      const data = await apiClient.request(
        `/account?page=${page}&items_per_page=${itemsPerPage}`
      )
      setAccounts(data.data)
      setTotalPages(data.lastPage)
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
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color='primary'
      />
    </Container>
  )
}

export default HomePage
