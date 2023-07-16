import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ProductMiniCard from "../components/ProductMiniCard";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { StoreRootState, addToCart, emptyCart, useFetchProductsQuery } from "../../store";
import { Product } from "../types";

const SalePage: React.FC = () => {
  useFetchProductsQuery();
  const products: Product[] = useSelector((state: StoreRootState) => state.search.filteredProducts);
  const cart = useSelector((state: StoreRootState) => state.cart.items);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(emptyCart(null));
    }
  }, []);

  const addProductToCart = (product: Product) => {
    const productPrice = +product.price.replace(",", "")
    dispatch(addToCart({ product, quantity: 1, price: productPrice }));
  }

  const productCards = products?.map(product => {
    return (
      <ProductMiniCard product={product} addProductToCart={addProductToCart} key={product._id} />
    )
  })

  const cartItems = cart.map(item => {
    return (
      <CartItem product={item.product} mode='sale' key={item.product._id} />
    )
  })
  return (
    <div className='grid grid-cols-3 sm:-mt-48'>
      <div className='sm:col-span-2 col-span-3 flex justify-between items-start py-2 gap-4'>
        <div className='grid sm:grid-cols-3 grid-cols-2 sm:gap-4 gap-2'>
          {productCards}
        </div>
      </div>
      <div className='sm:col-span-1 col-span-3'>
        <CartSummary mode='sale' />
      </div>
      <div className='col-span-3'>
        {cartItems}
      </div>
      <div className='col-span-3 font-montserrat text-lg text-monel-blue flex justify-around'>
        <Link to='view'>View Sales</Link>
      </div>
      <div className='col-span-3 self-start'>
        <Outlet />
      </div>
    </div>
  )
}

export default SalePage