let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let nodes = [];
let edges = [];
let selectedNode = null;

canvas.width = window.innerWidth * 0.7;
canvas.height = window.innerHeight;

function drawNode(node) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillText(node.label, node.x - 5, node.y + 5);
}
function drawEdge(edge) {
    ctx.beginPath();
    ctx.moveTo(edge.from.x, edge.from.y);
    ctx.lineTo(edge.to.x, edge.to.y);
    ctx.stroke();
}

function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    edges.forEach(edge => drawEdge(edge));
    nodes.forEach(node => drawNode(node));

    renderMatrix(); 
}

function getClickedNode(x, y) {
    return nodes.find(node => {
        let dx = node.x - x;
        let dy = node.y - y;
        return Math.sqrt(dx * dx + dy * dy) < 20;
    });
}

function createAdjacencyMatrix() {
    let size = nodes.length;

    let matrix = Array.from({ length: size }, () =>
        Array(size).fill(0)
    );

    edges.forEach(edge => {
        let fromIndex = nodes.indexOf(edge.from);
        let toIndex = nodes.indexOf(edge.to);

        matrix[fromIndex][toIndex] = 1;
        matrix[toIndex][fromIndex] = 1; // undirected
    });

    return matrix;
}

function renderMatrix() {
    let matrix = createAdjacencyMatrix();

    let html = "<h3>Adjacency Matrix</h3>";
    html += "<table>";

    // header row
    html += "<tr><th></th>";
    nodes.forEach(n => {
        html += `<th>${n.label}</th>`;
    });
    html += "</tr>";

    matrix.forEach((row, i) => {
        html += `<tr><th>${nodes[i].label}</th>`;

        row.forEach(cell => {
            html += `<td>${cell}</td>`;
        });

        html += "</tr>";
    });

    html += "</table>";

    document.getElementById("matrix").innerHTML = html;
}

canvas.addEventListener("click", function (e) {
    const rect = canvas.getBoundingClientRect();

    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    let clickedNode = getClickedNode(x, y);

    if (clickedNode) {
        if (selectedNode == null) {
            selectedNode = clickedNode;
        } else {
            edges.push({
                from: selectedNode,
                to: clickedNode
            });

            selectedNode = null;
        }

        redraw();
        return;
    }

    let label = String.fromCharCode(65 + nodes.length);

    nodes.push({ x, y, label });

    redraw();
});