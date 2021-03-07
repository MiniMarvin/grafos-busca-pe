// var g = new Dracula.Graph();

// for (edge of edges) {
//   g.addEdge(commonName(edge[0]), commonName(edge[1]), {
//     label: edge[2],
//   });
// }

// var layouter = new Dracula.Layout.Spring(g);
// layouter.layout();

// var renderer = new Dracula.Renderer.Raphael("#canvas", g, 1000, 600);
// renderer.draw();

// Creates canvas 320 × 200 at 10, 50

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

// paper.connection(circle, shapes[2], "#000", "#fff|5");
// var t = paper.text(50, 50, "Raphaël\nkicks\nbutt!");
