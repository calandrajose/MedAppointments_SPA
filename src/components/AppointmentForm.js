import React, { Fragment, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types'

const AppointmentForm = ({createAppointment}) => {
  const [appointment, setAppointment] = useState({
    name: "",
    lastname: "",
    email: "",
    date: "",
    time: "",
    symptoms: ""
  });
  
  const [error, setError] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);

  const inputHandler = (e) => {
    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value,
    });
  };

  const { name, lastname, email, date, time, symptoms } = appointment;

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(validateInputs()){
      appointment.id = uuidv4()
      createAppointment(appointment)
      clearState()
    } else {
      setError(true);
      setTimeout(() => {
        setError(false)
      }, 1500);
    }
  };

  const validateInputs = () => {
    let isValid = false
    if (
      name.trim() !== "" &&
      lastname.trim() !== "" &&
      email.trim() !== "" &&
      date.trim() !== "" &&
      time.trim() !== "" &&
      symptoms.trim() !== ""
    ) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if((pattern.test(email))){
          isValid = true;
          setWrongEmail(false)
        }else{
          setWrongEmail(true)
        }
      }

        return isValid
    }
  const clearState = ()=>{
    setAppointment({
      name: "",
      lastname: "",
      email: "",
      date: "",
      time: "",
      symptoms: ""
    })
  }

  return (
    <Fragment>
      
      <form onSubmit={onSubmitHandler}>
        <label>Nombre</label>
        <input
          type="text"
          name="name"
          value={name}
          className="u-full-width"
          placeholder="Nombre"
          onChange={inputHandler}
        />
        <label>Apellido</label>
        <input
          type="text"
          name="lastname"
          value={lastname}
          className="u-full-width"
          placeholder="Apellido"
          onChange={inputHandler}
        />
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={email}
          className="u-full-width"
          placeholder="Email"
          onChange={inputHandler}
        />
        <label>Fecha</label>
        <input 
          type="date" 
          name="date" 
          value={date}
          className="u-full-width"
          onChange={inputHandler}
       />
        <label>Hora</label>
        <input 
          type="time" 
          name="time" 
          value={time}
          className="u-full-width" 
          onChange={inputHandler}
        />
        <label>Sintomas</label>
        <textarea 
          className="u-full-width" 
          name="symptoms"
          value={symptoms}
          onChange={inputHandler}>
        </textarea>
        <button
          type="submit"
          className="u-full-width button-primary"
        >
          Enviar
        </button>
      </form>
      <p className={error ? "alert-error" : 'alert-error hide'} >{wrongEmail ? 'Ingresa una direccion de Email correcta' : 'Todos los campos son obligatorios'}</p>
    </Fragment>
  );
};

AppointmentForm.propTrypes = {
  createAppointment: PropTypes.func.isRequired
}

export default AppointmentForm;
