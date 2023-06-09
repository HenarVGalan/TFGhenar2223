"use strict";
function dijkstra(graph, start, end) {
    const distances = {};
    const visited = {};
    const previous = {};
    const queue = [];
    for (let vertex in graph) {
        if (vertex === start) {
            distances[vertex] = 0;
        }
        else {
            distances[vertex] = Infinity;
        }
        previous[vertex] = null;
        queue.push(vertex);
    }
    while (queue.length > 0) {
        queue.sort((a, b) => distances[a] - distances[b]);
        const current = queue.shift();
        if (current === end) {
            break;
        }
        if (!current || distances[current] === Infinity) {
            continue;
        }
        visited[current] = true;
        for (let neighbor in graph[current]) {
            const weight = graph[current][neighbor];
            const totalWeight = distances[current] + weight;
            if (totalWeight < distances[neighbor]) {
                distances[neighbor] = totalWeight;
                previous[neighbor] = current;
            }
        }
    }
    const path = [];
    let current = end;
    while (current !== null) {
        path.unshift(current);
        current = previous[current];
    }
    console.log(path);
    return path.map((vertex) => distances[vertex]);
}
// Ejemplo de uso
const graph = {
    'A': { 'B': 3, 'C': 2 },
    'B': { 'A': 3, 'C': 1, 'D': 5 },
    'C': { 'A': 2, 'B': 1, 'D': 2 },
    'D': { 'B': 5, 'C': 2 },
};
const ce_ab_murB = {
    '50067': { '50678': 10 },
    '50678': { '50067': 10, '50256': 0 },
    '50294': { '50652': 5 },
    '50652': { '50294': 5, '50652': 0 },
    '50256': { '50590': 2 },
    '50590': { '50256': 2, '291A2': 0 },
    '291A2': { '291B1': 0 },
    '291B1': { '291B2': 8 },
    '291B2': { '291C1': 0, '50358': 0 },
    '291C1': { '291C2': 5 },
    '291C2': { '291D1': 0, '50147': 0 },
    '291D1': { '50625': 3 },
    '50358': { '50561': 1 },
    '50561': { '50546': 0 },
    '50220': { '50840': 10 },
    '50840': { '50147': 0 },
    '50147': { '50769': 2 },
    '50546': { '50568': 6 },
    '50568': { '50244': 0 },
    '50244': { '290A2': 2 },
    '290A2': { '50447': 0, '290B1': 0 },
    '50447': { '50758': 4 },
    '50758': { '50758': 0 },
    '290B1': { '290B2': 1 },
    '290B2': { '290C1': 0, '250A1': 0 },
    '290C1': { '290C2': 1 },
    '290C2': { '290D1': 0, '50201': 0 },
    '290D1': { '50201': 0, '50642': 1 },
    '50171': { '250A2': 1 },
    '50642': { '250A2': 0 },
    '250A2': { '250B1': 0 },
    '280B1': { '50792': 5 },
    '50201': { '50820': 10 },
    '50820': { '50197': 0, '50421': 0 },
    '50421': { '50740': 12.5 },
    '50197': { '50816': 25.5 },
    '50816': { '50415': 0, '50356': 0 },
    '50356': { '174A2': 7 },
    '174A2': { '174B1': 0, '50072': 0 },
    '50072': { '174B2': 1, '50682': 5.5 },
    '50415': { '185A2': 2 },
    '185A2': { '185B1': 0 },
    '185B1': { '185B2': 8 },
    '185B2': { '185C1': 0 },
    '185C1': { '50619': 5.5 },
    '174B2': { '185C1': 0 },
    '50252': { '50582 ': 12.5, '1770B2 ': 0 },
    '50360': { '177A2': 2 },
    '177A2': { '1770B1': 0, '50118': 0 },
    '50118': { '50733': 10 },
    '1770B2': { '1770C1': 0, '50252': 0 },
    '1770C1': { '50704': 5 },
    '50704': { '50146': 0 },
    '50146': { '50768': 12 },
    '50125': { '50748': 30, '50684': 0, '50606': 0 },
    '50768': { '50748': 0 },
    '49956': { '50684': 11.5 },
    '50684': { '50125': 0, '50606': 0 },
    '49984': { '50606': 6 },
    '50606': { '50125': 0, '50684': 0 },
    '50625': { '49956': 0 },
};
const startVertex = '50067';
const endVertex = '50758';
const shortestPath = dijkstra(ce_ab_murB, startVertex, endVertex);
console.log(`El camino más corto desde ${startVertex} hasta ${endVertex} es:`);
console.log(shortestPath);
