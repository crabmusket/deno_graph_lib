import { assertEquals, assert, fail } from "https://deno.land/std/testing/asserts.ts";
import { toposort, CycleError, IncompleteError } from "./toposort.ts";

// Use Graph to test the sort interface for convenience.
import { Graph } from "../graphs/setgraph.ts";

Deno.test('[toposort] simple graph', function() {
  let g = new Graph();
  g.setEdge("A", "B"); // "A comes before B" or "B depends on A"
  let sortedNodes = toposort(g);
  assertEquals(["A", "B"], sortedNodes);
});

Deno.test('[toposort] y-shaped graph', function() {
  let g = new Graph();
  g.setEdge("A", "B");
  g.setEdge("A", "C");
  let sortedNodes = toposort(g);
  assertEquals("A", sortedNodes[0]);
  // order of B and C is indeterminate, depends on graph implementation, so we
  // won't test them as long as A comes first
});

Deno.test('[toposort] linear graph', function() {
  let g = new Graph();
  g.setEdge("A", "B");
  g.setEdge("B", "C");
  g.setEdge("C", "D");
  g.setEdge("D", "E");
  let sortedNodes = toposort(g);
  assertEquals(["A", "B", "C", "D", "E"], sortedNodes);
});

Deno.test('[toposort] reverse-linear graph', function() {
  let g = new Graph();
  g.setEdge("B", "A");
  g.setEdge("C", "B");
  g.setEdge("D", "C");
  g.setEdge("E", "D");
  let sortedNodes = toposort(g);
  assertEquals(["E", "D", "C", "B", "A"], sortedNodes);
});

Deno.test('[toposort] cycle error', function() {
  let g = new Graph();
  g.setEdge("A", "B");
  g.setEdge("B", "C");
  g.setEdge("B", "A"); // this is the cycle!
  try {
    toposort(g);
    fail("expected CycleError to be thrown");
  } catch (e) {
    if (e instanceof CycleError) {
      assertEquals(["C", "B", "A", "B"], e.path);
    } else {
      fail("expected CycleError to be thrown, got " +
        e.constructor.name +
        " " + e.message);
    }
  }
});

Deno.test('[toposort] no starting node', function() {
  let g = new Graph();
  g.setEdge("A", "B");
  g.setEdge("B", "C");
  g.setEdge("C", "A"); // this is a cycle!
  // there is no node without a successor, so the algorithm will not visit
  // any nodes
  try {
    toposort(g);
    fail("expected Error to be thrown");
  } catch (e) {
    // pass :)
  }
});

Deno.test('[toposort] incomplete traversal', function() {
  // This should never happen??? how to create a test case for something which
  // can't happen???
});

Deno.test('[toposort] two islands', function() {
  let g = new Graph();
  g.setEdge("A", "B");
  g.setEdge("C", "D");
  let sortedNodes = toposort(g);
  let ia = sortedNodes.indexOf("A");
  let ib = sortedNodes.indexOf("B");
  let ic = sortedNodes.indexOf("C");
  let id = sortedNodes.indexOf("D");
  // the precise order of the two islands is not guaranteed, but these are the
  // relative orderings of the elements within each island
  assert(ia < ib);
  assert(ic < id);
});

Deno.test('[toposort] handmade graph implementation', function() {
  let g = {
    getNodes() {
      return ["A", "B", "C"];
    },
    getSuccessors(id: string) {
      return [];
    },
    getPredecessors(id: string) {
      return [];
    },
  };

  let sortedNodes = toposort(g);
  assertEquals(["A", "B", "C"], sortedNodes);
});
