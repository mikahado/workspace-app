import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import ReviewItem from "./ReviewItem";
import ReviewAdd from "./ReviewAdd";
import Button from "@mui/material/Button";
import MapLocation from "./MapLocation";
import ServicesAdd from "./ServicesAdd";
import ServiceItemFull from "./ServiceItemFull"
import { UserContext } from "./context/user"

import { useNavigate  } from "react-router-dom";

const Workspace = () => {
  const [workspace, setWorkspace] = useState({
    reviews: [],
    services: [],
  });

  const { loggedIn } = useContext(UserContext)
  
  const navigate = useNavigate()
  const title = workspace?.title?.split(",")[0]
  const [showReview, setShowReview] = useState(false)
  const [showInfoForm, setShowInfoForm] = useState(false)
  
  const reviews = useRef(null)
  const details = useRef(null)
  const top = useRef(null)

  const scrollToDetails = () => {
    details.current.scrollIntoView({ behavior: 'smooth' })
  };

  const scrollToReviews = () => {
    reviews.current.scrollIntoView({ behavior: 'smooth' })
  };

  const scrollToTop = () => {
    top.current.scrollIntoView({ behavior: 'smooth' })
  };
  
  const params = useParams()

  useEffect(() => {
    fetch(`/api/workspaces/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setWorkspace(data);
      });
  }, []);

  // const handleDeleteReview = (id) => {
  //   fetch(`/api/reviews/${id}`, {
  //     method: "DELETE",
  //   }).then(() => onReviewDelete(id));
  // };

  // const onReviewDelete = (id) => {
  //   const updatedReviews = workspace.reviews.filter((w) => w.id !== id);
  //   setWorkspace({ ...workspace, reviews: updatedReviews });
  // };

  const handleAddReview = (newReview) => {
    setWorkspace({ ...workspace, reviews: [...workspace.reviews, newReview] });
  };

  // const handleEditReview = (editedReview) => {
  //   const updatedReviews = workspace.reviews.map((review) => {
  //     if (review.id === editedReview.id) {
  //       return editedReview;
  //     }
  //     return review;
  //   });
  //   setWorkspace({ ...workspace, reviews: updatedReviews });
  // };

  const reviewItems = workspace?.reviews
  ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  ?.map((w) => (
    <div key={w.id} className="review-item">
      <ReviewItem
        review={w}
        // onDeleteReview={handleDeleteReview}
        // onEditReview={handleEditReview}
        workspace_id={workspace.id}
      />
    </div>
  ))
  ?.reverse();




  const handleShowReviewClick = () => {
    setShowReview(!showReview);
    scrollToReviews()
  }

  const handleInfoToggleClick = () => {
    setShowInfoForm(!showInfoForm);
  }

  if (workspace?.services?.length === 0) {
    return (
      <div>
        <h1>≡🬀 {title} 🬀≡</h1>
        <br />
        <h3>This is a new Workspace!</h3>
        <h3>This workspace needs details.</h3>
        <Button variant="outlined" onClick={handleInfoToggleClick}>
          Add Details
        </Button>
        {showInfoForm ? (
          <ServicesAdd id={workspace.id} toggle={handleInfoToggleClick} setWorkspace={setWorkspace} />
        ) : null}
        <br /> <br />
        <MapLocation lat={workspace?.lat} lng={workspace?.lng} />
        <br /> <br />
        <div className="review-container">

      <h2 className="titles">Reviews</h2>
      <Button variant="outlined" onClick={handleShowReviewClick} >
        Write a review
      </Button>
      <br />
      {showReview ? (
        <ReviewAdd
          key={workspace.id}
          onAddReview={handleAddReview}
          reviews={workspace?.reviews}
          workspace_id={workspace.id}
          showReview={handleShowReviewClick}
        />
      ) : null}
      {reviewItems}

    </div>
    

    <br /> <br /><br /> <br />
    <div ref={reviews}></div>
      </div>
    );

  } else {

    return (
      <div>
        <br/>
        <h2>≡ {title} ≡</h2>
        <h4>{workspace?.services[0]?.category}</h4>
        <div className="workspace-nav">
        <Button variant="text" onClick={scrollToDetails}>
          Details
        </Button>   
        <Button variant="text" onClick={scrollToReviews}>
          Reviews
        </Button>
        </div>
        <MapLocation lat={workspace?.lat} lng={workspace?.lng} />
        <br />
        <br />
        <div ref={details}></div>
        <br/>
        <div className="details-container">
        <h2 className="titles">Details</h2>
     
        <ServiceItemFull service={workspace.services}/>

        </div>
        <br/>
        <div ref={reviews}></div>
        
        <br />
        <div  className="review-container">
        <h2 className="titles">Reviews</h2>
        
     
          <Button variant="outlined" onClick={handleShowReviewClick}>Write a review</Button>  
        
        
        {showReview ? (
          <ReviewAdd
            key={workspace.id}
            onAddReview={handleAddReview}
            reviews={workspace?.reviews}
            workspace_id={workspace.id}
            showReview={handleShowReviewClick}
          />
        ) : null}
        {reviewItems}
        </div>    
        <br/>
        {/* <Button onClick={handleWorkspaceDeleteClick} variant="outlined" color="error">
        Delete Workspace
      </Button> */}
      <br/> <br/> <br/> <br/>
       </div>
    );
  }
};

export default Workspace;
