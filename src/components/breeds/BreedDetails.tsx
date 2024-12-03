import { useParams } from "react-router";
import { useFetchBreed } from "../../state/query/breeds";
import { Spinner } from "../ui/Spinner";

export function BreedDetails() {
  const { breedId } = useParams();
  const breedQuery = useFetchBreed(breedId || '');

  if (breedQuery.isPending) return <Spinner />;
  if (breedQuery.isError) return <span>{breedQuery.error.message}</span>;

  const {
    name, 
    male_weight, 
    female_weight, 
    hypoallergenic, 
    description,
    life
  } = breedQuery.data.data.attributes;

  return (
    <section className="m-6">
      <header>
        <h1 className="text-4xl text-center p-12">
          <b>{name}</b>
        </h1>
      </header>
      <section className="flex flex-col sm:flex-row sm:items-center flex-wrap p-6 mb-6 gap-4 justify-between rounded-lg bg-slate-100">
        <h2 className="text-xl font-bold">Breed Statistics</h2>
        <article className="flex flex-col">
          <h3><b>Weight</b></h3>
          <span>{Math.min(male_weight.min, female_weight.min)} to {Math.max(male_weight.max, female_weight.max)} pounds</span>
        </article>
        <article className="flex flex-col">
          <h3><b>Life span</b></h3>
          <span>{life.min} to {life.max} years</span>
        </article>
        <article className="flex flex-col">
          <h3><b>Allergies</b></h3>
          <span>This breed <b>{hypoallergenic ? 'is': 'is not '}</b> hypoallergenic</span>
        </article>
      </section>
      <section>
        <h2 className="text-2xl p-6 text-center">
          <b>About</b>
        </h2>
        <p>
          {description}
        </p>
      </section>
    </section>
  )
}