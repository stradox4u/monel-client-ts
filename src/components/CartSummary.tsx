import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import BaseButton from "../components/BaseButton"
import { StoreRootState, emptyCart, useMakePurchaseMutation, useMakeSaleMutation } from "../../store";

const CartSummary: React.FC<{ mode: string }> = ({ mode }) => {
  const cart = useSelector((state: StoreRootState) => state.cart.items);

  const [error, setError] = useState({ productId: "", message: "" });
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const total = cart.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0);
    setCartTotal(total);
  }, [cart]);

  const cartItems = cart.map(item => {
    return (
      <li className={`w-full flex justify-between p-2 ${item.product._id === error.productId ? "bg-red-300" : ""}`} key={item.product._id}>
        <p className="font-montserrat text-sm">{item.product.name}</p>
        <p className="font-montserrat text-sm">{item.quantity} (pcs)</p>
      </li>
    )
  });

  const [submitSaleCart] = useMakeSaleMutation();
  const [submitPurchaseCart] = useMakePurchaseMutation();
  
  const formatCart = cart.map(item => {
    return {
      productId: item.product._id,
      price: item.price * 100,
      quantity: item.quantity
    }
  });

  const dispatch = useDispatch();
  const [loadingState, setLoadingState] = useState(false)
  const submitCart = async () => {
    // Early return if cart is empty
    if (cart.length === 0) {
      return
    }
    try {
      setLoadingState(true)
      if (mode === "purchase") {
        await submitPurchaseCart({ products: formatCart, total: cartTotal }).unwrap();
        dispatch(emptyCart(null));
      }
      if (mode === "sale") {
        await submitSaleCart({ products: formatCart, total: cartTotal }).unwrap();
        dispatch(emptyCart(null));
      }
      setLoadingState(false)
    } catch (err: any) {
      console.error(err)
      if (err.status === 403) {
        if (err.data.data?.product) {
          setError({
            productId: err.data.data.product,
            message: err.data.message
          });
        } else {
          setError({ productId: "", message: err.data.message });
        }
      }
      setLoadingState(false)
    }
  }

  return (
    <div className="w-full p-4">
      {error.message ? (
        <p className="text-red-500 text-xs">{error.message}</p>
      ) : null}
      <ul>
        {cartItems}
      </ul>
      <hr className="mt-4"></hr>
      <div className="my-3 font-montserrat">
        <h3 className="text-base">Total:</h3>
        <span className="text-lg font-semibold">&#8358; {cartTotal.toFixed(2)}</span>
      </div>
      <div className="w-full">
        <BaseButton buttonType='button' buttonText='Submit' isLoading={loadingState} handleClick={submitCart} />
      </div>
    </div>
  )
}

export default CartSummary