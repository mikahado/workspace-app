import React, { useState, useContext } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

import { UserContext } from "./context/user";

const ReviewAdd = ({
  workspace_id,
  onAddReview,
  scrollToBottom,
  showReview,
}) => {
  const { user, onAddReviewToArchive } = useContext(UserContext);

  const [review, setReview] = useState({
    ws_user_id: user.id,
    rating: 4,
    comment: "",
    workspace_id: workspace_id,
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      ws_user_id: user.id,
      rating: review.rating,
      comment: review.comment,
      workspace_id: review.workspace_id,
    };

    fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((r) => r.json())
      .then((newData) => {
        onAddReview(newData);
        onAddReviewToArchive(newData)
        showReview(false);
      });
  };

  const handleChangeReview = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleChangeRating = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <form onSubmit={handleReviewSubmit}>
        <br />
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <Typography component="legend">Your Rating</Typography>
          <Rating
            name="simple-controlled"
            value={review.rating}
            onChange={(event, newValue) => {
              setReview({ ...review, rating: newValue });
            }}
          />
          <br />
          <br />
          <TextField
            id="outlined-multiline-static"
            label="Your Review"
            onChange={handleChangeReview}
            value={review.comment}
            multiline
            rows={4}
            defaultValue="Default Value"
            name="comment"
          />
        </Box>

        <br />

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
      <br />
      <hr />
    </div>
  );
};

export default ReviewAdd;
