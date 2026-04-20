import "./body.css";
function Body() {

  


  return (
      <main className="body-container">

        <section className="hero">
          <span className="badge">Graph Theory Tool</span>
          <h1>Adjacency Matrix Calculator</h1>
          <p>Visualize, analyze, and compute graph relationships with ease.</p>
        </section>

        <section className="features">
          <div className="card">
            <span className="icon">⬛</span>
            <h3>Build matrix</h3>
            <p>Add nodes and edges to construct your graph visually</p>
          </div>
          <div className="card">
            <span className="icon">🔗</span>
            <h3>Detect paths</h3>
            <p>Find shortest paths and connected components instantly</p>
          </div>
          <div className="card">
            <span className="icon">📊</span>
            <h3>Analyze graph</h3>
            <p>Compute degree, density, and adjacency properties</p>
          </div>
        </section>

        <div className="cta">
          <button>Get Started</button>
        </div>

      </main>
  );
}

export default Body;