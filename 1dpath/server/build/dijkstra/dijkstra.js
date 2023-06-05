"use strict";
// interface Graph {
//     [key: string]: { [key: string]: number };
//   }
//   function dijkstra(graph: Graph, start: string, end: string): number[] {
//     const distances: { [key: string]: number } = {};
//     const visited: { [key: string]: boolean } = {};
//     const previous: { [key: string]: string | null } = {};
//     const queue: string[] = [];
//     for (let vertex in graph) {
//       if (vertex === start) {
//         distances[vertex] = 0;
//       } else {
//         distances[vertex] = Infinity;
//       }
//       previous[vertex] = null;
//       queue.push(vertex);
//     }
//     while (queue.length > 0) {
//       queue.sort((a, b) => distances[a] - distances[b]);
//       const current = queue.shift();
//       if (current === end) {
//         break;
//       }
//       if (!current || distances[current] === Infinity) {
//         continue;
//       }
//       visited[current] = true;
//       for (let neighbor in graph[current]) {
//         const weight = graph[current][neighbor];
//         const totalWeight = distances[current] + weight;
//         if (totalWeight < distances[neighbor]) {
//           distances[neighbor] = totalWeight;
//           previous[neighbor] = current;
//         }
//       }
//     }
//     const path: string[] = [];
//     let current = end;
//     while (current) {
//       path.unshift(current);
//       current = previous[current];
//     }
//     return path.map((vertex) => distances[vertex]);
//   }
//   // Ejemplo de uso
//   const graph: Graph = {
//     A: { B: 3, C: 2 },
//     B: { A: 3, C: 1, D: 5 },
//     C: { A: 2, B: 1, D: 2 },
//     D: { B: 5, C: 2 },
//   };
//   const startVertex = 'A';
//   const endVertex = 'D';
//   const shortestPath = dijkstra(graph, startVertex, endVertex);
//   console.log(`El camino más corto desde ${startVertex} hasta ${endVertex} es:`);
//   console.log(shortestPath);
