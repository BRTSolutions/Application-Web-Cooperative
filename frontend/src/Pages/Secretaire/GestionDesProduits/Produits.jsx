import React from 'react'
import ProductTable from './ProductTable'
import HeaderProduit from './HeaderProduit'

const Produits = () => {
  return (
        <div>
      <HeaderProduit/>
      <div className='m-20'>  
        <ProductTable/>
      </div>
      
    </div>
  )
}

export default Produits