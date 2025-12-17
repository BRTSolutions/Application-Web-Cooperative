import React from 'react'
import "../index.css";


const HeaderIcon = ({icon:Icon}) => {
  return (
    <Icon className="bg-[var(--primary-color)] text-white rounded-md p-2" size={50}></Icon>
  )
}

export default HeaderIcon