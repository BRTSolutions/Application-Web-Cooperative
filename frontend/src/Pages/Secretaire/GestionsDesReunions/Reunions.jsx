import React from 'react'
import HeaderReunions from './HeaderReunions'
import Calendar from './Calender'

const Reunions = () => {
  return (

    <div>
      <HeaderReunions/>
      <div className='m-20'>  
        <Calendar/>
      </div>
    </div>
  )
}

export default Reunions