export const rewards = [
   {
      description: "Get 987 clicks",
      apply(clicker) {
            clicker.increment(987);
      },
      maxLevel: 3,
   },
   {
      description: "Get 100898 clicks",
      apply(clicker) {
            clicker.increment(100898);
      },
      maxLevel: 3,
   },
   {
      description: "Get 10 click bot",
      apply(clicker) {
            clicker.increment(10);
      },
      minLevel: 3,
      maxLevel: 4,
   },
   {
      description: "Increase bot power!",
      apply(clicker) {
            clicker.power += 1;
      },
      minLevel: 3,
   },
];
