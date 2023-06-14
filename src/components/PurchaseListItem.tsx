import React from "react";
import { Transaction } from "../types";

const PurchaseListItem: React.FC<{item: Transaction}> = ({ item }) => {
  const productsList = item.products?.map(product => {
    return (
      <div className='flex flex-col justify-start' key={product._id}>
        <h3 className='font-montserrat text-base font-semibold'>{product.productId?.name}</h3>
        <span className='font-montserrat inline-flex text-sm'>
          <h3 className='font-light'>Quantity:&nbsp;</h3>
          {product.quantity}
        </span>
        <span className='font-montserrat inline-flex text-sm'>
          <h3 className='font-light'>Price:&nbsp;</h3>
          &#8358; {(product.price / 100).toFixed(2)}
        </span>
      </div>
    )
  })
  return (
    <div className='py-2'>
      <div className='flex justify-between '>
        <div className='flex flex-col gap-2'>
          {productsList}
        </div>
        <span className='font-montserrat inline-flex text-sm'>
          <h3 className='font-light'>Date:&nbsp;</h3>
            {new Date(item.createdAt).toDateString()}
        </span>
        <span className='font-montserrat inline-flex text-sm'>
          <h3 className='font-light'>Total:&nbsp;</h3>
          &#8358; {(item.total / 100).toFixed(2)}
        </span>
      </div>
      <hr></hr>
    </div>
  )
}

export default PurchaseListItem;