import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";


export default function InterviewerListItem(props) {
  let name = "";
  let InterviewListItemClass = classNames('interviewers__item', { ' interviewers__item--selected': props.selected });

  const handleClick = () => { props.setInterviewer(props.name) };

  if (props.selected) {
    name = props.name;
  }
  return (

    <li onClick={() => handleClick()} className={InterviewListItemClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={name}
      />
      {name}
    </li>
  );
}