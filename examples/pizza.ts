import { Graph } from "../graphs/setgraph.ts";
import { toposort } from "../algs/toposort.ts";

// set up a graph of dependent tasks:
const g = new Graph();
// eating pizza depends on the pizza first arriving, etc.:
g.setEdge("pizza arrives", "eat pizza");
g.setEdge("order pizza", "pizza arrives");
g.setEdge("choose pizza place", "order pizza");
g.setEdge("find phone", "order pizza");

for (let step of toposort(g)) {
  console.log(step);
}
