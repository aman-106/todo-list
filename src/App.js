import React, { useState, useEffect, useMemo } from "react";
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import TasksList from './TasksList';
import "./styles.css";

const emptyProjects = [];
const defaultProjects = '';
const url = 'http://www.mocky.io/v2/5e90316a330000741327d563.json';

//  render to do list app
export default function App() {

  const [selectedProjects, setSelectedProjects] = useState(defaultProjects);
  const foramtedProjectsInfo = useSelectedProjects();
  const { names, info } = foramtedProjectsInfo;
  const tasksListArr = selectedProjects ? info[selectedProjects] : emptyProjects;
  const handleSelectedProjects = function (event) {
    const { value } = event.target;
    setSelectedProjects(value);
  }


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
        {/* show liist of tasks */}
        <DndProvider backend={Backend}>
          <TasksList tasksListArr={tasksListArr} />
        </DndProvider>
      </div>
    </div>
  );
}

//hook for get list of tasks for projects
function useSelectedProjects() {
  const [projectsInfo, setProjects] = useState(emptyProjects);
  useEffect(function () {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProjects(data.projects);
      })
      .catch(e => {
        // set empty error 
        setProjects([]);
        console.error(e);
      });
  }, []);
  //   reformat list of tasks 
  const foramtedProjectsInfo = useMemo(
    function () {
      const info = {};
      const names = projectsInfo.map(function (project) {
        info[project.name] = project.tasks.map(function (task, i) {
          return {
            taskName: task.taskName,
            id: i,
          }
        });
        return project.name;
      })
      return { names, info };

    }, [projectsInfo]
  )

  return foramtedProjectsInfo;
}
