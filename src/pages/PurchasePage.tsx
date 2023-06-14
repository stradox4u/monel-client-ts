import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";

import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

import ProductMiniCard from "../components/ProductMiniCard";
import { StoreRootState, addToCart, emptyCart, useFetchProductsQuery } from "../../store";
import { Product } from "../types";

const PurchasePage: React.FC = () => {
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
      <CartItem product={item.product} mode='purchase' key={item.product._id} />
    )
  })
  return (
    <div className='grid grid-cols-3'>
      <div className='col-span-2 flex justify-between items-start py-2 gap-4'>
        <div className='grid grid-cols-3 gap-4'>
          {productCards}
        </div>
      </div>
      <div className='col-span-1'>
        <CartSummary mode='purchase' />
      </div>
      <div className='col-span-3'>
        {cartItems}
      </div>
      <div className='col-span-3 font-montserrat text-lg text-monel-blue flex justify-around'>
        <Link to='view'>View Purchases</Link>
      </div>
      <div className='col-span-3'>
        <Outlet />
      </div>
    </div>
  )
}

export default PurchasePage;