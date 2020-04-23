import { assertEquals, assert } from "https://deno.land/std/testing/asserts.ts";
import { Graph, UndirectedGraph } from "./data_setgraph.ts";

Deno.test('[data_setgraph] add data to node', function() {
  let g = new Graph<string, number>();
  g.setNodeData("A", 5);
  assert(g.hasNode("A"));
  assertEquals(5, g.getNodeData("A"));
});

Deno.test('[data_setgraph] add data to edge', function() {
  let g = new Graph<string, number>();
  g.setEdgeData("A", "B", 5);
  assert(g.hasNode("A"));
  assert(g.hasNode("B"));
  assertEquals(5, g.getEdgeData("A", "B"));
});

Deno.test('[data_setgraph] add data to undirected edge', function() {
  let g = new UndirectedGraph<string, number>();
  g.setEdgeData("A", "B", 5);
  assert(g.hasNode("A"));
  assert(g.hasNode("B"));
  assertEquals(5, g.getEdgeData("A", "B"));
  assertEquals(5, g.getEdgeData("B", "A"));
});
