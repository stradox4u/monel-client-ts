import React from "react";
import cartIcon from "../assets/images/cartIcon.svg";
import { Product } from "../types";

type ProductMiniCardProps = {
  product: Product,
  addProductToCart: (product: Product) => void
}

const ProductMiniCard: React.FC<ProductMiniCardProps> = ({ product, addProductToCart }) => {
  return (
    <div
      onClick={() => addProductToCart(product)}
      className="col-span-1 w-full shadow-md flex justify-between items-center cursor-pointer transform hover:scale-105 rounded-r-md pr-2">
      <img src={product.picture} alt='product' className='max-w-[20%] aspect-square object-cover'></img>
      <h3 className="font-montserrat sm:text-sm text-xs font-normal truncate">{product.name}</h3>
      <img src={cartIcon} alt='cart' className="aspect-square sm:max-w-[15%] max-w-[10%]"></img>
    </div>
  )
}

export default ProductMiniCard;