import React, { useState, useEffect, useMemo } from "react";
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import TasksList from './TasksList';
import "./styles.css";

const emptyProjects = [];
const defaultProjects = '';
const url = 'http://www.mocky.io/v2/5e90316a330000741327d563.json';


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
        <DndProvider backend={Backend}>
          <TasksList tasksListArr={tasksListArr} />
        </DndProvider>
      </div>
    </div>
  );
}

function useDragabletask(initialCards) {
  console.log('initialCards', initialCards)
  const [cards, setCards] = useState(initialCards);
  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = cards[dragIndex]
    setCards(
      update(cards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      }),
    )
  }


  return [cards, setCards, moveCard]

}


function useSelectedProjects() {
  const [projectsInfo, setProjects] = useState(emptyProjects);
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
        info[project.name] = project.tasks.map(function (task, i) {
          return {
            taskName: task.taskName,
            id: i,
          }
        });
        return project.name;
      })
      console.log('info', info)

      return { names, info };

    }, [projectsInfo]
  )

  return foramtedProjectsInfo;
}
