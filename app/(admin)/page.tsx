'use client'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Button, Container } from '@mui/material'
import { useEffect, useState } from 'react'
import ApiClient from '../utils/apiClient'
import { TableView } from './table'

const HomePage = () => {
  // const [data, setData] = useState(null);
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiClient = ApiClient.getInstance()
        const response = await apiClient.request('/account')
        console.log('call api =>   ', response)
        setData(response)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

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
      <TableView listItem={data} />
    </Container>
  )
}

export default HomePage
