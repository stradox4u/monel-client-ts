import React from "react";
import { useFetchStatsQuery } from "../../store";
import { StatData } from "../types";

import GreetingCard from "../components/GreetingCard";
import StatCard from "../components/StatCard";
import spinner from "../assets/images/spinner.svg"

const LandingPage: React.FC = () => {
  const { data, isLoading } = useFetchStatsQuery(null);

  if (!isLoading) {
    const { purchasesData, salesData }: StatData = data;
  
    const purchasesChange = {
      weekCountChange: purchasesData?.thisWeekData.purchasesCount > 0 ? ((purchasesData?.thisWeekData.purchasesCount - purchasesData?.lastWeekData.purchasesCount) / purchasesData?.thisWeekData.purchasesCount) * 100 : 0,
      weekVolumeChange: purchasesData?.thisWeekData.purchasesUnits > 0 ? ((purchasesData?.thisWeekData.purchasesUnits - purchasesData?.lastWeekData.purchasesUnits) / purchasesData?.thisWeekData.purchasesUnits) * 100 : 0,
      monthCountChange: purchasesData?.thisMonthData.purchasesCount > 0 ? ((purchasesData?.thisMonthData.purchasesCount - purchasesData?.lastMonthData.purchasesCount) / purchasesData?.thisMonthData.purchasesCount) * 100 : 0,
      monthVolumeChange: purchasesData?.thisMonthData.purchasesUnits > 0 ? ((purchasesData?.thisMonthData.purchasesUnits - purchasesData?.lastMonthData.purchasesUnits) / purchasesData?.thisMonthData.purchasesUnits) * 100 : 0
    }
  
    const salesChange = {
      weekCountChange: salesData?.thisWeekData.salesCount > 0 ? ((salesData?.thisWeekData.salesCount - salesData?.lastWeekData.salesCount) / salesData?.thisWeekData.salesCount) * 100 : 0,
      weekVolumeChange: salesData?.thisWeekData.salesUnits > 0 ? ((salesData?.thisWeekData.salesUnits - salesData?.lastWeekData.salesUnits) / salesData?.thisWeekData.salesUnits) * 100 : 0,
      monthCountChange: salesData?.thisMonthData.salesCount > 0 ? ((salesData?.thisMonthData.salesCount - salesData?.lastMonthData.salesCount) / salesData?.thisMonthData.salesCount) * 100 : 0,
      monthVolumeChange: salesData?.thisMonthData.salesUnits > 0 ? ((salesData?.thisMonthData.salesUnits - salesData?.lastMonthData.salesUnits) / salesData?.thisMonthData.salesUnits) * 100 : 0
    }
  
    const purchasesStats = { purchasesData, purchasesChange }
    const salesStats = { salesData, salesChange }
  
    return (
      <>
        <GreetingCard />
        {
          isLoading ? (<div className="w-full">
            <img src={spinner} alt='spinner' className='aspect-square h-32 animate-spin mt-16 mx-auto'></img>
          </div>)
            : (<div className='flex justify-between gap-4 items-stretch'>
              <StatCard category='purchases' stats={purchasesStats} />
              <StatCard category='sales' stats={salesStats} />
            </div>)
        }
      </>
    );
  }
}

export default LandingPage;