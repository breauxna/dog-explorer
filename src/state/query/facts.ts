import { useQuery } from "@tanstack/react-query";
import { FACTS_URL, FetchAllFactsResponse } from "../types";

export function useFetchFacts(limit?: number) {
  let params = null;
  if (limit) {
    params = new URLSearchParams({
      'limit': limit.toString(),
    });
  }

  return useQuery({
    queryKey: ['facts', limit],
    queryFn: async (): Promise<FetchAllFactsResponse> => {
      const res = await fetch(`${FACTS_URL}${params ? `?${params}`: ''}`);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json()
    },
    staleTime: Infinity,
  })
}
