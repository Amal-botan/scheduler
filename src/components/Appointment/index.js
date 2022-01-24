
import React, { useState } from "react";
import { Fragment } from 'react'

import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import Confirm from "components/Appointment/Confirm.js";
import Status from "components/Appointment/Status.js";
import Error from "components/Appointment/Error.js";
import Form from "components/Appointment/Form.js";

import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";
import { tsPropertySignature } from "@babel/types";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
 let appointment = ""

  if(props.time){
    appointment += `Appointment at ${props.time}`
  } else {
    appointment += 'No appointments'
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // const showApp = () => {
  //   if(props.interview){
  //     <Show />
  //   } else {
  //     <Empty />
  //   }
  // }
  
    // const interviewers=[];


console.log("Props.interviewers",props.interviewers);
console.log("props", props)

  return (
    <article id={props.id} className="appointment">
      <Header time={props.time}/> 
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && <Form onCancel={() => back()} interviewers={props.interviewers}/>}
      </article>
    
  );
}