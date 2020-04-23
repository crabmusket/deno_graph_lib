# graph_lib

Simple typed graphs that are easy to use in Deno, inspired by [graphlib](https://github.com/dagrejs/graphlib).

## Usage

```typescript
import { Graph } from "https://raw.githubusercontent.com/crabmusket/deno_graph_lib/graphs/setgraph.ts";
import { toposort } from "https://raw.githubusercontent.com/crabmusket/deno_graph_lib/algs/toposort.ts";

// set up a graph of dependent tasks:
const g = new Graph<string>();
// eating pizza depends on first having the pizza, etc.:
g.setEdge("have pizza", "eat pizza");
g.setEdge("order pizza", "have pizza");
g.setEdge("choose pizza place", "order pizza");
g.setEdge("find phone", "order pizza");

for (let step of toposort(g)) {
  console.log(step);
}
```

```
choose pizza place
find phone
order pizza
have pizza
eat pizza
```
