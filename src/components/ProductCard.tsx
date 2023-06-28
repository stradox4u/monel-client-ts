import React from "react";
import { useNavigate } from "react-router-dom"

import BaseButton from "./BaseButton";
import { getCurrentUser, store, useDeleteProductMutation, useFetchInventoryQuery } from "../../store";
import { Product } from "../types";

type ProductCardProps = {
  product: Product;
  showStock: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showStock }) => {
  const userObject = getCurrentUser(store.getState());

  const { data: stock } = useFetchInventoryQuery();

  const navigate = useNavigate()

  const editProduct = () => {
    navigate(`/product/${product._id}`)
  }

  const [deleteProduct] = useDeleteProductMutation();
  
  const deleteProductHandler = () => {
    deleteProduct({productId: product._id});
  }

  const startPurchase = () => {
    navigate("/purchases")
  }
  
  const startSale = () => {
    navigate(`/user/${userObject?._id}/sales`);
  }

  return (
    <div className='w-full rounded-md shadow-md'>
      <img src={product.picture} alt='product' className='w-full aspect-square object-cover'></img>
      <div className='w-full p-4'>
        <div className='mb-4'>
          <h3 className='font-texturina text-2xl font-semibold'>Name:</h3>
          <h2 className='font-montserrat text-xl font-normal'>{product.name}</h2>
        </div>
        <div className='mb-4'>
          <h3 className='font-texturina text-2xl font-semibold'>Price:</h3>
          <h2 className='font-montserrat text-xl font-normal'>&#8358; {(product.price)}</h2>
        </div>
        {
          showStock ? (
            <div className='mb-4'>
              <h3 className='font-texturina text-2xl font-semibold'>Stock:</h3>
              <h2 className='font-montserrat text-xl font-normal'>{stock && stock[product._id]?.stockQuantity || 0}</h2>
            </div>
          ) : null
        }
        <div className='flex flex-col items-stretch justify-between'>
          <div onClick={startSale} className='w-full my-2'>
            <BaseButton buttonType='button' buttonText='Sale' />
          </div>
          {
            userObject?.role === "admin" || userObject?.role === "super user" ?
              (
                <div className='flex justify-between'>
                  <div className='max-w-fit my-2'>
                    <BaseButton buttonType='button' buttonText='Edit' handleClick={editProduct} />
                  </div>
                  <div className='max-w-fit my-2'>
                    <BaseButton buttonType='button' buttonText='Buy' handleClick={startPurchase} />
                  </div>
                  <div className='max-w-fit my-2'>
                    <BaseButton buttonType='button' buttonText='Delete' handleClick={deleteProductHandler} />
                  </div>
                </div>
              ) : null
          }
        </div>
      </div>
    </div>
  )
}

export default ProductCard