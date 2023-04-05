import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [rules, setRules] = useState([]);
  const [facts, setFacts] = useState([]);
  const [newRule, setNewRule] = useState('');
  const [newFact, setNewFact] = useState('');

  // Función para enviar la nueva regla al servidor
  const addRule = () => {
    axios.post('http://localhost:4000/knowledge/rules', { rule: newRule })
      .then(response => {
        setRules([...rules, response.data]);
        setNewRule('');
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Función para enviar el nuevo hecho al servidor
  const addFact = () => {
    axios.post('http://localhost:4000/knowledge/facts', { fact: newFact })
      .then(response => {
        setFacts([...facts, response.data]);
        setNewFact('');
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Función para recuperar los datos existentes de la base de datos
  const fetchData = () => {
    axios.get('http://localhost:4000/knowledge/rules')
      .then(response => {
        setRules(response.data.rules);
      })
      .catch(error => {
        console.log(error);
      });

    axios.get('http://localhost:4000/knowledge/facts')
    .then(response => {
      setFacts(response.data.facts);
    })
    .catch(error => {
      console.log(error);
    });
  };

  // Utiliza useEffect para cargar los datos existentes al cargar la página
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{flexBasis: "100%"}} className="App">
      <h1>Rules</h1>
      <ul>
        {rules.map((rule, index) => (
          <li key={index}>{rule}</li>
        ))}
      </ul>
      <form onSubmit={addRule}>
        <input type="text" value={newRule} onChange={(e) => setNewRule(e.target.value)} />
        <button type="submit">Agregar Rule</button>
      </form>

      <h1>Facts</h1>
      <ul>
        {facts.map((fact, index) => (
          <li key={index}>{fact}</li>
        ))}
      </ul>
      <form onSubmit={addFact}>
        <input type="text" value={newFact} onChange={(e) => setNewFact(e.target.value)} />
        <button type="submit">Agregar Fact</button>
      </form>
    </div>
  );
}

export default Admin;
