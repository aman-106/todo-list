import React, { useState, useEffect, useMemo } from "react";
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import "./styles.css";

const emptyProjects = [];
const defaultProjects = '';
const url = 'http://www.mocky.io/v2/5e90316a330000741327d563.json';

export default function App() {
  const [projectsInfo, setProjects] = useState(emptyProjects);
  const [selectedProjects, setSelectedProjects] = useState(defaultProjects);
  const handleSelectedProjects = function (event) {
    const { value } = event.target;
    setSelectedProjects(value);
  }

  useEffect(function () {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log("sdjdj", data);
        setProjects(data.projects);
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

  const foramtedProjectsInfo = useMemo(
    function () {
      const info = {};
      const names = projectsInfo.map(function (project) {
        info[project.name] = project.tasks;
        return project.name;
      })

      return { names, info };

    }, [projectsInfo]
  )

  const { names, info } = foramtedProjectsInfo;
  const tasksListArr = selectedProjects ? info[selectedProjects] : emptyProjects;
  return (
    <div className="app">

      <div className="app__header">ToDo List</div>
      <div className="app__main">
        <select value={selectedProjects} onChange={handleSelectedProjects}>
          <option value={''}>{'Select Option'}</option>
          {names.map(function (name) {
            return <option value={name} key={name}>{name}</option>
          })}
        </select>
        <DndProvider backend={Backend}>
          <div className="tasks-list">
            {
              tasksListArr.map(function (task) {
                return <div className="task" key={task.taskName}>
                  <input type='checkbox'></input>
                  <span className='task__name'>{task.taskName}</span></div>
              })
            }
          </div>
        </DndProvider>


      </div>
    </div>
  );
}
