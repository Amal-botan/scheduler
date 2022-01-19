import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";


export default function InterviewerListItem(props) {
  let name = "";
  let interviewerClass = classNames('interviewers__item', { ' interviewers__item--selected': props.selected});

  if(props.selected){
    name = props.name;
  }

  return (
  <li className={interviewerClass} onClick={props.setInterviewer}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.selected && props.name}
  </li>
);
}