// setup the graph from the question
const nodes = [
  ["TAQUARITINGA_DO_NORTE", 70, 12],
  ["CARUARU", 77, 40],
  ["RECIFE", 105, 32],
  ["FREI_MIGUELINHO", 78, 25],
  ["TORITAMA", 70, 23],
  ["SAO_CAETANO", 70, 42],
  ["BREJO_DA_MADRE_DE_DEUS", 65, 35],
  ["VERTENTES", 75, 16],
  ["ALTINHO", 73, 50],
  ["AGRESTINA", 77, 50],
  ["BEZERROS", 82, 38],
  ["SAIRE", 85.5, 42],
  ["GRAVATA", 86, 36],
  ["PASSIRA", 85, 26],
  ["POMBOS", 90, 35],
  ["VITORIA", 94, 32],
  ["PAUDALHO", 96, 16],
  ["GLORIA_DE_GOITA", 93, 24],
  ["MORENO", 99, 33],
  ["SAO_LOURENCO", 99, 25],
  ["JABOATAO_DOS_GUARARAPES", 104, 40],
  ["OLINDA", 104.5, 25],
  ["LIMOEIRO", 89, 18],
  ["SURUBIM", 81, 10],
];
const edges = [
  ["SURUBIM", "LIMOEIRO", 45],
  ["SURUBIM", "VERTENTES", 25],
  ["SAO_LOURENCO", "PAUDALHO", 24],
  ["FREI_MIGUELINHO", "CARUARU", 64],
  ["TORITAMA", "CARUARU", 36],
  ["SAO_CAETANO", "CARUARU", 23],
  ["BREJO_DA_MADRE_DE_DEUS", "CARUARU", 67],
  ["VERTENTES", "FREI_MIGUELINHO", 16],
  ["VERTENTES", "TAQUARITINGA_DO_NORTE", 10],
  ["GLORIA_DE_GOITA", "PAUDALHO", 26],
  ["GLORIA_DE_GOITA", "VITORIA", 25],
  ["GLORIA_DE_GOITA", "LIMOEIRO", 24],
  ["PASSIRA", "LIMOEIRO", 25],
  ["VERTENTES", "TORITAMA", 16],
  ["LIMOEIRO", "PAUDALHO", 36],
  ["ALTINHO", "CARUARU", 34],
  ["CARUARU", "AGRESTINA", 22],
  ["GRAVATA", "SAIRE", 20],
  ["CARUARU", "BEZERROS", 33],
  ["AGRESTINA", "BEZERROS", 50],
  ["BEZERROS", "SAIRE", 15],
  ["BEZERROS", "GRAVATA", 21],
∂  ["FREI_MIGUELINHO", "PASSIRA", 68],
  ["PASSIRA", "BEZERROS", 49],
  ["PASSIRA", "POMBOS", 65],
  ["GRAVATA", "POMBOS", 23],
  ["POMBOS", "VITORIA", 16],
  ["VITORIA", "MORENO", 23],
  ["VITORIA", "SAO_LOURENCO", 51],
  ["MORENO", "SAO_LOURENCO", 31],
  ["MORENO", "JABOATAO_DOS_GUARARAPES", 27],
  ["SAO_LOURENCO", "RECIFE", 24],
  ["JABOATAO_DOS_GUARARAPES", "RECIFE", 19],
  ["RECIFE", "OLINDA", 6],
  ["MORENO", "RECIFE", 16],
];

/**
 * Adiciona uma cidade na pilha.
 *
 * @param {string} city Arestas do grafo com os pesos.
 */
const addToStack = (city, stack) => {
  const tr = document.createElement("tr");
  const td = document.createElement("td");
  tr.id = `${stack}-${city}`;
  td.innerText = commonName(city);
  tr.appendChild(td);
  document.getElementById(stack).appendChild(tr);
};

const addToSteps = (city) => addToStack(city, "steps");

const addToFrontiers = (city) => addToStack(city, "frontiers");

/**
 * Remove uma cidade na pilha de paços.
 *
 * @param {string} city Arestas do grafo com os pesos.
 */
const removeFromStack = (city) => {
  // const tr = document.createElement("tr");
  // tr.appendChild(document.createElement("td"))
  // tr.id = city;
  const stack = document.getElementById("steps");
  const child = document.getElementById(`steps-${city}`);
  stack.removeChild(child);
};

/**
 * Limpa a pilha escolhida.
 *
 * @param {string} stack Nome da stack.
 * @param {string} title Titulo da pilha.
 */
const cleanStack = async (stack, title) => {
  const steps = document.getElementById(stack);
  const header = document.getElementById(`${stack}-header`);
  header.innerHTML = title;
  steps.innerHTML = "";
  steps.appendChild(header);
};

const cleanSteps = () => cleanStack("steps", "Nós visitados:");
const cleanFrontiers = () => cleanStack("frontiers", "Próximas visitas:");

/**
 * Mostra todo melhor caminho.
 *
 * @param {string[]} cities lista de cidades do melhor caminho.
 */
const showFinalPath = async (cities) => {
  await cleanSteps();
  const header = document.getElementById("steps-header");
  header.innerText = "Melhor caminho:";
  console.log(cities);
  for (city of cities) {
    addToSteps(city);
  }
};

/**
 * Mostra a lista de próximas fronteiras.
 *
 * @param {string[]} cities lista de cidades do melhor caminho.
 */
const showFrontiers = async (cities) => {
  await cleanFrontiers();
  const header = document.getElementById("frontiers-header");
  header.innerText = "Próximas visitas:";
  console.log("cities", cities);
  for (city of cities) {
    addToFrontiers(city);
  }
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

  history.nodeHistory = history.nodeHistory.map((a) => a[0]);
  history.finalPath = history.finalPath.map((a) => a[0]);

  return history;
};

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
