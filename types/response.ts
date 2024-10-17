export interface ErrorResponse {
  error: string;
}

export interface LoginResponse {
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}
