export interface Graph<T> {
  getPredecessors(node: T): Iterable<T>;
  getSuccessors(node: T): Iterable<T>;
  getNodes(): Iterable<T>;
}

/** This error is thrown when the algorithm encounters a cycle. */
export class CycleError<T> extends Error {
  path: T[] = [];
}

export class IncompleteError extends Error {
}

export function toposort<T>(g: Graph<T>): T[] {
  let visited = new Set<T>();
  let stack: T[] = [];
  let results: T[] = [];

  for (let node of g.getNodes()) {
    let succs = g.getSuccessors(node);
    if (iterableIsEmpty(succs)) {
      visit(node);
    }
  }

  if (visited.size === 0) {
    throw new Error("no place to start");
  }

  let totalNodes = Array.from(g.getNodes()).length;
  if (visited.size !== totalNodes) {
    // can this ever happen?
    throw new IncompleteError(
      `failed to visit all nodes: ${visited.size} of ${totalNodes}`,
    );
  }

  return results;

  function visit(node: T) {
    if (stack.includes(node)) {
      let err = new CycleError("cycle detected when visiting " + node);
      err.path = stack.slice();
      err.path.push(node);
      throw err;
    }

    if (visited.has(node)) {
      return;
    }

    visited.add(node);
    stack.push(node);
    let predecessors = g.getPredecessors(node);
    for (let pred of predecessors) {
      visit(pred);
    }
    stack.pop();
    results.push(node);
  }
}

function iterableIsEmpty<T>(iterable: Iterable<T>): boolean {
  let iterator = iterable[Symbol.iterator]();
  return !!iterator.next().done;
}
