import React, { useContext } from 'react'
import { UserContext } from "./context/user"

const ReviewItem = ({ review }) => {

  const { allUsers } = useContext(UserContext);

  const { rating, comment, ws_user_id, created_at } = review;

  const stars = Array.from({ length: rating }, (_, index) => (
    <span key={index} role="img" aria-label="star">
      ⭐
    </span>
  ));

  const user = allUsers?.find((user) => user.id === ws_user_id);

  const formattedDate = new Date(created_at).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="review-card">
      <div className="review-header">
        <strong>{user?.username}</strong>
        <div className="review-rating">{stars}</div>
      </div>
      <div className="review-date">{formattedDate}</div>
      <div className="review-content">
        <div className="review-comment">{comment}</div>
      </div>
    </div>
  );
}

export default ReviewItem;
