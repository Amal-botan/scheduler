export function getAppointmentsForDay(state, day) {
  let appointmentOfDay = [];
  let appointmentObj = [];
  for(const dayOfWeek of state.days){
 
    if(dayOfWeek.name === day){
      appointmentOfDay = dayOfWeek.appointments;
   }
  }
  

    for(const appointmentId of appointmentOfDay){
      appointmentObj.push(state.appointments[appointmentId]);
    }
  
  
  return appointmentObj;

  //... returns an array of appointments for that day
}

export function getInterview(state, interview) {
 
  if(interview === null){
    return null;
  }

 const interviewerId = interview.interviewer;


 const interviewer = state.interviewers[interviewerId];

const interviewObj={
  student: interview.student,
  interviewer: interviewer

};

  return interviewObj;

}

export function getInterviewersForDay(state, day) {
  if (!state.interviewers) return [];
  const filteredDay = state.days.filter(mappedDay => mappedDay.name === day)[0];
  if (!filteredDay) return [];
  if (!filteredDay.interviewers) return [];
  const result = Object.values(state.interviewers).filter(interviewer =>
    filteredDay.interviewers.includes(interviewer.id)
  );
  return result;
}