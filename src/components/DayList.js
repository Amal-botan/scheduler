import React from "react";
import "components/DayListItem.scss";
import DayListItem from "components/DayListItem";


export default function DayList(props) {
  const { days, value, onChange } = props;

  const dayComponents = days.map(dayOfWeek => <DayListItem key={dayOfWeek.id}
    name={dayOfWeek.name}
    spots={dayOfWeek.spots}
    selected={dayOfWeek.name === value}
    setDay={() => onChange(dayOfWeek.name)} />
  )

  return (
    <ul>{dayComponents}</ul>
  );
}