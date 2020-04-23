import { Graph } from "../graphs/setgraph.ts";
import { toposort } from "../algs/toposort.ts";

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
