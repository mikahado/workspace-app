import React, { useState, useContext } from 'react';
import { UserContext } from "./context/user";
import {Link} from 'react-router-dom'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ReviewsUserItem from './ReviewsUserItem'
import ReviewEdit from './ReviewEdit';
import ReviewItem from './ReviewItem';



const ReviewsUserArchive = ({ onEditReview }) => {

  const { user, onDeleteReview } = useContext(UserContext);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  const reviewItems = user?.reviews?.map((review) => (
    <ReviewsUserItem key={review.id} review={review}/>
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
      <br/><br/>
      <div className="home">
      <h2>Review Archive</h2>
      {reviewItems}</div>
      
      {showEditor && (
        <ReviewEdit key={selectedReviewId} id={selectedReviewId} onEditReview={onEditReview} />
      )}
    </div>
  );
};

export default ReviewsUserArchive;
