import { useQuery } from "@tanstack/react-query";
import { ALL_IMAGE_BREEDS, getRandomImageByBreedUrl, RANDOM_DOG_IMAGE_URL } from "../types";

export function useFetchRandomImage() {
  return useQuery({
    queryKey: ['randomImage'],
    queryFn: async () => {
      const res = await fetch(`${RANDOM_DOG_IMAGE_URL}`);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json()
    },
    staleTime: Infinity,
  })
}

export function useFetchAllImageBreeds() {
  return useQuery({
    queryKey: ['imageBreeds'],
    queryFn: async () => {
      const res = await fetch(`${ALL_IMAGE_BREEDS}`);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json()
    },
    staleTime: Infinity,
  })
}

export function useFetchRandomImageByBreed(breed?: string) {
  return useQuery({
    queryKey: ['randomImage', breed],
    queryFn: async () => {
      const res = await fetch(getRandomImageByBreedUrl(breed));
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json()
    },
    staleTime: Infinity,
    enabled: !!breed,
  })
}