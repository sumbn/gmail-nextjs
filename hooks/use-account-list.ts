import useSWR, { SWRConfiguration } from 'swr'
import { ListParams } from '../models/api'
import { QueryKeys } from '../constants/query-keys'

export interface UseAccountListProps {
  params: Partial<ListParams>
  options?: SWRConfiguration
}

export function useAccountList({ params, options }: UseAccountListProps) {
  const swrResponse = useSWR(
    [QueryKeys.GET_ACCOUNT_LIST, params],
    () => {
      //call api
    },
    {
      keepPreviousData: true,
      dedupingInterval: 30 * 1000, //30s
      // fallbackData: {data: [], pagination: {}},
      ...options,
    }
  )
  return swrResponse
}
