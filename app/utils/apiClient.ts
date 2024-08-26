import { getSession } from "next-auth/react";


class ApiClient {
  private static instance: ApiClient;
  private baseUrl: string;

  private constructor() {
    // Đặt base URL từ biến môi trường
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  }

  // Hàm để lấy instance duy nhất của ApiClient
  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  // Hàm để gọi API
  public async request(endpoint: string, options: RequestInit = {}) {
    const session = await getSession();
    const token = session?.user?.accessToken;

    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
        ...options.headers,
      },
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, config);

    if (!response.ok) {
      // Xử lý lỗi
      const error = await response.text();
      throw new Error(error);
    }

    return response.json();
  }
}

export default ApiClient;