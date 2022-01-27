
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
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  let appointment = ""

  if (props.time) {
    appointment += `Appointment at ${props.time}`
  } else {
    appointment += 'No appointments'
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );



  function save(name, interviewer) {

    const prevMode = mode;

    transition(SAVING)

    const interview = {
      student: name,
      interviewer
    };

  
    props.bookInterview(props.id, interview, prevMode)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
    
  }


  function cancel() {
    transition(CONFIRM)

 
  }

  function deleteInterview() {
    transition(DELETING)

    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((err) => {
        transition(ERROR_DELETE, true);
      });
  }

  function editInterview(){
    transition(EDIT)
  }

  console.log("Props For index", props);
  
  return (
    <article id={props.id} className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === SHOW && (
        <Show
          student={props.interview ? props.interview.student : ""}
          interviewer={props.interview ? props.interview.interviewer : ""}
          onDelete={cancel}
          onEdit={editInterview}
        />
      )}
      {mode === DELETING && <Status message={"DELETING"} />}
      {mode === CONFIRM && <Confirm  onCancel={() => back()} onConfirm={deleteInterview}/>}
      {mode === EDIT && <Form  onCancel={() => back()} student={props.interview.student} interviewer={props.interview.interviewer.id}interviewers={props.interviewers} onSave={save} />}
      {mode === CREATE && <Form onCancel={() => back()} interviewers={props.interviewers} onSave={save} />}
      {mode === ERROR_SAVE && <Error message="Error saving, please try again later" onClose={() => transition(CREATE)}/>}
      {mode === ERROR_DELETE && <Error message="Error deleting, please try again later" onClose={() => transition(SHOW)}/>}
    </article>

  );
}