# Depth First Search (DFS) — Complete Guide

> Source: [https://www.geeksforgeeks.org/dsa/depth-first-search-or-dfs-for-a-graph/](https://www.geeksforgeeks.org/dsa/depth-first-search-or-dfs-for-a-graph/)

---

## What is Depth First Search (DFS)?

Depth First Search (DFS) is a graph traversal algorithm used to explore nodes and edges of a graph.

DFS starts from a source vertex and explores as far as possible along each branch before backtracking.

---

## How DFS Works

The algorithm follows these main steps:

1. Start from a chosen source vertex.
2. Mark the current vertex as visited.
3. Visit one of its unvisited adjacent vertices.
4. Repeat the process recursively.
5. When no unvisited adjacent vertex exists, backtrack.
6. Continue until all reachable vertices are visited.

DFS usually uses a visited array or set to avoid revisiting vertices.

---

## Example

Given adjacency list:

```
adj = [
  [1,2],
  [0,2],
  [0,1,3,4],
  [2],
  [2]
]
```

DFS starting at vertex `0`:

```
0 → 1 → 2 → 3 → 4
```

---

## DFS Algorithm (Recursive Approach)

### Pseudocode

```
DFS(node):
    mark node as visited
    process node

    for each neighbor of node:
        if neighbor not visited:
            DFS(neighbor)
```

---

## DFS on Disconnected Graphs

Some graphs contain multiple disconnected components.

To traverse all nodes:

1. Loop through every vertex.
2. Run DFS on any unvisited vertex.

---

## Time Complexity

```
O(V + E)
```

Where:

* V = Number of vertices
* E = Number of edges

DFS visits each vertex and edge at most once.

---

## Space Complexity

```
O(V)
```

Used for:

* Visited storage

---

## DFS Characteristics

### Advantages

* Memory efficient compared to BFS
* Useful for path finding
* Helps detect cycles
* Used in topological sorting
* Useful for connected component detection

---

### Disadvantages

* May go very deep into one branch
* Recursive DFS can cause stack overflow in large graphs

---

## DFS vs BFS

| Feature        | DFS                          | BFS                                |
| -------------- | ---------------------------- | ---------------------------------- |
| Strategy       | Go deep first                | Explore level by level             |
| Data Structure | Stack / Recursion            | Queue                              |
| Best Use       | Path search, cycle detection | Shortest path in unweighted graphs |

---

## Common Applications of DFS

* Cycle detection
* Topological sorting
* Path finding
* Maze solving
* Network connectivity analysis
