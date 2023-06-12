import React, {useState} from 'react'

const ReviewEdit = ({onEditReview, id}) => {

  const [updatedReview, setUpdatedReview] = useState("")


  const handleEditSubmit = (e) => {
    e.preventDefault()

    fetch(`http://localhost:9292/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comment: updatedReview
      })
    })
    .then(r => r.json())
    .then(data => onEditReview(data))
  }

  const handleChange = (e) => {
    setUpdatedReview(e.target.value);
  }
  
  return (
    <div>
      <br />
      <form onSubmit={handleEditSubmit}>
        <input type="text" placeholder="Edit review" onChange={handleChange} value={updatedReview} />
        <br /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ReviewEdit