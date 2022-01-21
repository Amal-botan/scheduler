export function getAppointmentsForDay(state, day) {
  let appointmentOfDay = [];
  let appointmentObj = [];
  for(const dayOfWeek of state.days){
    console.log(dayOfWeek.name)
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