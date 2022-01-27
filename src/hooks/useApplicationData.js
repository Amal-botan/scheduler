import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });


  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview, mode) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const stateDays = [...state.days]

    if (mode === 'CREATE') {
      stateDays.forEach((day) => {
        if (day.name === state.day) {
          day.spots -= 1;
        };
      })
    }

    return axios.put(`http://localhost:8000/api/appointments/${id}`, appointments[id])
      .then((res) => {


        setState({ ...state, appointments, days: stateDays })
      })


  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };


    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    const stateDays = [...state.days]

    stateDays.forEach((day) => {
      if (day.name === state.day) {
        day.spots += 1;
      };
    })


    return axios.delete(`http://localhost:8000/api/appointments/${id}`, appointments[id])
      .then((res) => {


        setState({ ...state, appointments, days: stateDays })
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
      const [days, appointments, interviewers] = all;

      setState(prev => ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data }));


    }).catch((err) => {
    })
  }, []);


  return { state, setDay, bookInterview, cancelInterview }
}
