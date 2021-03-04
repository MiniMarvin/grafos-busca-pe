// setup the graph from the question
const edges = [
	['TAQUARITINGA_DO_NORTE', 'CARUARU', 59],
	['FREI_MIGUELINHO', 'CARUARU', 64],
	['TORITAMA', 'CARUARU', 36],
	['SAO_CAETANO', 'CARUARU', 23],
	['BREJO_DA_MADRE_DE_DEUS', 'CARUARU', 67],
	['VERTENTES', 'CARUARU', 50],
	['ALTINHO', 'CARUARU', 34],
	['CARUARU', 'AGRESTINA', 22],
	['CARUARU', 'BEZERROS', 33],
	['CARUARU', 'RIACHO_DAS_ALMAS', 23],
	['AGRESTINA', 'BEZERROS', 50],
	['RIACHO_DAS_ALMAS', 'BEZERROS', 33],
	['BEZERROS', 'SAIRE', 15],
	['BEZERROS', 'GRAVATA', 21],
	['BEZERROS', 'PASSIRA', 50],
	['PASSIRA', 'GRAVATA', 50],
	['PASSIRA', 'POMBOS', 65],
	['GRAVATA', 'POMBOS', 23],
	['POMBOS', 'VITORIA_DE_SANTO_ANTAO', 16],
	['VITORIA_DE_SANTO_ANTAO', 'MORENO', 23],
	['VITORIA_DE_SANTO_ANTAO', 'SAO_LOURENCO_DA_MATA', 51],
	['MORENO', 'SAO_LOURENCO_DA_MATA', 31],
	['MORENO', 'JABOATAO_DOS_GUARARAPES', 27],
	['SAO_LOURENCO_DA_MATA', 'JABOATAO_DOS_GUARARAPES', 32],
	['SAO_LOURENCO_DA_MATA', 'RECIFE', 24],
	['JABOATAO_DOS_GUARARAPES', 'RECIFE', 19],
	['RECIFE', 'OLINDA', 6],
]

const costs = {
	'TAQUARITINGA_DO_NORTE': 41,
	'FREI_MIGUELINHO': 37,
	'TORITAMA': 31,
	'SAO_CAETANO': 20,
	'BREJO_DA_MADRE_DE_DEUS': 45,
	'VERTENTES': 41,
	'CARUARU': 0,
	'ALTINHO': 25,
	'RIACHO_DAS_ALMAS': 19,
	'AGRESTINA': 20,
	'BEZERROS': 27,
	'SAIRE': 30,
	'PASSIRA': 55,
	'GRAVATA': 46,
	'POMBOS': 66,
	'VITORIA_DE_SANTO_ANTAO': 78,
	'MORENO': 98,
	'SAO_LOURENCO_DA_MATA': 110,
	'JABOATAO_DOS_GUARARAPES': 114,
	'RECIFE': 124,
	'OLINDA': 128,
}

/**
 * Constrói uma lista de adjacência com base em arestas do tipo [string, string, int].
 * 
 * @param {any[]} edges Arestas do grafo com os pesos.
 */
const buildGraphFromEdges = (edges) => {
  const graph = {}
  
  edges.forEach((edge) => {
    if (graph[edge[0]]) {
      graph[edge[0]].push([edge[1], edge[2]])
    } else {
      graph[edge[0]] = [[edge[1], edge[2]]]
    }

    if (graph[edge[1]]) {
      graph[edge[1]].push([edge[0], edge[2]])
    } else {
      graph[edge[1]] = [[edge[0], edge[2]]]
    }
  })

  return graph
}

/**
 * Realiza uma busca em largura sobre um grafo.
 * 
 * @param {string} begin O nó de inicio da busca.
 * @param {string} end O nó de fim da busca.
 * @param {{string: any[]}} graph O grafo representado como lista de adjacência em que se deve buscar.
 */
const bfs = (begin, end, graph) => {
  const visited = {}
  const frontier = [begin]
  const history = {
    frontiers: [],
    visited: [],
    nodeHistory: []
  }

  while (frontier.length > 0) {
    history.frontiers.push(JSON.parse(JSON.stringify(frontier)))
    history.visited.push(JSON.parse(JSON.stringify(visited)))

    const node = frontier.shift()
    visited[node] = 2

    history.nodeHistory.push(node)
    
    if (node === end) {
      break
    }

    graph[node].filter((edge) => !visited[edge[0]]).forEach((edge) => {
      visited[edge[0]] = 1
      frontier.push(edge[0])
    })
  }

  return history
}

/**
 * Realiza uma busca em profundidade sobre um grafo.
 * 
 * @param {string} begin O nó de inicio da busca.
 * @param {string} end O nó de fim da busca.
 * @param {{string: any[]}} graph O grafo representado como lista de adjacência em que se deve buscar.
 */
const dfs = (begin, end, graph) => {
  
}

/**
 * Realiza uma busca de custo uniforme (djikstra) sobre um grafo.
 * 
 * @param {string} begin O nó de inicio da busca.
 * @param {string} end O nó de fim da busca.
 * @param {{string: any[]}} graph O grafo representado como lista de adjacência em que se deve buscar.
 */
const ucs = (begin, end, graph) => {
  
}

/**
 * Realiza uma busca em A* sobre um grafo.
 * 
 * @param {string} begin O nó de inicio da busca.
 * @param {string} end O nó de fim da busca.
 * @param {{string: any[]}} graph O grafo representado como lista de adjacência em que se deve buscar.
 * @param {{string: number}} costs A lista de custo heurístico de cada nó.
 */
const aStar = (begin, end, graph, costs) => {

}


const testSearch = () => {
  const graph = buildGraphFromEdges(edges)
  // console.log(graph)
  
  const bfsHistory = bfs('RIACHO_DAS_ALMAS', 'VITORIA_DE_SANTO_ANTAO', graph)
  console.log(bfsHistory)
}

testSearch()