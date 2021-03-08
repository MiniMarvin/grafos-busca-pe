// Preencher as opções dos selectors
const cities_options = nodes.map((node) => {
  return node[0];
});
cities_options.sort();

for (opt of cities_options) {
  var option_from = document.createElement("option");
  option_from.text = opt;

  var option_to = document.createElement("option");
  option_to.text = opt;

  document.getElementById("from").add(option_from);
  document.getElementById("to").add(option_to);
}

algorithms_options = ["BFS", "DFS", "Djikstra (USC)"];
for (opt of algorithms_options) {
  var option_from = document.createElement("option");
  option_from.text = opt;
  document.getElementById("algorithm").add(option_from);
}

// Inicialização do espaço de desenhar
width = 1000;
height = 600;

var paper = Raphael("canvas", width, height);

// Preenchimento dos nós
r_nodes = {};
function addNode(node) {
  x = (width * (node[1] - 50)) / 100;
  y = (height * node[2]) / 100;
  node_name = node[0];
  // Creates circle at x = 50, y = 40, with radius 10
  var circle = paper.circle(x, y, 10);
  circle.attr("fill", "#fd3a69");
  circle.attr("stroke", "#fff");
  var t = paper.text(x, y + 15, commonName(node_name));

  r_nodes[node_name] = circle;
}

for (node of nodes) {
  addNode(node);
}

// Conexões entre nós
for (edge of edges) {
  paper.connection(r_nodes[edge[0]], r_nodes[edge[1]]);
}

// Função para mostrar o resultado da BFS
function calculate() {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const algorithm = document.getElementById("algorithm").value;

  const graph = buildGraphFromEdges(edges);

  if (algorithm == "DFS") {
    var history = dfs(from, to, graph);
  } else if (algorithm == "Djikstra (USC)") {
    var history = ucs(from, to, graph);
  } else {
    var history = bfs(from, to, graph);
  }

  console.log(history);

  for (key in r_nodes) {
    r_nodes[key].attr("fill", "#fd3a69");
  }

  const finalPath = history.finalPath;
  const list_of_cities = history.nodeHistory;

  console.log(finalPath);
  console.log(list_of_cities);

  for (var j = 0; j < list_of_cities.length; j++) {
    var element = r_nodes[list_of_cities[j]];
    var finalAnimation = Raphael.animation({ fill: "#120078" }, 500);
    var intermediateAnimation = Raphael.animation({ fill: "#FF86A0" }, 500);

    element.animate(finalAnimation.delay(1000 * j));

    if (!finalPath.includes(list_of_cities[j])) {
      element.animate(intermediateAnimation.delay(1000 * j + 1200));
    }
  }
}
