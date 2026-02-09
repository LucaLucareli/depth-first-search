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
    public dfs(
    visited: Set<number> = new Set(),
    depth = 0
  ): void {
    visited.add(this.idx);

    const indent = '  '.repeat(depth);
    console.log(`${indent}➡️ Visiting node [${this.idx}] = ${this.value}`);

    for (const childIdx of this.children) {
      const child = nodes[childIdx];

      if (!child) {
        console.log(`${indent}⚠️ Child ${childIdx} not found`);
        continue;
      }

      if (visited.has(childIdx)) {
        console.log(`${indent}🔁 Child ${childIdx} already visited`);
        continue;
      }

      console.log(`${indent}⬇️ Traversing to child ${childIdx}`);
      child.dfs(visited, depth + 1);
    }

    console.log(`${indent}⬅️ Returning from node ${this.idx}`);
  }
}

// -------- Creating graph --------

// Root level
const root = new TreeNode("Person");

// person
const p1 = new TreeNode("Person 1");
const p2 = new TreeNode("Person 2");
const p3 = new TreeNode("Person 3");
const p4 = new TreeNode("Person 4");
const p5 = new TreeNode("Person 5");
const p6 = new TreeNode("Person 6");

// -------- Building relationships --------

// Root -> p1,p2
root.addChild(p1);
root.addChild(p2);

// p1 -> p3, p2 -> p3
p1.addChild(p3);
p2.addChild(p3);

// p3 -> p4,p5,p6
p3.addChild(p4);
p3.addChild(p5);
p3.addChild(p6);

// -------- Running DFS --------
root.dfs();
