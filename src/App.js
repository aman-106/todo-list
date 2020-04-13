import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [projects, setProjects] = useState({});

  useEffect(function() {
    fetch("http://www.mocky.io/v2/5e90316a330000741327d563.json")
      .then(res => res.json())
      .then(data => {
        console.log("sdjdj", data);
        setProjects(data.projects);
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
