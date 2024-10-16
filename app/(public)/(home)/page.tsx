import { Container } from '@mui/material';
import { TableAccount } from '../../../components';
import { AccountsResponse, ErrorResponse } from '../../../types';
import { Suspense } from 'react';
import { apiCall } from '../../../utils';
async function getData(
  page: number,
  itemsPerPage: number
): Promise<AccountsResponse | ErrorResponse> {
  const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/account?page=${page}&items_per_page=${itemsPerPage}`;

  const response = await apiCall<AccountsResponse>(url);

  return response;
}

export default async function Home() {
  const data = await getData(1, 20);
  if ('error' in data) {
    console.error('Lỗi khi lấy dữ liệu tài khoản:', data.error);
    return (
      <main>
        <Container>
          <p>Không thể lấy dữ liệu: {data.error}</p>
        </Container>
      </main>
    );
  }

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
