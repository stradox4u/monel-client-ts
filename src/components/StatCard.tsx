import React from "react";

import StatMeasureCard from "./StatMeasureCard";
import { PurchaseStats, SaleStats } from "../types";

type StatCardProps = {
  category: string;
  stats: PurchaseStats | SaleStats;
}

const StatCard: React.FC<StatCardProps> = ({ category, stats }) => {
  let thisWeekCountAmount, thisWeekVolumeAmount, thisWeekCountChange, thisWeekVolumeChange, purchasesValue;
  if ("purchasesData" in stats) {
    thisWeekCountAmount = stats.purchasesData.thisWeekData.purchasesCount;
    thisWeekVolumeAmount = stats.purchasesData.thisWeekData.purchasesUnits;
    thisWeekCountChange = stats.purchasesChange.weekCountChange.toFixed(2);
    thisWeekVolumeChange = stats.purchasesChange.weekVolumeChange.toFixed(2);
    purchasesValue = stats.purchasesData.thisWeekData.purchasesValue / 100;
  }
  
  let thisMonthCountAmount, thisMonthVolumeAmount, thisMonthCountChange, thisMonthVolumeChange, salesValue;
  if ("salesData" in stats) {
    thisMonthCountAmount = stats.salesData.thisMonthData.salesCount;
    thisMonthVolumeAmount = stats.salesData.thisMonthData.salesUnits;
    thisMonthCountChange = stats.salesChange.monthCountChange.toFixed(2);
    thisMonthVolumeChange = stats.salesChange.monthVolumeChange.toFixed(2);
    salesValue = stats.salesData.thisMonthData.salesValue / 100;
  }

  return (
    <div className='w-full rounded-md shadow-md p-8 mt-8'>
      <h2 className='font-montserrat text-xl text-monel-blue capitalize'>{category}</h2>
      <div className=''>
        <ul className='flex flex-col items-stretch gap-4 my-4'>
          <li className='bg-monel-gray rounded-md shadow-md w-full p-4'>
            <h3 className='font-montserrat font-light text-base'>This week</h3>
            <div className='flex flex-col gap-4'>
              <StatMeasureCard measure='Count' amount={thisWeekCountAmount || 0} change={thisWeekCountChange || "0"} />
              <StatMeasureCard measure='Volume' amount={thisWeekVolumeAmount || 0} change={thisWeekVolumeChange || "0"} />

              <div className='bg-monel-blue text-slate-200 p-2 rounded-md'>
                <div className='flex items-center justify-center'>
                  <h4 className='font-montserrat text-base'>Value:&nbsp;</h4>
                  <p className='font-montserrat text-xl'>{new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(purchasesValue || 0)}</p>
                </div>
              </div>
            </div>
          </li>

          <li className='bg-monel-gray rounded-md shadow-md w-full p-4'>
            <h3 className='font-montserrat font-light text-base'>This month</h3>
            <div className='flex flex-col gap-4'>
              <StatMeasureCard measure='Count' amount={thisMonthCountAmount || 0} change={thisMonthCountChange || "0"} />
              <StatMeasureCard measure='Volume' amount={thisMonthVolumeAmount || 0} change={thisMonthVolumeChange || "0"} />
              <div className='bg-monel-blue text-slate-200 p-2 rounded-md'>
                <div className='flex items-center justify-center'>
                  <h4 className='font-montserrat text-base'>Value:&nbsp;</h4>
                  <p className='font-montserrat text-xl'>{new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(salesValue || 0)}</p>
                </div>
              </div>
            </div>
          </li>


        </ul>
      </div>
    </div>
  )
}

export default StatCard;