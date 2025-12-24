import React from 'react'
import MembresTable from './MembresTable'
import HeaderMembres from './HeaderMembres'

const Membres = () => {
  return (
    <div>
      <HeaderMembres/>
      <div className='m-20'><MembresTable/></div>
      
    </div>
  )
}

export default Membres