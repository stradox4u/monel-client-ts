import React from "react";
import spinner from "../assets/images/spinner.svg";

type BaseButtonProps = {
  buttonType: "button" | "submit" | "reset";
  buttonText: string;
  isLoading?: boolean;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const BaseButton: React.FC<BaseButtonProps> = ({ buttonType, buttonText, isLoading = false, handleClick }) => {
  return (
    <button type={buttonType}
      onClick={handleClick}
      className='w-full py-2 px-3 rounded-md shadow-md bg-monel-blue font-texturina text-lg 
      text-monel-gray transform hover:scale-105 relative disabled:opacity-75' disabled={isLoading}>
      {buttonText}
      {isLoading ? (<div className='absolute inset-y-1 right-3'>
        <img src={spinner} alt='spinner' className='aspect-square h-8 animate-spin'></img>
      </div>) : null}
    </button>
  )
}

export default BaseButton;