import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ReviewItem from "./ReviewItem";
import ReviewAdd from "./ReviewAdd";
import Button from "@mui/material/Button";
import MapLocation from "./MapLocation";
import ServicesAdd from "./ServicesAdd";
import { useNavigate  } from "react-router-dom";

const Workspace = () => {
  const [workspace, setWorkspace] = useState({
    reviews: [],
    services: [],
  });
  const navigate = useNavigate()
  const title = workspace?.title?.split(",")[0]
  const [showReview, setShowReview] = useState(false)
  const [showInfoForm, setShowInfoForm] = useState(false)
  const bottomReview = useRef(null)

  const scrollToBottom = () => {
    bottomReview.current.scrollIntoView({ behavior: 'smooth' })
  };
  

  const params = useParams()

  useEffect(() => {
    fetch(`/api/workspaces/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setWorkspace(data);
      });
  }, []);

  const handleDeleteReview = (id) => {
    fetch(`/api/reviews/${id}`, {
      method: "DELETE",
    }).then(() => onReviewDelete(id));
  };

  const onReviewDelete = (id) => {
    const updatedReviews = workspace.reviews.filter((w) => w.id !== id);
    setWorkspace({ ...workspace, reviews: updatedReviews });
  };

  const handleAddReview = (newReview) => {
    setWorkspace({ ...workspace, reviews: [...workspace.reviews, newReview] });
  };

  const handleEditReview = (editedReview) => {
    const updatedReviews = workspace.reviews.map((review) => {
      if (review.id === editedReview.id) {
        return editedReview;
      }
      return review;
    });
    setWorkspace({ ...workspace, reviews: updatedReviews });
  };

  const reviewItems = workspace?.reviews?.map((w) => (
    <ReviewItem
      key={w.id}
      review={w}
      onDeleteReview={handleDeleteReview}
      onEditReview={handleEditReview}
      workspace_id={workspace.id}
      scrollToBottom={scrollToBottom}
    />
  ))

  const handleShowReviewClick = () => {
    setShowReview(!showReview);
  }

  const handleInfoToggleClick = () => {
    setShowInfoForm(!showInfoForm);
  }

  const handleWorkspaceDeleteClick = () => {
    handleDeleteWorkspace(workspace.id);
  }

  const handleDeleteWorkspace = (id) => {
    console.log(id)
    fetch(`/api/workspaces/${id}`, {
      method: "DELETE",
    })
      .then(() => onWorkspaceDelete(id))
      .catch((error) => {
        console.log("Error deleting workspace!!", error);
      });
      navigate('/workspaces')
      alert(`You have deleted the workspace!`)
  };

  const onWorkspaceDelete = (id) => {
    setWorkspace({});   
  }


  if (workspace?.services?.length === 0) {
    return (
      <div>
        <h1>≡🬀 {title} 🬀≡</h1>
        <br />
        <p>This workspace needs details!</p>
        <Button variant="outlined" onClick={handleInfoToggleClick}>
          Add Info
        </Button>
        {showInfoForm ? (
          <ServicesAdd id={workspace.id} toggle={handleInfoToggleClick} setWorkspace={setWorkspace} />
        ) : null}
        <br />
        <br />
        <MapLocation lat={workspace?.lat} lng={workspace?.lng} />
        <br />
        <br />
        [services]
        <br />
        <h2>Reviews</h2>
        <Button variant="outlined" onClick={handleShowReviewClick}>
          Write a Review
        </Button>
        <br />
        {showReview ? (
          <ReviewAdd
            key={workspace.id}
            onAddReview={handleAddReview}
            reviews={workspace?.reviews}
            workspace_id={workspace.id}
            scrollToBottom={scrollToBottom}
            showReview={handleShowReviewClick}
          />
        ) : null}
        <br />
        <hr />
        {reviewItems}
        {/* <Button onClick={handleWorkspaceDeleteClick} variant="outlined" color="error">
        Delete Workspace
      </Button> */}
        <div ref={bottomReview}></div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>≡🬀 {title} 🬀≡</h1>
        <br/>
        <h3>{workspace?.services[0]?.category}</h3>
        <br />
        <p>Description: {workspace?.services[0]?.description}</p>
        <br/>

        <MapLocation lat={workspace?.lat} lng={workspace?.lng} />
        <br />
        <h2>Reviews</h2>
        <Button variant="outlined" onClick={handleShowReviewClick}>
          Write a Review
        </Button>
        <br />
        {showReview ? (
          <ReviewAdd
            key={workspace.id}
            onAddReview={handleAddReview}
            reviews={workspace?.reviews}
            workspace_id={workspace.id}
            scrollToBottom={scrollToBottom}
            showReview={handleShowReviewClick}
          />
        ) : null}
        <br />
        <hr />
        <br />
        {reviewItems}
        <br />
        <hr/>
        <br/>
        {/* <Button onClick={handleWorkspaceDeleteClick} variant="outlined" color="error">
        Delete Workspace
      </Button> */}
      <br/> <br/> <br/> <br/>
      <div ref={bottomReview}></div>
      </div>
    );
  }
};

export default Workspace;
