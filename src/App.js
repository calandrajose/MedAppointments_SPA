import React, {Fragment, useEffect, useState} from 'react'
import AppointmentForm from './components/AppointmentForm'
import Appointment from './components/appointments/Appointment'

function App() {

  let  initialAppointments = JSON.parse(localStorage.getItem('appointments'));
  
  if(initialAppointments === '[]' || !Array.isArray(initialAppointments)){
    initialAppointments = []
  }

  const [appointments, setAppointments] = useState(initialAppointments)

  useEffect(()=>{
    localStorage.setItem('appointments', JSON.stringify(appointments))
  }, [appointments])

  const createAppointmentHandler = (newAppointment)=>{
    setAppointments([
      ...appointments,
      newAppointment
    ])
  }

  const onCancelAppointmentHandler = (id)=>{
    setAppointments([
      ...appointments.filter((appointment)=> appointment.id !== id)
    ])
  }

return(
  <Fragment>
    <h1>Administrador de Turnos</h1>
    <div className="container"> 
      <div className="row">
        <div className="one-half column">
          <h2>Crear cita</h2>
          <AppointmentForm createAppointment={createAppointmentHandler}/>
        </div>
        <div className="one-half column">
          <h2>{appointments.length !==0 ? 'Gestiona tus turnos' : null}</h2>
          {appointments.map(appointment=>(
            <Appointment
              key={appointment.id}
              data = {appointment}
              cancel={onCancelAppointmentHandler}/>
          ))}
        </div>
      </div>
    </div>
  </Fragment>
  );
}

export default App;
