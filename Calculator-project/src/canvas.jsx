import { useState, useRef, useEffect } from "react";
import "./canvas.css"

export default function GraphCanvas() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selected, setSelected] = useState(null);
  const [matrix, setMatrix] = useState([]);
  const [addNode, setaddNode] = useState(false);
  const [removeNode, setremoveNode] = useState(false);
  const [addEdge, setaddEdge] = useState(false);
  const [clearNodes, setClear] = useState(false);
  const [disTable, setTable] = useState(false);
  const svgRef = useRef(null);

  const updateMatrix = (newNodes, newEdges) => {
    const size = newNodes.length;
    const m = Array.from({ length: size }, () => Array(size).fill(0));

    newEdges.forEach(({ from, to }) => {
      const fi = newNodes.indexOf(from);
      const ti = newNodes.indexOf(to);
      if (fi >= 0 && ti >= 0) {
        m[fi][ti] = 1;
        m[ti][fi] = 1;
      }
    });

    setMatrix(m);
  };

  useEffect(() => {
    if (nodes.length === 0 ) setTable(false);
  }, [nodes]);

  const handleClick = (e) => {
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clicked = nodes.find(n => {
      const dx = n.x - x;
      const dy = n.y - y;
      return Math.sqrt(dx * dx + dy * dy) < 20;
    });

    if (clicked) {
      if (removeNode){
        DeleteNode(clicked);
        return;
      }
      if(addEdge){
        CreateEdge(clicked);
        return;
      }
      
      return;
    }
    if (addNode){
        AddNode(x,y);
      }
 

    
  };

  const CreateEdge = (clicked) => {
    if (!selected) {
        setSelected(clicked);
      } else if (selected !== clicked) {
        const newEdges = [...edges, { from: selected, to: clicked }];
        setEdges(newEdges);
        setSelected(null);
        updateMatrix(nodes, newEdges);
      } else {
        setSelected(null);
      }
  }

  const AddNode = (x,y) => {
    if (nodes.length >= 26) return;

    const label = String.fromCharCode(65 + nodes.length);
    const newNodes = [...nodes, { x, y, label }];
    setNodes(newNodes);
    updateMatrix(newNodes, edges);
  }

  const DeleteNode = (node) => {
    const filtered = nodes.filter(n => n !== node);
    const newNodes = filtered.map((n, i) => ({ ...n, label: String.fromCharCode(65 + i) }));

    const newEdges = edges
      .filter(e => e.from !== node && e.to !== node)
      .map(e => ({
        from: newNodes[filtered.indexOf(e.from)],
        to: newNodes[filtered.indexOf(e.to)]
      }));

    setNodes(newNodes);
    setEdges(newEdges);
    updateMatrix(newNodes, newEdges);
  }

  const ClearAllEN = () =>{
      setNodes([]);
      setEdges([])
      setMatrix([]);
      setSelected(null);
      setaddNode(false);
      setremoveNode(false);
      setaddEdge(false);

  }

  const MatrixDensity = () => {
    let NoE = edges.length;
    let NoN = nodes.length;

    if (NoN <= 1) return 0;

    let density = ((2 * NoE) / (NoN * (NoN - 1))) * 100; 

    return density;
    
   
  }

  const displayTable = (matrix) => {
    return (
      <>
      <div className = "data">



          <div className="node-count">
            <h3>Node Count</h3>
              <text>{nodes.length}</text>
          </div>



          <div className="edge-count">
            <h3>Edge Count</h3>
              <text>{edges.length}</text>
          </div>

          <div className="edge-count">
            <h3>Density</h3>
              <text>{MatrixDensity().toFixed(1)}%</text>
          </div>
        </div>
        {matrix.length > 0 && (
          <div className="Scroll-pane">
          <table className="content">
            <thead>
              <tr>
                <th className="corner"></th>
                {nodes.map(n => <th className="col" key={n.label}>{n.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, i) => (
                <tr className="con" key={i}>
                  <th className="row">{nodes[i].label}</th>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      style = {{color: cell === 1 ? "red" : "inherit"}}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        )}
        </>
    );
  }
  
  return (
    <div className="Matrix">
      <div className=" button-class">

       {/*ACTION BUTTON*/}

        <button 
          onClick={() => { setaddNode(!addNode); setremoveNode(false); setaddEdge(false)}}
          style={{ background: addNode ? "#7F77DD" : "" }}
        >
          Add Nodes
        </button>

        <button 
          onClick={() => { setremoveNode(!removeNode); setaddNode(false); setaddEdge(false)}}
          style={{ background: removeNode ? "#7F77DD" : "" }}
        >
          Delete Nodes
        </button>

        <button
          onClick={() => { setaddEdge(!addEdge); setaddNode(false); setremoveNode(false) }}
          style={{ background: addEdge ? "#7F77DD" : "" }}
        >Connect Nodes</button>
        
        <button
          onClick={() => { ClearAllEN(); setTable(false);  setaddNode(false); setremoveNode(false); setaddEdge(false) }}
        >Clear all</button>
        

      </div>

      <div className = "canvas">
        <svg
          ref={svgRef}
          width="600"
          height="400"
          onClick={handleClick}
        >
      
          {edges.map((e, i) => (
            <line
              key={i}
              x1={e.from.x}
              y1={e.from.y}
              x2={e.to.x}
              y2={e.to.y}
              stroke="#ffffff"
            />
          ))}

          {nodes.map((n, i) => (
            <g key={i}>
              <circle
                cx={n.x}
                cy={n.y}
                r={20}
                fill={selected === n ? "#ffffff" : "#363636"}
                stroke={selected === n ? "#3b82f6" : "#ffffff"}
                strokeWidth ={selected === n ? 5:3}
              />
              <text
                x={n.x}
                y={n.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="13"
                fill={selected === n ? "#1d4ed8" : "#ffffff"}
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      
      <div className = "tablePage">
        <h1>Adjacency Matrix</h1>
        <div className="CalculateButton">
         {!disTable && nodes.length >=1 && (<button onClick={() => {
        if (nodes.length == 0) return;
         setTable(true);
        }}
        >Calculate Matrix</button>)}
          </div>

          {disTable && displayTable(matrix)}

          
         
    </div>
    </div>
  );
}