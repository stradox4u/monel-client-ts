import React from "react";

import upArrow from "../assets/images/upArrow.svg";
import downArrow from "../assets/images/downArrow.svg";

type StatMeasureCardProps = {
  measure: string;
  amount: number;
  change: string;
}

const StatMeasureCard: React.FC<StatMeasureCardProps> = ({ measure, amount, change }) => {
  return (
    <div className='bg-monel-blue text-slate-200 p-2 rounded-md'>
      <div className='inline-flex items-center'>
        <h4 className='font-montserrat text-base'>{measure}{measure === "Volume" ? " (crates)" : null}:&nbsp;</h4>
        <p className='font-montserrat text-xl'>{amount}</p>
      </div>
      <div className='flex justify-end gap-3 items-baseline'>
        <div className='aspect-square h-3'>
          {
            +change > 0 ? (
              <img src={upArrow} alt='changeArrow'></img>
            ) : (
              <img src={downArrow} alt='changeArrow'></img>
            )
          }
        </div>
        <span className='font-montserrat text-base'>{change}%</span>
      </div>
    </div>
  )
}

export default StatMeasureCard;