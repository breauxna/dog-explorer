import { useEffect, useState } from "react"
import { BreedCard } from "./BreedCard";
import { getPageParam, useFetchBreeds } from "../../state/query/breeds";
import { Spinner } from "../ui/Spinner";
import { Paginator } from "../common/Paginator";
import { useSearchParams } from "react-router";

export function Breeds() {
  const [totalPageCount, setTotalPageCount] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const breedsQuery = useFetchBreeds(page);

  const handleNextPage = () => {
    setSearchParams((params) =>{
      params.set('page', (page + 1).toString());
      return params;
    });
  }

  const handlePrevPage = () => {
    setSearchParams((params) =>{
      params.set('page', (page - 1).toString());
      return params;
    });
  }

  useEffect(() => {
    if (breedsQuery.data?.links?.last) {
      const lastPage = getPageParam(breedsQuery.data.links?.last);
      setTotalPageCount(lastPage);
    } else if (breedsQuery.data?.links?.current) {
      const lastPage = getPageParam(breedsQuery.data.links?.current);
      setTotalPageCount(lastPage);
    }
  }, [breedsQuery.data?.links]);

  if (breedsQuery.isError) return <span>Error: {breedsQuery.error.message}</span>;

  return (
    <section className="flex flex-col items-center">
      <article className="flex flex-wrap content-start gap-6 mb-12 min-h-[calc(100vh-theme(space.14))] md:min-h-[calc(80vh-4.5rem)]">
        {breedsQuery.isPending ? 
          <Spinner /> :
          breedsQuery.data?.data.map(({id, attributes}) => {
            return (
              <BreedCard key={id} id={id} name={attributes.name} description={attributes.description} />
            );
          })
        }
      </article>
      {totalPageCount &&
        <Paginator 
          curPage={page} 
          totalPageCount={totalPageCount} 
          onNextPage={handleNextPage} 
          onPrevPage={handlePrevPage}
        />
      }
    </section>
  )
}