import { useEffect, useState } from "react";
import { useFetchFacts } from "../../state/query/facts";
import { useFetchRandomImage } from "../../state/query/images";
import { Spinner } from "../ui/Spinner";
import { Card } from "../ui/Card";

export function RandomBreed() {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const imageQuery = useFetchRandomImage();
  const factsQuery = useFetchFacts(1);

  useEffect(() => {
    if (imageQuery.isFetching) {
      setIsImageLoaded(false);
    }
  }, [imageQuery.isFetching]);

  if (imageQuery.isPending || factsQuery.isPending) return <Spinner />;
  if (imageQuery.isError) return <span>Error: {imageQuery.error.message}</span>;
  if (factsQuery.isError) return <span>Error: {factsQuery.error.message}</span>;

  return (
    <>
      {!isImageLoaded && <Spinner /> }
      <article className={`${isImageLoaded ? 'flex' : 'hidden'} items-center justify-center`}>
        <Card 
          img={{src: imageQuery.data.message, alt: "random dog image"}} 
          title={'Fun dog fact'} 
          info={factsQuery.data.data[0].attributes.body}
          onImageLoad={() => setIsImageLoaded(true)}
        />
      </article>
    </>
  )
}