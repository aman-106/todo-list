import React, { useState } from "react";
import update from 'immutability-helper'
import Card from './Card'

const Container = ({ tasksListArr }) => {
  {
    const [cards, setCards] = useState(tasksListArr);
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
    return (
      <div>
        {tasksListArr.map((card, i) => (
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
export default Container;
