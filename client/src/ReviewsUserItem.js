import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";


import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const ReviewsUserArchive = ({ review }) => {
  const { onDeleteReview, updateMyReview } = useContext(UserContext);
  const [showEditor, setShowEditor] = useState(false);
  const [editedComment, setEditedComment] = useState(review.comment);

  const { id, rating, comment, ws_user_id, created_at, workspace_title } = review;

  const handleDeleteClick = (id) => {
    onDeleteReview(id);
  };

  const stars = Array.from({ length: rating }, (_, index) => (
    <span key={index} role="img" aria-label="star">
      ⭐
    </span>
  ));

  const formattedDate = new Date(created_at).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleUpdateMyReview = () => {
    const updatedReview = { ...review, comment: editedComment };
    updateMyReview(updatedReview);
    setShowEditor(false);
  };

  const handleInputChange = (e) => {
    setEditedComment(e.target.value);
  };

  return (
    <>
      <div key={id} className="review-card">
        <Link to={`/workspaces/${review.workspace_id}`}>
          <h3>{workspace_title}</h3>
        </Link>

        <div className="review-header">
          <div className="review-rating">{stars}</div>
        </div>
        <div className="review-date">{formattedDate}</div>
        <div className="review-content">
          {showEditor ? (
            <form>
              <TextField
                className="textarea"
                type="text"
                name="comment"
                value={editedComment}
                onChange={handleInputChange}
              />
              <br/>
              <Button type="submit" onClick={handleUpdateMyReview}>
                Save
              </Button>
            </form>
          ) : (
            <div className="review-comment">{comment}</div>
          )}
        </div>

        <div className="review-actions">
          <DeleteOutlineOutlinedIcon
            onClick={() => handleDeleteClick(id)}
          />
          <ModeEditIcon onClick={() => setShowEditor(!showEditor)} />
        </div>
      </div>
    </>
  );
};

export default ReviewsUserArchive;
