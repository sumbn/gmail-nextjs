'use client'
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ApiClient from "../utils/apiClient";
import { useEffect, useState } from "react";

const HomePage = () => {

  // const [data, setData] = useState(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiClient = ApiClient.getInstance();
        const response = await apiClient.request('/account');
        console.log("call api =>   ", response)
        setData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
  <Container>
    <Button variant="contained" sx={{mt: 2, mb: 2}} color="success" size="small" startIcon={<AddCircleOutlineIcon/>}>
    Create new user
    </Button>
    <TableContainer component={Paper}>
      <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{backgroundColor: '#2e7d32 !important'}}>
          <TableRow>
            <TableCell sx={{color: 'white'}}>ID</TableCell>
            <TableCell sx={{color: 'white'}}>Name</TableCell>
            <TableCell sx={{color: 'white'}}>Email</TableCell>
            <TableCell sx={{color: 'white'}}>Password</TableCell>
            <TableCell sx={{color: 'white'}}>Address</TableCell>
            <TableCell sx={{color: 'white'}}>Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((user:any) => (
            <TableRow key={user.id}>
            <TableCell component="th" scope="row">
              {user.id}
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.password}</TableCell>
            <TableCell>{user.address}</TableCell>
            <TableCell>{user.created_at}</TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Container>
  )
}

export default HomePage