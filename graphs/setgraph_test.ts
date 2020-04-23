import { assertEquals, assert } from "https://deno.land/std/testing/asserts.ts";
import { Graph, UndirectedGraph } from "./setgraph.ts";

Deno.test('[setgraph] create from edges', function() {
  let g = new Graph();
  g.setEdge("A", "B");
  g.setEdge("C", "D");
  g.setEdge("C", "E");
  for (let letter of ["A", "B", "C", "D", "E"]) {
    assert(g.hasNode(letter));
  }

  assertEquals([], Array.from(g.getPredecessors("A")));
  assertEquals(["B"], Array.from(g.getSuccessors("A")));

  assertEquals(["A"], Array.from(g.getPredecessors("B")));
  assertEquals([], Array.from(g.getSuccessors("B")));

  assertEquals([], Array.from(g.getPredecessors("C")));
  assertEquals(["D", "E"], Array.from(g.getSuccessors("C")));

  assertEquals(["C"], Array.from(g.getPredecessors("D")));
  assertEquals([], Array.from(g.getSuccessors("D")));

  assertEquals(["C"], Array.from(g.getPredecessors("E")));
  assertEquals([], Array.from(g.getSuccessors("E")));
});

Deno.test('[setgraph] create undirected from edges', function() {
  let g = new UndirectedGraph();
  g.setEdge("A", "B");
  g.setEdge("C", "D");
  g.setEdge("C", "E");
  for (let letter of ["A", "B", "C", "D", "E"]) {
    assert(g.hasNode(letter));
  }

  assertEquals(["B"], Array.from(g.getPredecessors("A")));
  assertEquals(["B"], Array.from(g.getSuccessors("A")));

  assertEquals(["A"], Array.from(g.getPredecessors("B")));
  assertEquals(["A"], Array.from(g.getSuccessors("B")));

  assertEquals(["D", "E"], Array.from(g.getPredecessors("C")));
  assertEquals(["D", "E"], Array.from(g.getSuccessors("C")));

  assertEquals(["C"], Array.from(g.getPredecessors("D")));
  assertEquals(["C"], Array.from(g.getSuccessors("D")));

  assertEquals(["C"], Array.from(g.getPredecessors("E")));
  assertEquals(["C"], Array.from(g.getSuccessors("E")));
});
