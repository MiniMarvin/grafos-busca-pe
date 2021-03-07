const new_options = nodes.map((node) => {
  return node[0];
});
for (opt of new_options) {
  var option_from = document.createElement("option");
  option_from.text = opt;
  var option_to = document.createElement("option");
  option_to.text = opt;
  document.getElementById("from").add(option_from);
  document.getElementById("to").add(option_to);
}

width = 1000;
height = 600;

r_nodes = {};
var paper = Raphael("canvas", width, height);
// var c = paper.image("pernambuco.png", 0, 0, width, height);

function addNode(node) {
  x = (width * (node[1] - 50)) / 100;
  y = (height * node[2]) / 100;
  node_name = node[0];
  // Creates circle at x = 50, y = 40, with radius 10
  var circle = paper.circle(x, y, 10);
  circle.attr("fill", "#f00");
  circle.attr("stroke", "#fff");
  var t = paper.text(x, y + 15, commonName(node_name));

  r_nodes[node_name] = circle;
}

for (node of nodes) {
  addNode(node);
}

for (edge of edges) {
  paper.connection(r_nodes[edge[0]], r_nodes[edge[1]]);
}

function calculate() {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  const graph = buildGraphFromEdges(edges);
  console.log("BFS:");
  const history = bfs(from, to, graph);
  console.log(history);
  const finalPath = history.finalPath;
  for (key in r_nodes) {
    r_nodes[key].attr("fill", "#f00");
  }
  for (city of finalPath) {
    r_nodes[city].attr("fill", "#00f");
  }
}
