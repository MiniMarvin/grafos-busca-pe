// setup the graph from the question
const nodes = [
  ["TAQUARITINGA_DO_NORTE", 70, 12],
  ["CARUARU", 77, 40],
  ["RECIFE", 105, 32],
  ["FREI_MIGUELINHO", 78, 25],
  ["TORITAMA", 72, 23],
  ["SAO_CAETANO", 70, 42],
  ["BREJO_DA_MADRE_DE_DEUS", 65, 35],
  ["VERTENTES", 78, 12],
  ["ALTINHO", 73, 50],
  ["AGRESTINA", 77, 50],
  ["BEZERROS", 82, 38],
  ["SAIRE", 85.5, 42],
  ["GRAVATA", 86, 36],
  ["PASSIRA", 86, 25],
  ["POMBOS", 90, 35],
  ["VITORIA", 94, 32],
  ["MORENO", 99, 33],
  ["SAO_LOURENCO", 99, 25],
  ["JABOATAO_DOS_GUARARAPES", 104, 40],
  ["OLINDA", 104.5, 25],
];
const edges = [
  ["TAQUARITINGA_DO_NORTE", "CARUARU", 59],
  ["FREI_MIGUELINHO", "CARUARU", 64],
  ["TORITAMA", "CARUARU", 36],
  ["SAO_CAETANO", "CARUARU", 23],
  ["BREJO_DA_MADRE_DE_DEUS", "CARUARU", 67],
  ["VERTENTES", "CARUARU", 50],
  ["ALTINHO", "CARUARU", 34],
  ["CARUARU", "AGRESTINA", 22],
  ["CARUARU", "BEZERROS", 33],
  ["AGRESTINA", "BEZERROS", 50],
  ["BEZERROS", "SAIRE", 15],
  ["BEZERROS", "GRAVATA", 21],
  ["BEZERROS", "PASSIRA", 50],
  ["PASSIRA", "GRAVATA", 50],
  ["PASSIRA", "POMBOS", 65],
  ["GRAVATA", "POMBOS", 23],
  ["POMBOS", "VITORIA", 16],
  ["VITORIA", "MORENO", 23],
  ["VITORIA", "SAO_LOURENCO", 51],
  ["MORENO", "SAO_LOURENCO", 31],
  ["MORENO", "JABOATAO_DOS_GUARARAPES", 27],
  ["SAO_LOURENCO", "JABOATAO_DOS_GUARARAPES", 32],
  ["SAO_LOURENCO", "RECIFE", 24],
  ["JABOATAO_DOS_GUARARAPES", "RECIFE", 19],
  ["RECIFE", "OLINDA", 6],
  ["MORENO", "RECIFE", 16],
];

const costs = {
  TAQUARITINGA_DO_NORTE: 41,
  FREI_MIGUELINHO: 37,
  TORITAMA: 31,
  SAO_CAETANO: 20,
  BREJO_DA_MADRE_DE_DEUS: 45,
  VERTENTES: 41,
  CARUARU: 0,
  ALTINHO: 25,
  RIACHO_DAS_ALMAS: 19,
  AGRESTINA: 20,
  BEZERROS: 27,
  SAIRE: 30,
  PASSIRA: 55,
  GRAVATA: 46,
  POMBOS: 66,
  VITORIA_DE_SANTO_ANTAO: 78,
  MORENO: 98,
  SAO_LOURENCO_DA_MATA: 110,
  JABOATAO_DOS_GUARARAPES: 114,
  RECIFE: 124,
  OLINDA: 128,
};

/**
 * Constrói uma lista de adjacência com base em arestas do tipo [string, string, int].
 *
 * @param {any[]} edges Arestas do grafo com os pesos.
 */
const buildGraphFromEdges = (edges) => {
  const graph = {};

  edges.forEach((edge) => {
    if (graph[edge[0]]) {
      graph[edge[0]].push([edge[1], edge[2]]);
    } else {
      graph[edge[0]] = [[edge[1], edge[2]]];
    }

    if (graph[edge[1]]) {
      graph[edge[1]].push([edge[0], edge[2]]);
    } else {
      graph[edge[1]] = [[edge[0], edge[2]]];
    }
  });

  return graph;
};

/**
 * Realiza uma busca em largura sobre um grafo.
 *
 * @param {string} begin O nó de inicio da busca.
 * @param {string} end O nó de fim da busca.
 * @param {{string: any[]}} graph O grafo representado como lista de adjacência em que se deve buscar.
 */
const bfs = (begin, end, graph) => {
  const visited = {};
  const frontier = [[begin, [begin]]];
  const history = {
    frontiers: [],
    visited: [],
    nodeHistory: [],
    finalPath: [],
  };

  while (frontier.length > 0) {
    history.frontiers.push(
      JSON.parse(JSON.stringify(frontier.map((pair) => pair[0])))
    );
    history.visited.push(JSON.parse(JSON.stringify(visited)));

    const pair = frontier.shift();
    const node = pair[0];
    visited[node] = 2;

    history.nodeHistory.push(node);

    if (node === end) {
      history.finalPath = pair[1];
      break;
    }

    graph[node]
      .filter((edge) => !visited[edge[0]])
      .forEach((edge) => {
        visited[edge[0]] = 1;
        frontier.push([edge[0], [...pair[1], edge[0]]]);
      });
  }

  return history;
};

