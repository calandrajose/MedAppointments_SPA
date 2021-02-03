import React from 'react';
import PropTypes from 'prop-types'

const Appointment = ({data, cancel}) => {

    const output = [];
    for(let key in data){
        if(key !== 'id'){
            output.push({key: key, info:data[key]})
        }
    }

    <h2>prueba</h2>
    return(
        <div className='cita'>
            {output.map(item=><p key={item.key}>{item.key}: <span>{item.info}</span></p>)}
            <button className='button eliminar u-full-width' onClick={()=>cancel(data.id)}>Eliminar &times;</button>
        </div>
    )
};

Appointment.propTypes = {
    data: PropTypes.object.isRequired,
    cancel: PropTypes.func.isRequired
}

export default Appointment;