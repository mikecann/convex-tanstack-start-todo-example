import { Button } from "@mantine/core";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";

export function RandomNumberButton() {
  const getRandomNumberAction = useAction(api.actions.getRandomNumber);

  return (
    <Button
      onClick={async () => {
        alert(`Random number: ${await getRandomNumberAction()}`);
      }}
      variant="outline"
      size="xs"
    >
      Get Random Number
    </Button>
  );
}
