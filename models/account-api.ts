export type AccountRes = {
  id: number
  name: string
  email: string
  password: string
  phoneNumber: string
  phoneModel: string
  isLive: boolean
  isVerify: boolean
  recoveryMail: string | null
  createdBy: string
  createdAt: string
  updatedAt: string
  isLocked: boolean
  lockAt: string | null
}

export type Pagination = {
  _page: number
  _limit: number
  _total: number
}

export type PaginationResponse<T> = {
  data: T[]
  total: number
  currentPage: number
  nextPage: number | null
  prevPage: number | null
  lastPage: number
}