/**
 * Realiza uma busca em profundidade sobre um grafo.
 *
 * @param {string} begin O nó de inicio da busca.
 * @param {string} end O nó de fim da busca.
 * @param {{string: any[]}} graph O grafo representado como lista de adjacência em que se deve buscar.
 */
const dfs = (begin, end, graph) => {
  const visited = {};
  const frontier = [[begin, [begin]]];
  const history = {
    frontiers: [],
    visited: [],
    nodeHistory: [],
    finalPath: [],
  };

  while (frontier.length > 0) {
    history.frontiers.push(
      JSON.parse(JSON.stringify(frontier.map((pair) => pair[0])))
    );
    history.visited.push(JSON.parse(JSON.stringify(visited)));

    const pair = frontier.pop();
    const node = pair[0];
    visited[node] = 2;

    history.nodeHistory.push(node);

    if (node === end) {
      history.finalPath = pair[1];
      break;
    }

    graph[node]
      .filter((edge) => !visited[edge[0]])
      .forEach((edge) => {
        visited[edge[0]] = 1;
        frontier.push([edge[0], [...pair[1], edge[0]]]);
      });
  }

  return history;
};

/**
 * Realiza uma busca de custo uniforme (djikstra) sobre um grafo.
 *
 * @param {string} begin O nó de inicio da busca.
 * @param {string} end O nó de fim da busca.
 * @param {{string: any[]}} graph O grafo representado como lista de adjacência em que se deve buscar.
 */
const ucs = (begin, end, graph) => {
  const visited = {};
  const frontier = new PriorityQueue(
    (node1, node2) => node1[0][1] < node2[0][1]
  );
  frontier.insert([[begin, 0], [[begin, 0]]]);
  const history = {
    frontiers: [],
    visited: [],
    nodeHistory: [],
    finalPath: [],
  };

  visited[begin] = 0;

  while (!frontier.empty()) {
    history.frontiers.push(
      JSON.parse(JSON.stringify(frontier.heap.slice(1).map((pair) => pair[0])))
    );
    history.visited.push(JSON.parse(JSON.stringify(visited)));

    const pair = frontier.remove();
    const node = pair[0];
    history.nodeHistory.push(node);

    if (node[0] === end) {
      history.finalPath = pair[1];
      break;
    }

    graph[node[0]].forEach((edge) => {
      const newWeight = node[1] + edge[1];

      if (
        visited[edge[0]] === null ||
        visited[edge[0]] === undefined ||
        (visited[edge[0]] && newWeight < visited[edge[0]])
      ) {
        // dequeu and enqueue the entire frontier, the ideal would be to implement a replace method in the heap,
        // but it takes more work than just dequeue and enqueue
        const stack = [];
        while (!frontier.empty()) {
          const pair = frontier.remove();
          const node = pair[0];
          if (node[0] !== edge[0]) {
            stack.push(pair);
          }
        }

        while (stack.length > 0) {
          const node = stack.pop();
          frontier.insert(node);
        }

        frontier.insert([
          [edge[0], newWeight],
          [...pair[1], [edge[0], newWeight]],
        ]);
        visited[edge[0]] = newWeight;
      }
    });
  }

  return history;
};

/**
 * Realiza uma busca em A* sobre um grafo.
 *
 * @param {string} begin O nó de inicio da busca.
 * @param {string} end O nó de fim da busca.
 * @param {{string: any[]}} graph O grafo representado como lista de adjacência em que se deve buscar.
 * @param {{string: number}} costs A lista de custo heurístico de cada nó.
 */
const aStar = (begin, end, graph, costs) => {};

/**
 * Converte para uma forma normal de escrita.
 * @param {string} name
 */
const commonName = (name) => {
  return name
    .split("_")
    .map((part) => {
      if (part.length > 2) {
        return part.charAt(0).toUpperCase() + part.slice(1).toLocaleLowerCase();
      }
      return part.toLocaleLowerCase();
    })
    .join(" ");
};

const testSearch = () => {
  const graph = buildGraphFromEdges(edges);
  console.log(graph);

  const nomes = Object.keys(graph).map((name) => commonName(name));
  console.log(nomes);

  const bfsHistory = bfs("RIACHO_DAS_ALMAS", "VITORIA_DE_SANTO_ANTAO", graph);
  console.log(bfsHistory);

  const dfsHistory = dfs("RIACHO_DAS_ALMAS", "VITORIA_DE_SANTO_ANTAO", graph);
  console.log(dfsHistory);

  const pq = new PriorityQueue((node1, node2) => node1[0] < node2[0]);
  pq.insert([3, "muamba"]);
  pq.insert([1, "aaa"]);
  pq.insert([4, "bbbb"]);
  pq.insert([7, "cccc"]);

  while (!pq.empty()) {
    const node = pq.remove();
    console.log(node);
  }

  const ucsHistory = ucs("RIACHO_DAS_ALMAS", "VITORIA_DE_SANTO_ANTAO", graph);
  console.log(ucsHistory);
};

testSearch();
