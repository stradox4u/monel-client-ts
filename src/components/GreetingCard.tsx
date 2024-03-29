import React from "react";
import { getCurrentUser, store } from "../../store";

const GreetingCard: React.FC = () => {
  const userObject = getCurrentUser(store.getState());
  return (
    <div className='w-full rounded-md shadow-md p-8'>
      <h2 className='font-montserrat sm:text-3xl text-base text-center'>Welcome, {userObject.firstName}!</h2>
      <h4 className='font-texturina sm:text-xl text-base text-center'>Pick up where you left off!</h4>
    </div>
  )
}

export default GreetingCard;