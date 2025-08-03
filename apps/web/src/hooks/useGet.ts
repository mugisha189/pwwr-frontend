import { authApi } from '@/lib/axios';
import { getObjValue } from '@/lib/utils/func-1';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { use, useEffect } from 'react';

interface Opts<T = any> {
  onMount?: boolean;
  fetcher?: (url: string) => Promise<T>;
  /**
   * The key to use to access the data in the response use 'some.other.thing' to access response.some.other.thing
   * @default 'data'
   */
  dataKey?: string;
  defaultData?: T;
  useAuth?: boolean;
  refreshInterval?: number;
  revalidateOnFocus?: boolean;
  /**
   * A dependency to fetch if not null, make it null to cancel revalidation
   */
  dependOn?: any;
  params?: Record<string, any>;
  queryKey?: string[] | undefined;
  setData?: (data: T) => void;
}

/**
 * A hook to fetch data from an API using SWR
 * @param url
 * @param opts
 * @returns
 */
export default function useGet<T>(url: string, opts: Opts<T> = {}, _params?: Record<string, any>) {
  const { fetcher, dataKey, defaultData, onMount = true, refreshInterval, revalidateOnFocus, queryKey, params, setData } = opts;
  const queryClient = useQueryClient();
  const _url = constructUrlWithParams(url, params);
  const qKey = queryKey ?? [_url];
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    {
      queryKey: qKey,
      queryFn: getData,
      refetchInterval: refreshInterval,
      refetchOnWindowFocus: revalidateOnFocus,
      retry: 1,
      enabled: onMount,
      // initialData: () => {
      //   return queryClient.getQueryData([queryKey ?? _url]) ?? defaultData;
      // },
    },
    queryClient,
  );
  // console.log(' queryClient.getQueryData([queryKey || _url])', queryClient.);

  // useEffect(() => {
  //   if (onMount) {
  //     refetch();
  //   }
  // }, [onMount]);

  async function getData(): Promise<T | null | undefined> {
    try {
      let data: T | null | undefined = null;
      if (fetcher) {
        data = await fetcher(_url);
      } else {
        const response = await authApi.get(_url /*  { params: params } */);
        data = dataKey ? getObjValue<T>(response.data, dataKey) : response.data?.data || response.data;
      }
      // console.log('data', data);
      if (data) setData?.(data);
      return data;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  // const refetchClient = useCallback(() => {
  //    queryClient.refetchQueries({ queryKey: [queryKey ?? url] });
  // }, [queryClient, queryKey, url]);

  useEffect(() => {
    if (_url) {
      console.log('_url', _url);
      // refetchClient();
    }
  }, [_url]);

  return { data, isLoading, error, refetch, isRefetching, client: queryClient };
}

function constructUrlWithParams(url: string, params: Record<string, any> | undefined) {
  if (!params) return url;
  // remove undefined params
  const _params = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => {
      return v !== undefined && v !== null && v !== '';
    }),
  );
  return `${url}?${new URLSearchParams(_params).toString()}`;
}
