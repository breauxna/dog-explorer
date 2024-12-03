import { useNavigate } from "react-router";
import { Button } from "../ui/Button";
import { useQueryClient } from "@tanstack/react-query";

export function RandomDogButton() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleClick = () => {
    queryClient.invalidateQueries({ queryKey: ['randomImage']});
    queryClient.invalidateQueries({ queryKey: ['facts', 1]});
    navigate('/breeds/random')
  }

  return (
    <Button onClick={handleClick}>
      Random Dog
    </Button>
  );
}