import React, { useState, useRef } from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ReviewEdit from './ReviewEdit'

const ReviewItem = ({review, onDeleteReview, onEditReview}) => {

  const [showEditor, setShowEditor] = useState(false)
  // const [edit, setEdit] = useState({
  //   comment: ""
  // })

  const {id, rating, comment} = review 

  const handleShowEditor = () => {
    setShowEditor(!showEditor)
  }

  const handleDeleteClick = () => {
      onDeleteReview(id)
    }

  // const handleEditSubmit = (e) => {
  //   e.preventDefault()
  //   fetch(`http://localhost:9292/reviews/${id}`, {
  //     method: "PATCH",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(edit)
  //   })
  //   .then(r => r.json())
  //   .then(editedReview => (onEditReview(editedReview)))
  // }

  const stars = Array.from({ length: rating }, (_, index) => (
    <span key={index} role="img" aria-label="star">
      ⭐
    </span>
  ));
 
  return (

    <div>
      <br/><br/>
      <div className="review-card">
          <b>User_{Math.floor(Math.random() * 100)}</b> 
          {stars} 
          <div>
          {comment}
          </div>
          {/* <DeleteOutlineOutlinedIcon onClick={handleDeleteClick} />
          <ModeEditIcon onClick={handleShowEditor}/> */}

          {/* {showEditor 
            ? <ReviewEdit 
                key={id} 
                id={id} 
                onEditReview={onEditReview}
                />
            : null 
          } */}
          
        </div>
     </div>         
  )
}

export default ReviewItem