import React from 'react'
import ProduuitFiniTable from './ProduuitFiniTable'
import HeaderProduitFini from './HeaderProduitFini'

const ProduuitFinis = () => {
  return (
        <div>
      <HeaderProduitFini/>
      <div className='m-20'>  
        <ProduuitFiniTable/>
      </div>
      
    </div>
  )
}

export default ProduuitFinis