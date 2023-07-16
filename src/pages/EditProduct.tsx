import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BaseButton from "../components/BaseButton"
import { useFetchProductsQuery, useUpdateProductMutation } from "../../store";
import { ValidationErrors } from "../types";

const EditProduct: React.FC = () => {
  const { data } = useFetchProductsQuery();
  const { productId } = useParams<string>();
  const relevantProduct = data?.products.find(el => {
    return el._id === productId
  });
  const [productName, setProductName] = useState(relevantProduct?.name)
  const updateProductName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(event.target.value)
  }

  let initialPrice;
  if (relevantProduct?.price) {
    initialPrice = +(relevantProduct.price.replace(",", ""));
  }
  const [productPrice, setProductPrice] = useState(initialPrice);
  const updateProductPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductPrice(+event.target.value);
  }

  const productPictureRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);

  const [valError, setValError] = useState({
    name: "",
    price: "",
    picture: ""
  });
  const navigate = useNavigate();
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const submitUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const pic = productPictureRef.current?.files ? productPictureRef.current.files[0] : null;
    const formData = new FormData();
    formData.append("name", productName as string);
    formData.append("price", productPrice as unknown as string);
    if (pic) {
      formData.append("picture", pic);
    }

    try {
      if (!productId) throw new Error("No product ID");
      await updateProduct({ form: formData, productId: productId }).unwrap();
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
    <div className='sm:max-w-[60%] w-full mx-auto sm:p-8 p-2'>
      <h2 className='font-montserrat sm:text-3xl text-base font-semibold'>Edit Product</h2>
      <form onSubmit={submitUpdate} className='py-8 flex flex-col gap-5'>
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
        <div className="flex flex-col gap-2 items-stretch">
        <div className='flex gap-2 items-center justify-between'>
          <label htmlFor='productPicture' className='font-texturina text-xl'>Picture:</label>
          <input
            id='productPicture'
            type='file'
            className='w-[80%] rounded-md p-3 border border-monel-green focus:ring-2 focus:ring-monel-blue form-input'
            ref={productPictureRef}
          ></input>
        </div>
          {valError.picture ? (
            <p className='font-texturina text-base text-rose-600 text-left'>{valError.picture}</p>
          ) : <p className="font-texturina text-base text-left">Leave blank unless changing product picture!</p>}
        </div>
        <div className='mt-12'>
          <BaseButton buttonText='Submit' buttonType='submit' isLoading={isLoading} />
        </div>
      </form>
    </div>
  )
}

export default EditProduct;