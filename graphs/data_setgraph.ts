import { Graph as SetGraph } from "./setgraph.ts";

export class Graph<Label = string, NodeData = unknown, EdgeData = unknown>
  extends SetGraph<Label> {
  constructor() {
    super();
    this._nodeData = new Map();
    this._edgeData = new Map();
  }

  protected _nodeData: Map<Label, NodeData>;
  protected _edgeData: Map<string, EdgeData>;

  setNodeData(label: Label, data: NodeData) {
    this.setNode(label);
    this._nodeData.set(label, data);
  }

  getNodeData(label: Label): NodeData | null {
    let data = this._nodeData.get(label);
    return data === undefined ? null : data;
  }

  setEdgeData(pred: Label, succ: Label, data: EdgeData) {
    this.setEdge(pred, succ);
    let id = getEdgeDataId(pred, succ);
    this._edgeData.set(id, data);
  }

  getEdgeData(pred: Label, succ: Label): EdgeData | null {
    let id = getEdgeDataId(pred, succ);
    let data = this._edgeData.get(id);
    return data === undefined ? null : data;
  }
}

function getEdgeDataId<Label>(
  from: Label,
  to: Label,
): string {
  return from + "->" + to;
}

export class UndirectedGraph<
  Label = string,
  NodeData = unknown,
  EdgeData = unknown,
> extends Graph<Label, NodeData, EdgeData> {
  setEdgeData(pred: Label, succ: Label, data: EdgeData) {
    super.setEdgeData(pred, succ, data);
    super.setEdgeData(succ, pred, data);
  }
}
