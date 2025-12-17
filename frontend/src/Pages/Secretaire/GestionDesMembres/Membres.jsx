import React from 'react'
import Header from './Header'
import MembresTable from './MembresTable'

const Membres = () => {
  return (
    <div>
      <Header/>
      <div className='m-20'><MembresTable/></div>
      
    </div>
  )
}

export default Membres