const items = [
  {
    name: 'item1',
    weight: 6,
    value: 30,
  },
  {
    name: 'item2',
    weight: 3,
    value: 14,
  },
  {
    name: 'item3',
    weight: 4,
    value: 16,
  },
  {
    name: 'item4',
    weight: 2,
    value: 9,
  },
  {
    name: 'item5',
    weight: 5,
    value: 20,
  },
];

const solveKnapsack = (items, capacity) => {
  const value = (t) => {
    return t.reduce((acc, e) => acc + e.value, 0);
  };

  const dp = (itemsAvail, capacityLeft, taken) => {
    if (capacityLeft === 0) return taken;

    if (!itemsAvail.length) return taken;

    let takeFirst;
    if (itemsAvail[0].weight <= capacityLeft) {
      takeFirst = dp(itemsAvail.slice(1), capacityLeft - itemsAvail[0].weight, [
        ...taken,
        itemsAvail[0],
      ]);
    } else {
      takeFirst = taken;
    }

    const skipFirst = dp(itemsAvail.slice(1), capacityLeft, taken);

    return value(takeFirst) > value(skipFirst) ? takeFirst : skipFirst;
  };

  return dp(items, capacity, []);
};

console.log(solveKnapsack(items, 12));
