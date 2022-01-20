import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";
import DayListItem from "components/DayListItem";


export default function DayList() {
  const { value, onChange } = props;

  const dayComponents = value.map(dayOfWeek => <DayListItem key={dayOfWeek.id}
    name={dayOfWeek.name} 
    spots={dayOfWeek.spots} 
    selected={dayOfWeek.name === value}
    setDay={() => onChange(dayOfWeek.name)}  /> 
    )

  return (
    <ul>{dayComponents}</ul>
  );
}