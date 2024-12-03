import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useFetchAllBreeds } from "../../state/query/breeds";
import { BreedsApiData } from "../../state/types";
import { BreedCard } from "../breeds/BreedCard";
import { Spinner } from "../ui/Spinner";

export function SearchResults() {
  const [results, setResults] = useState<BreedsApiData[]>([]);
  const [searchParams,] = useSearchParams();

  const {
    data,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isPending,
  } = useFetchAllBreeds();

  useEffect(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, data]);

  useEffect(() => {
    if (!hasNextPage && data) {
      const results = [];
      const searchTerm = searchParams.get('query')?.toLowerCase();
      for (const page of data.pages) {
        for (const breed of page.data) {
          if (searchTerm) {
            if (breed.attributes.name.toLowerCase().includes(searchTerm)) {
              results.push(breed);
            }
          } else {
            results.push(breed);
          }
        }
      }
      setResults(results);
    }
  }, [data, hasNextPage, searchParams]);

  if (hasNextPage || isPending) return <Spinner />;
  if (isError) return <span>Error: {error.message}</span>;

  if (results.length === 0) {
    return (
      <article className="flex items-center justify-center">
        <p>No results for <b>{searchParams.get('query')}</b></p>
      </article>
    )
  }

  return (
    <article className="flex flex-wrap gap-8">
      {results.map(({ id, attributes }) => {
        return <BreedCard key={id} id={id} name={attributes.name} description={attributes.description} />
      })}
    </article>
  )
}