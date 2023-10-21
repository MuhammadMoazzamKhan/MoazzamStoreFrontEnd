import './CartDetails.css'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-stars';
import { productDetailsRequest, productDetailsSeccess, productDetailsFail } from '../../reduxStore/slice/ProductDetailSlice'
import ImageSlider from './Slider/ImageSlider';
import ReviewCard from "./ReviewCard"
import Loading from '../Loader/Loading';


const CartDetails = () => {
  const { product ,loading } = useSelector(state => state.productDetails)
  const { description,Stock, images, reviews, price, name, category,_id ,numOfReviews,ratings } = product;
  const { id } = useParams();
  console.log(images)
  const dispatch = useDispatch()

  const getProductDetails = async () => {
    try {
      await dispatch(productDetailsRequest())
      const { data } = await axios(`http://localhost:8000/api/v1//product/${id}`)
      await dispatch(productDetailsSeccess({ product: data.product }))
    } catch (error) {
      console.log(error)
      dispatch(productDetailsFail({ error: error.response.data }))
    }
  }
  useEffect(() => {
    getProductDetails()
  }, [dispatch])


  return (
    <>
    {loading ? <Loading /> :
    (<>
      <div className="cartDetails">
        <div>
        <ImageSlider images={images} />
        </div>
        <div>
          <div className="detailsBlock-1">
            <h2>{name}</h2>
            <p>Product # {_id}</p>
          </div>
          <div className="detailsBlock-2">
          <ReactStars
                edit={false}
                value={ratings || 3.5}
                size={20}
              />
              &nbsp;
            <span>({numOfReviews} Reviews)</span>
          </div>
          <div className="detailsBlock-3">
            <h1>{`Rs.${price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button>-</button>
                <input type='email' value={1}  />
                <button>+</button>
              </div>
              <button>Add to Cart</button>
            </div>
            <p>
              Status:{" "}
              <b className={Stock < 1 ? "redColor" : "greenColor"}>
                {Stock < 1 ? "OutOfStock":"InStock"}
              </b>
            </p>
          </div>
  
          <div className="detailsBlock-4">
            Description : <p>{description}</p>
          </div>
  
          <button className='submitReview'>Submit Review</button>
        </div>
      </div>
      <h3 className='reviewHeading' >REVIEWS</h3>
        {reviews && reviews[0] ? (
          <div className='reviews'>
          {reviews && reviews.map((review)=> <ReviewCard review={review} />)}
          </div>
          ) : (
            <p className='noReviews'>No Reviews Yet </p>
          )}
      </>
      )}
    </>
  )
}

export default CartDetails
