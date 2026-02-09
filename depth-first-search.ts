// Depth First Search or DFS for a Graph

// Global node registry (simulating graph storage)
const nodes: TreeNode[] = [];

class TreeNode {
  public value: string;
  public idx: number;
  public parents: Set<number>;
  public children: Set<number>;

  constructor(value: string) {
    this.value = value;
    this.idx = nodes.length; // Unique index based on insertion order
    this.parents = new Set();
    this.children = new Set();

    nodes.push(this);
  }

  /**
   * Connects this node to a child node
   */
  public addChild(child: TreeNode) {
    this.children.add(child.idx);
    child.parents.add(this.idx);
  }

  /**
   * Removes this node and recursively removes orphan children
   */
  public delete(): void {
    // Remove reference from children
    for (const childIdx of this.children) {
      const child = nodes[childIdx];

      if (!child) continue;

      child.parents.delete(this.idx);

      // If child has no parents left, delete it recursively
      if (child.parents.size === 0) {
        child.delete();
      }
    }

    // Remove reference from parents
    for (const parentIdx of this.parents) {
      const parent = nodes[parentIdx];

      if (!parent) continue;

      parent.children.delete(this.idx);
    }

    // Mark node as removed instead of splicing (keeps indexes stable)
    nodes[this.idx] = undefined as unknown as TreeNode;
  }

  /**
   * Depth First Search traversal starting from this node
   */
public dfs(visited: Set<number> = new Set()): void {
  visited.add(this.idx);
  console.log(`Visitando: ${this.value}`);

  for (const childIdx of this.children) {
    const child = nodes[childIdx];
    if (child && !visited.has(childIdx)) {
      child.dfs(visited);
    }
  }
}
}

// -------- Creating graph --------

// Root level
const root = new TreeNode("negócio");

// Units
const u1 = new TreeNode("unidade 1");
const u2 = new TreeNode("unidade 2");

// Department
const dp1 = new TreeNode("depart 1");

// Employees
const fn1 = new TreeNode("func 1");
const fn2 = new TreeNode("func 2");
const fn3 = new TreeNode("func 3");

// -------- Building relationships --------

// Root -> Units
root.addChild(u1);
root.addChild(u2);

// Units -> Department (shared child = DAG structure)
u1.addChild(dp1);
u2.addChild(dp1);

// Department -> Employees
dp1.addChild(fn1);
dp1.addChild(fn2);
dp1.addChild(fn3);

// -------- Running DFS --------
root.dfs();
