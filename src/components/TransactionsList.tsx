import React from "react";
import TransactionListItem from "./TransactionListItem";
import spinner from "../assets/images/spinner.svg";
import { useGetPurchasesQuery, useGetSalesQuery } from "../../store";
import { Transactions } from "../types";

const TransactionsList: React.FC<{ mode: "purchases" | "sales" }> = ({ mode }) => {
  const relevantHook = mode === "purchases" ? useGetPurchasesQuery : useGetSalesQuery;
  const { data, isLoading, error } = relevantHook();

  let list;
  if (!isLoading && !error) {
    const copiedData = (data as Transactions<typeof mode>)[mode].slice();
    copiedData.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    list = copiedData.map(entry => {
      return (
        <TransactionListItem item={entry} key={entry._id} />
      )
    });
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