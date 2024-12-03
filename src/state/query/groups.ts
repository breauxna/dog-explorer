import { useQuery } from "@tanstack/react-query";
import { FetchAllGroupsResponse, FetchGroupResponse, GROUPS_URL } from "../types";

export function useFetchGroups(page: number) {
  const params = new URLSearchParams({
    'page[number]': page.toString(),
  });

  return useQuery({
    queryKey: ['groups', page],
    queryFn: async (): Promise<FetchAllGroupsResponse> => {
      const res = await fetch(`${GROUPS_URL}${params ? `?${params}`: ''}`);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json()
    }
  })
}

export function useFetchGroup(id: string) {
  return useQuery({
    queryKey: ['groups', id],
    queryFn: async (): Promise<FetchGroupResponse> => {
      const res = await fetch(`${GROUPS_URL}/${id}`);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json()
    }
  });
}