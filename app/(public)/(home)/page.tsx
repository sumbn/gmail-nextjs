import { Container } from '@mui/material';
import { TableAccount } from '../../../components';
import { AccountsResponse } from '../../../types';
import { Suspense } from 'react';

export default async function Home() {
  async function getData(page: number, itemsPerPage: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/account?page=${page}&items_per_page=${itemsPerPage}`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const response: AccountsResponse = await res.json();
    return response;
  }
  const data = await getData(1, 20);

  return (
    <main>
      <Container>
        <Suspense>
          <TableAccount list={data.data} lastPage={data.lastPage} />
        </Suspense>
      </Container>
    </main>
  );
}
