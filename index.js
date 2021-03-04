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

const graph = buildGraphFromEdges(edges)
console.log(JSON.stringify(graph))