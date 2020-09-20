const adjacencyMatrix = {
  s: { a: 6, b: 15, c: 6, f: 14 },

  a: { d: 10, e: 9, f: 7, b: 4 },
  b: { d: 4, e: 1, f: 17, c: 1 },
  c: { d: 7, e: 19, f: 21, a: 4, b: 2 },

  d: { g: 4, h: 19, i: 7 },
  e: { g: 14, h: 11, i: 4 },
  f: { g: 6, h: 1, i: 2 },

  g: { t: 2 },
  h: { t: 5 },
  i: { t: 11 },
};

const shortestPath = (start, end) => {
  const distanceTo = (s, n) => {
    if (s === n) return 0;
    return adjacencyMatrix[s][n];
  };

  const unvisitedNeighbors = (v, history) =>
    Object.keys(adjacencyMatrix[v]).filter((n) => history.indexOf(n) === -1);

  const dp = (start, end, result = { path: '', distance: 0 }) => {
    if (!result.path) result.path = start;

    if (start === end) return result;

    return unvisitedNeighbors(start, result.path)
      .map((o) => {
        const newPath = result.path + '-' + o;
        const newDistance = result.distance + distanceTo(start, o);
        return dp(o, end, { path: newPath, distance: newDistance });
      })
      .reduce((acc, o) => {
        if (!acc) return o;
        if (acc.distance < o.distance) return acc;
        return o;
      }, null);
  };

  return dp(start, end);
};

console.log(shortestPath('s', 't'));
