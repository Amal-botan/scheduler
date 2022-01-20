
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


export default function Appointment(props) {
 let appointment = ""

  if(props.time){
    appointment += `Appointment at ${props.time}`
  } else {
    appointment += 'No appointments'
  }

  // const showApp = () => {
  //   if(props.interview){
  //     <Show />
  //   } else {
  //     <Empty />
  //   }
  // }
  
  return (
    <article className="appointment">
      <Header time={props.time}/> 
      {props.interview ? 
      <Show student={props.interview.student}
      interviewer={props.interview.interviewer}
      /> : <Empty />}
      </article>
    
  );
}