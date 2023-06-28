import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import BaseButton from "../components/BaseButton";
import { useCreateProductMutation } from "../../store";
import { ValidationErrors } from "../types";

const CreateProduct: React.FC = () => {
  const [productName, setProductName] = useState("");
  const updateProductName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(event.target.value);
  }

  const [productPrice, setProductPrice] = useState(0);
  const updateProductPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductPrice(+event.target.value);
  }

  const productPictureRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
  const navigate = useNavigate();

  const [valError, setValError] = useState({
    name: "",
    price: "",
    picture: "",
  });
  const [createProduct, {isLoading}] = useCreateProductMutation();
  
  const submitProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    const pic = productPictureRef.current?.files ? productPictureRef.current.files[0] : null;
    formData.append("name", productName);
    formData.append("price", productPrice.toString());
    if (pic) {
      formData.append("picture", pic);
    }

    try {
      await createProduct(formData).unwrap();
      navigate("/");
    } catch (err: any) {
      if (err.status === 422) {
        const errorsArray = err.data.data.errors;
        const errorsObject: ValidationErrors = {} as ValidationErrors;
        errorsArray.forEach((error: any) => {
          errorsObject[(error.param as "name" | "price" | "picture")] = error.msg as string;
        });

        setValError(errorsObject);
      }
    }
  }
  return (
    <div className='max-w-[60%] mx-auto p-8'>
      <h2 className='font-montserrat text-3xl font-semibold'>Create Product</h2>
      <form onSubmit={submitProduct} className='py-8 flex flex-col gap-5'>
        <div className='flex flex-col gap-2 items-stretch'>
          <div className="flex gap-2 items-center justify-between">
            <label htmlFor='productName' className='font-texturina text-xl'>Name:</label>
            <input
              id='productName'
              type='text'
              placeholder='Product Name'
              required
              className='w-[80%] rounded-md p-3 border border-monel-green focus:ring-2 focus:ring-monel-blue'
              value={productName}
              onChange={updateProductName}
            ></input>
          </div>
          {valError.name ? (
            <p className='font-texturina text-base text-rose-600 text-left'>{valError.name}</p>
          ) : null}
        </div>
        <div className='flex flex-col gap-2 items-stretch'>
          <div className="flex gap-2 items-center justify-between">
            <label htmlFor='productPrice' className='font-texturina text-xl'>Price:</label>
            <input
              id='productPrice'
              type='number'
              required
              className='w-[80%] rounded-md p-3 border border-monel-green focus:ring-2 focus:ring-monel-blue'
              value={productPrice}
              onChange={updateProductPrice}
            ></input>
          </div>
          {valError.price ? (
            <p className='font-texturina text-base text-rose-600 text-left'>{valError.price}</p>
          ) : null}
        </div>
        <div className='flex flex-col gap-2 items-stretch'>
          <div className="flex gap-2 items-center justify-between flex-grow">
            <label htmlFor='productPicture' className='font-texturina text-xl'>Picture:</label>
            <input
              id='productPicture'
              type='file'
              required
              className='w-[80%] rounded-md p-3 border border-monel-green focus:ring-2 focus:ring-monel-blue form-input'
              ref={productPictureRef}
            ></input>
          </div>
          {valError.picture ? (
            <p className='font-texturina text-base text-rose-600 text-left'>{valError.picture}</p>
          ) : null}
        </div>
        <div className='mt-12'>
          <BaseButton buttonText='Submit' buttonType='submit' isLoading={isLoading} />
        </div>
      </form>
    </div>
  )
}

export default CreateProduct;