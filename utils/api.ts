import { ErrorResponse } from '../types';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: HeadersInit;
}

export default async function apiCall<T>(
  url: string,
  options?: ApiOptions
): Promise<T | ErrorResponse> {
  try {
    const response = await fetch(url, {
      method: options?.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      body: options?.body ? JSON.stringify(options.body) : null,
    });

    if (!response.ok) {
      const errorData = await response.json();

      return { error: errorData.message || 'Failed to fetch data' };
    }

    return (await response.json()) as T;
  } catch (error) {
    return { error: (error as Error).message || 'Failed to fetch data' };
  }
}
