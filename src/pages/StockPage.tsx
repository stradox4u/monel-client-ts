import React from "react";
import { useSelector } from "react-redux";
import { StoreRootState, useFetchProductsQuery } from "../../store";

import ProductCard from "../components/ProductCard";
import { Product } from "../types";

const StockPage: React.FC = () => {
  const { isLoading } = useFetchProductsQuery(null);
  const products = useSelector((state: StoreRootState) => state.search.filteredProducts);


  const productsArray = !isLoading ? (
    products.map((product: Product) => {
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