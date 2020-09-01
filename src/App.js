import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get("repositories").then(({ data }) => {
      setRepositories(data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "gostack-conceitos-reactjs",
      url: "https://github.com/faustoschwantz/gostack-conceitos-reactjs",
      techs: ["Javascript", "ReactJs"],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete("repositories/" + id);
    setRepositories(repositories.filter((x) => x.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
