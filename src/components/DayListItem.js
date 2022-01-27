import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";


export default function DayListItem(props) {
  const spotFull = (props.spots === 0) ? true : false;

  let dayListItemClass = classNames('day-list__item', { ' day-list__item--selected': props.selected, ' day-list__item--full': spotFull });
  let spotsMessage = ""

  const formatSpots = function(spots) {
    if(props.spots === 0) {
      spotsMessage = "no spots remaining";
    } else if (props.spots === 1) {
      spotsMessage = "1 spot remaining";
    } else {
      spotsMessage = `${props.spots} spots remaining`;
    }

    return spotsMessage;
  };



  return (
    <li onClick={props.setDay} className={dayListItemClass}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}