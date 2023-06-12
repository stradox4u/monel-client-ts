import React from "react";
import { useFetchProductsQuery } from "../../store";

import ProductCard from "../components/ProductCard";
import { Product } from "../types";

const StockPage: React.FC = () => {
  const { data, isLoading } = useFetchProductsQuery(null);


  const productsArray = !isLoading ? (
    data.products.map((product: Product) => {
      return (
        <ProductCard product={product} showStock={true} key={product._id} />
      )
   })
 ): (
    <div>Loading...</div>
  )


  return (
    <div className="mx-auto mt-12 grid grid-cols-3 gap-4">
      {productsArray}
    </div>
  )
}

export default StockPage;