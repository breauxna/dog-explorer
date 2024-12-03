import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { BREEDS_URL, FetchAllBreedsResponse, FetchBreedResponse } from "../types";

// 5 minutes
const ALL_BREEDS_STALE_TIME = 5 * 60 * 1000;

async function fetchBreedsPage(page = 1): Promise<FetchAllBreedsResponse> {
  const res = await fetch(`${BREEDS_URL}?page[number]=${page}`);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json()
}

/**
 * Takes in a JSONApi link url and returns the page number query param or 1 if it doesnt exist
 * @param link - JSONApi link url
 * @returns number
 */
export function getPageParam(link: string): number {
  const params = new URL(link).searchParams;
  const page = params.get('page[number]');
  if (page) {
    return parseInt(page);
  }
  return 1;
}

export function useFetchBreeds(page: number) {
  return useQuery({
    queryKey: ['breeds', page],
    queryFn: () => fetchBreedsPage(page),
  })
}

export function useFetchBreed(id: string) {
  return useQuery({
    queryKey: ['breed', id],
    queryFn: async (): Promise<FetchBreedResponse> => {
      const res = await fetch(`${BREEDS_URL}/${id}`);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json()
    }
  });
}

export function useFetchAllBreeds() {
  return useInfiniteQuery({
    queryKey: ['breeds'],
    queryFn: (ctx) => fetchBreedsPage(ctx.pageParam),
    initialPageParam: 1,
    staleTime: ALL_BREEDS_STALE_TIME,
    getNextPageParam: (lastPage: FetchAllBreedsResponse) => {
      if (lastPage.links?.next) {
        return getPageParam(lastPage.links.next);
      }
    },
    getPreviousPageParam: (firstPage: FetchAllBreedsResponse) => {
      if (firstPage.links?.current) {
        const curPage = getPageParam(firstPage.links.current);
        if (curPage > 1) {
          return curPage - 1;
        }
      }
    }
  })
}
