export class Graph<Label = string> {
  constructor() {
    this._nodeLabels = new Set();
    this._predecessors = new Map();
    this._successors = new Map();
  }

  protected _nodeLabels: Set<Label>;
  protected _predecessors: Map<Label, Set<Label>>;
  protected _successors: Map<Label, Set<Label>>;

  setNode(label: Label) {
    this._nodeLabels.add(label);
    if (!this._predecessors.has(label)) {
      this._predecessors.set(label, new Set());
    }
    if (!this._successors.has(label)) {
      this._successors.set(label, new Set());
    }
  }

  setEdge(pred: Label, succ: Label) {
    this.setNode(pred);
    this.setNode(succ);

    this._successors.get(pred)!.add(succ);
    this._predecessors.get(succ)!.add(pred);
  }

  getNodes(): Set<Label> {
    return this._nodeLabels;
  }

  hasNode(label: Label): boolean {
    return this._nodeLabels.has(label);
  }

  hasEdge(pred: Label, succ: Label): boolean {
    return false;
  }

  getPredecessors(node: Label): Set<Label> {
    let preds = this._predecessors.get(node);
    if (!preds) {
      throw new Error("no such node");
    }
    return preds;
  }

  getSuccessors(node: Label): Set<Label> {
    let succs = this._successors.get(node);
    if (!succs) {
      throw new Error("no such node");
    }
    return succs;
  }
}

export class UndirectedGraph<Label> extends Graph<Label> {
  setEdge(pred: Label, succ: Label) {
    super.setEdge(pred, succ);
    super.setEdge(succ, pred);
  }
}
