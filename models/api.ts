export interface ListParams {
  _page: number
  _limit: number
}

export interface Pagination {
  _page: number
  _limit: number
  _total: number
}

export interface ListResponse<T> {
  data: Array<T>
  pagination: Pagination
}
