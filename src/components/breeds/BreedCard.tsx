import { Link } from "react-router";
import { Card } from "../ui/Card";

type BreedCardProps =  {id: string, name: string, description: string};

export function BreedCard({id, name, description}: BreedCardProps) {
  return (
    <Link to={`/breeds/${id}`} target="_blank">
      <Card title={name} info={description} />
    </Link>
  )
}