export interface AccountType {
  id: number;
  name: string;
  email: string;
  password: string;
  phoneNumber: string | null;
  phoneModel: string | null;
  isLive: boolean;
  isVerify: boolean;
  recoveryMail: string | null;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
  isLocked: boolean;
  lockAt: string | null;
}

export interface AccountsResponse {
  data: [AccountType];
  total: number | null;
  currentPage: number | null;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number | null;
}
