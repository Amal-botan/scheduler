
import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


// const appointmentsArr = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];

export default function Application() {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  

  const setDay = day => setState({ ...state, day });

 


  useEffect(() => {
    const daysURL = `http://localhost:8001/api/days`;
    const appointmentsURL = `http://localhost:8001/api/appointments`;
    const interviewersURL = `http://localhost:8001/api/interviewers`;
  
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ]).then((all) => {
      // console.log("All info", all)
      const [days, appointments, interviewers] = all;
      console.log("All", all);
    
      setState(prev => ({...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data}));
      // setState({day:"Tuesday"});

      

    }).catch((err) => {
         console.log('err')
       })},[]);

       console.log("State", state)

  // const appointmentList = dailyAppointments.map((appointment) => {
  //   return (
  //   <Appointment key={appointment.id} {...appointment}/>
  //   )
  // })


  const dailyAppointments =  getAppointmentsForDay(state, state.day);

  
  const schedule = dailyAppointments.map((appointment) => {
    

    // console.log(interviewers);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={getInterview(state, appointment.interview)}
        interviewers={getInterviewersForDay(state, state.day)}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
