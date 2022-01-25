
import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  

  const setDay = day => setState({ ...state, day });

 
  function bookInterview(id, interview) {
  
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({...state, appointments});


   return axios.put(`http://localhost:8000/api/appointments/${id}`, appointments[id])
      .then((res) => { 
       
        
         setState({...state, appointments})
        
      }).catch((err) => {
        console.log(err);
      })
   

  }

  function cancelInterview(id) {
    console.log(id);
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    console.log("Appointment", appointment)

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    console.log("Appointments", appointments)

   return axios.delete(`http://localhost:8000/api/appointments/${id}`, appointments[id])
    .then((res) => { 
    

      console.log(res.data)
       setState({...state, appointments})
      
    })

  }

  useEffect(() => {
    const daysURL = `http://localhost:8001/api/days`;
    const appointmentsURL = `http://localhost:8001/api/appointments`;
    const interviewersURL = `http://localhost:8001/api/interviewers`;
  
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ]).then((all) => {
      console.log(all)
      const [days, appointments, interviewers] = all;
      console.log("Data", days.data, appointments.data, interviewers.data)

      setState(prev => ({...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data}));


    }).catch((err) => {
         console.log('err')
       })},[]);



  const dailyAppointments =  getAppointmentsForDay(state, state.day);

  
  const schedule = dailyAppointments.map((appointment) => {
    console.log("Appoint", appointment)

    // console.log(interviewers);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={getInterview(state, appointment.interview)}
        interviewers={getInterviewersForDay(state, state.day)}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
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
