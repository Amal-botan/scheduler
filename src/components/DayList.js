import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";
import DayListItem from "components/DayListItem";


export default function DayList(props) {
  const days = props.days;

  const dayComponents = days.map(dayOfWeek => <DayListItem key={dayOfWeek.id}
    name={dayOfWeek.name} 
    spots={dayOfWeek.spots} 
    selected={dayOfWeek.name === props.day}
    setDay={() => props.setDay(dayOfWeek.name)}  /> 
    )
  


 

  return (
    <ul>{dayComponents}</ul>
  );
}