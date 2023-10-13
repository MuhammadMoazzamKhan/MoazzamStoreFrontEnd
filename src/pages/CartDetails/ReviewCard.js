import React from 'react'
import './ReviewCard.css'
import ReactStars from 'react-stars';
import profilePng from '../../Images/profile-circle-icon-2048x2048-cqe5466q.png'

const ReviewCard = ({ review }) => {
    const { name, rating,comment } = review
    return (
        <div className='reviewCard'>
            <img src={profilePng} alt="User" />
            <p>{name}</p>
            <ReactStars
                edit={false}
                value={rating || 3.5}
                size={20}
            />
            <span>{comment}</span>
        </div>
    )
}

export default ReviewCard
