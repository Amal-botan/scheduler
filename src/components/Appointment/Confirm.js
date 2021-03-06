import React from "react";

import "components/Appointment/styles.scss";
import Button from "components/Button";

//Function for the confirm page after deleting 
export default function Confirm(props) {

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{'Are you sure you want to delete?'}</h1>
      <section className="appointment__actions">
        <Button onClick={props.onCancel} danger>Cancel</Button>
        <Button onClick={props.onConfirm} danger>Confirm</Button>
      </section>
    </main>
  );
}