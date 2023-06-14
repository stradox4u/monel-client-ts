import React from "react";
import PurchaseListItem from "./PurchaseListItem";
import spinner from "../assets/images/spinner.svg";
import { useGetPurchasesQuery, useGetSalesQuery } from "../../store";
import { Transactions } from "../types";

const TransactionsList: React.FC<{ mode: "purchases" | "sales" }> = ({ mode }) => {
  const relevantHook = mode === "purchases" ? useGetPurchasesQuery : useGetSalesQuery;
  const { data, isLoading, error } = relevantHook();

  let list;
  if (!isLoading && !error) {
    list = (data as Transactions<typeof mode>)[mode].map(entry => {
      return (
        <PurchaseListItem item={entry} key={entry._id} />
      )
    })
  }
  return (
    <div>
      <hr></hr>
      {error ? <span className="font-texturina text-lg text-red-500">An Error Occured!</span> : null}
      {isLoading && !error ? (<div className="w-full">
        <img src={spinner} alt='spinner' className='aspect-square h-16 animate-spin mt-8 mx-auto'></img>
      </div>) : list}
    </div>
  )
}

export default TransactionsList;