import { action } from "./_generated/server";

export const getRandomNumber = action({
  handler: async () => {
    return Math.random();
  },
});
