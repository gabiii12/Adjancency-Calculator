import "./howtouse.css"

function howtouse(){
    return(
        <>
        <div className="container" id = "htu">
            <h1>How to use Adjacency Matrix Calculator</h1>
            <p>
                The calculator lets you build a graph 
                visually and automatically generates 
                its adjacency matrix in real time.
            </p>

            <h2>Step 1 Add Nodes</h2>
            <p>
                Click the Add Nodes button to enter node-adding mode, 
                then click anywhere on the canvas to place a node. 
                Each node represents a vertex in your graph. 
                You can add as many nodes as you need.
            </p>

            <h2>Step 2 — Connect Nodes</h2>
            <p>
                Click the Connect Nodes button, then click on one 
                node followed by another to draw an edge between them. 
                The adjacency matrix below the canvas will automatically 
                update to reflect the new connection.
            </p>
            <h2>Step 3 — Delete Nodes</h2>
            <p>
                Made a mistake? Click Delete Nodes, then click on any node you want to remove. 
                Any edges connected to that node will also be removed, 
                and the matrix will update accordingly.
            </p>

            <h2>Step 4 — Read the Matrix</h2>
            <p>
                The Adjacency Matrix at the bottom shows the relationships between all nodes. 
                A value of 1 means there is a direct connection between two nodes, while 0 means there is none.
            </p>

            <h2>Step 5 — Start Over</h2>
            <p>
                Click Clear All to reset the canvas and start with a fresh graph.
            </p>
        </div>




        </>
    )
}

export default howtouse;