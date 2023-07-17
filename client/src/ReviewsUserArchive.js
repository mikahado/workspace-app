import React, { useState, useContext } from 'react';
import { UserContext } from "./context/user";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ReviewEdit from './ReviewEdit';
import ReviewItem from './ReviewItem';

const ReviewsUserArchive = ({ onDeleteReview, onEditReview }) => {
  const { user } = useContext(UserContext);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  const reviewItems = user?.reviews?.map((review) => (
    <div key={review.id} className="review-card">
      <ReviewItem review={review} />
      <div className="review-actions">
        <DeleteOutlineOutlinedIcon onClick={() => handleDeleteClick(review.id)} />
        <ModeEditIcon onClick={() => handleShowEditor(review.id)} />
      </div>
    </div>
  ));

  const handleShowEditor = (id) => {
    setSelectedReviewId(id);
    setShowEditor(true);
  };

  const handleDeleteClick = (id) => {
    onDeleteReview(id);
  };

  return (
    <div>
      <h2>Reviews User Archive</h2>
      {reviewItems}
      {showEditor && (
        <ReviewEdit key={selectedReviewId} id={selectedReviewId} onEditReview={onEditReview} />
      )}
    </div>
  );
};

export default ReviewsUserArchive;
