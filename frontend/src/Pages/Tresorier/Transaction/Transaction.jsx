import React from 'react'
import HeaderTransaction from './HeaderTransaction'
import TransactionTable from './TransactionTable'

const Transaction = () => {
  return (
     <div>
      <HeaderTransaction/>
      <div className='m-20'>  
        <TransactionTable/>
      </div>
      
    </div>
  )
}

export default Transaction