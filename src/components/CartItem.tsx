import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import saveIcon from "../assets/images/saveIcon.svg";
import deleteIcon from "../assets/images/deleteIcon.svg";
import { Product } from "../types";
import { StoreRootState, removeFromCart, updateCart } from "../../store";

type CartItemProps = {
  product: Product;
  mode: string;
}

const CartItem: React.FC<CartItemProps> = ({ product, mode }) => {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(+(product.price.replace(",", "")));

  const cart = useSelector((state: StoreRootState) => state.cart.items);

  useEffect(() => {
    const relevantItem = cart.find(item => {
      return item.product._id === product._id
    })
    if (relevantItem) {
      const relevantQuantity = relevantItem.quantity
      setQuantity(relevantQuantity)
    }
  }, [cart, product._id])

  const updateQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(+event.target.value)
  }
  const updatePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(+event.target.value)
  }

  const dispatch = useDispatch();

  const saveCartItem = () => {
    dispatch(updateCart({ product, quantity, price }));
  }
  const deleteCartItem = () => {
    dispatch(removeFromCart(product._id));
  }

  return (
    <div className="w-full grid grid-cols-4 gap-4 items-center justify-items-start">
      <h3 className="block col-span-1 truncate">{product.name}</h3>
      <div className={(mode === "sale" ? "col-span-2" : "col-span-1") + " justify-self-stretch"}>
        <input type='number' value={quantity} onChange={updateQuantity} className="base-input px-2 w-full" />
      </div>
      {mode === "purchase" ? (
        <div className="col-span-1">
          <input type='number' value={price} onChange={updatePrice} className="base-input" />
        </div>
      ): null}
      <div className="col-span-1 flex gap-2 justify-around">
        <img src={saveIcon} alt='save' onClick={saveCartItem}
          className="aspect-square sm:w-[12%] w-[30%] hover:scale-105 cursor-pointer"/>
        <img src={deleteIcon} alt='save' onClick={deleteCartItem}
          className="aspect-square sm:w-[12%] w-[30%] hover:scale-105 cursor-pointer"/>
      </div>
    </div>
  )
}

export default CartItem;