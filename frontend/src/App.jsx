import React from "react";

const projects = [
  { id: 1, title: "CarPricebot", tech: "React, Node" },
  { id: 2, title: "LUS Classification", tech: "Python, Tensorflow" },
  { id: 3, title: "ECN+/Wait in NS-3", tech: "C++, OOPS" },
];

const App = () => {
  return (
    <div>
      <h1>Abhijith C | Portfolio</h1>
      <p>Visitor count: 0 (Coming soon with redis!)</p>
      <hr />

      <h2>Projects</h2>
      <div>
        {projects.map((project) => (
          <div key={project.id}>
            <h3>{project.title}</h3>
            <p>Built with: {project.tech}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
