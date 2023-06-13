import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import ReviewItem from './ReviewItem'
import ReviewAdd from './ReviewAdd'
import Button from '@mui/material/Button';

const Workspace = () => {

    const [workspace, setWorkspace] = useState({
      reviews: [],
      services: []
    })

    // console.log(workspace)

    const [showReview, setShowReview] = useState(false)

    const params = useParams()

    useEffect(() => {
        fetch(`/api/workspaces/${params.id}`)
        .then(r => r.json())
        .then(data => {
            setWorkspace(data)
        })
    }, [])

    const handleDeleteReview = (id) => {
    fetch(`/api/reviews/${id}`, {
      method: "DELETE",
    })
      .then(() => onReviewDelete(id))
    }

    const onReviewDelete = (id) => {
      const updatedReviews = workspace.reviews.filter((w) => w.id !== id)
      setWorkspace({...workspace, reviews: updatedReviews});
    }

    const handleAddReview = (newReview) => {
    setWorkspace({...workspace, reviews: [...workspace.reviews, newReview]})
    }

    const handleEditReview = (editedReview) => {
       const updatedReviews = workspace.reviews.map((review) => {
        if (review.id === editedReview.id) {
          return editedReview;
        }
        return review
      })
      setWorkspace({ ...workspace, reviews: updatedReviews });
    }
    const reviewItems = workspace?.reviews?.map(w => 
      <ReviewItem 
          key={w.id} 
          review={w} 
          onDeleteReview={handleDeleteReview} 
          onEditReview={handleEditReview} 
          workspace_id={workspace.id} /> )

    const handleShowReviewClick = () => {
        setShowReview(!showReview)
      }

  return (

    <div>

        <h1>≡🬀 {workspace.title} 🬀≡</h1>
        {workspace?.address}
        <br /><br />
            [map]
        <br /><br />
        [services]
        <br />
        <h2>Reviews</h2>
        <Button variant="outlined" onClick={handleShowReviewClick}>Write a Review</Button>
              <br />

        {showReview ? <ReviewAdd key={workspace.id} onAddReview={handleAddReview} reviews={workspace?.reviews} workspace_id={workspace.id} /> : null}
        <br />
        < hr />

        {reviewItems}

    </div>
  )
}

export default Workspace