import React from "react";
import { getCurrentUser, store } from "../../store";

const GreetingCard: React.FC = () => {
  const userObject = getCurrentUser(store.getState());
  return (
    <div className='w-full rounded-md shadow-md p-8'>
      <h2 className='font-montserrat text-3xl text-center'>Welcome, {userObject.firstName}!</h2>
      <h4 className='font-texturina text-xl text-center'>Pick up where you left off!</h4>
    </div>
  )
}

export default GreetingCard;