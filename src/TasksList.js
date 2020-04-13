import React, { useState, useEffect } from "react";
import update from 'immutability-helper'
import Card from './Card'
// renderr list of dragable and drop task list
const TasksList = ({ tasksListArr }) => {
  {

    const [cards, moveCard] = useDragabletask(tasksListArr);
    return (
      <div className='tasks-list'>
        {cards.map((card, i) => (
          <Card
            key={card.id}
            index={i}
            id={card.id}
            text={card.taskName}
            moveCard={moveCard}
          />
        ))}
      </div>
    );
  }
};
// hook for maintain state for rearrnage task listt
function useDragabletask(tasksListArr) {
  const [cards, setCards] = useState(tasksListArr);
  useEffect(function () {
    setCards(tasksListArr)
  }, [tasksListArr]);
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
  return [cards, moveCard]

}

export default TasksList;
