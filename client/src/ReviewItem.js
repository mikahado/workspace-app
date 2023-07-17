import React, { useState, useRef, useContext } from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ReviewEdit from './ReviewEdit'
import { UserContext } from "./context/user"

const ReviewItem = ({ review, onDeleteReview, onEditReview }) => {
  const [showEditor, setShowEditor] = useState(false);
  const { allUsers } = useContext(UserContext);

  const { id, rating, comment, ws_user_id, created_at } = review;

  const handleShowEditor = () => {
    setShowEditor(!showEditor);
  }

  const handleDeleteClick = () => {
    onDeleteReview(id);
  }

  const stars = Array.from({ length: rating }, (_, index) => (
    <span key={index} role="img" aria-label="star">
      ⭐
    </span>
  ));

  const user = allUsers?.find((user) => user.id === ws_user_id);
  const username = user ? user.username : 'Anon';

  const formattedDate = new Date(created_at).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="review-card">
      <div className="review-header">
        <strong>{username}</strong>
        <div className="review-rating">{stars}</div>
      </div>
      <div className="review-date">{formattedDate}</div>
      <div className="review-content">
        <div className="review-comment">{comment}</div>
      </div>
      {/* <div className="review-actions">
        <DeleteOutlineOutlinedIcon onClick={handleDeleteClick} />
        <ModeEditIcon onClick={handleShowEditor} />
      </div>
      {showEditor && (
        <ReviewEdit
          key={id}
          id={id}
          onEditReview={onEditReview}
        />
      )} */}
    </div>
  );
}

export default ReviewItem;
