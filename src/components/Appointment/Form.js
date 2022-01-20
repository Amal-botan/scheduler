import React, { useState } from "react";

import "components/Appointment/styles.scss";
import Button from "components/Button";
import InterviewerListItem from "components/InterviewerListItem";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {

  
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setStudent("")
    setInterviewer("")
  }; 

  const cancel = () => {
    reset();
    props.onCancel()
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers}
          value={props.interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()} >Cancel</Button>
          <Button confirm onClick={() => props.onSave()} >Save</Button>
        </section>
      </section>
    </main>
  );
}