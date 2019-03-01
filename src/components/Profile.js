import React from 'react'
import EditReviewForm from './EditReviewForm'

export default class Profile extends React.Component {

  state = {
    showModal: false,
    rating: 0,
    content: "",
    currentUserReviews: [],
    currentReview: {}
  }


  setColor = (rating) => {
    if (rating === 5) {
      return "blue"
    } else if (rating === 4) {
      return "green"
    } else if (rating === 3) {
      return "orange"
    } else if (rating === 2) {
      return "yellow"
    } else if (rating === 1) {
      return "red"
    } else {
      return "black"
    }
  }

  showEditReviewModal = (e) => {
    const currentReview = this.props.currentUserReviews.find( review => review.id == e.target.id)
    const content = currentReview.content
    const rating = currentReview.rating
    this.setState({
      showModal: !this.state.showModal,
      content,
      rating,
      currentReview })
  }

  // currentUserReviews = () => {
  //   this.props.allReviews.filter( review => review.user_id === this.props.currentUser.id)
  // }

  hideEditReviewModal = (e) => {
    e.preventDefault()
    this.setState({ showModal: !this.state.showModal })
  }

  changeRating = ( newRating ) => {
    this.setState({
      rating: newRating
    })
  }

  handleFormChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log(this.state.rating, this.state.content, this.state.currentReview.id, this.props.allReviews, this.props.currentUser.id))
  }

  handleEditReviewSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3001/api/v1/reviews/${this.state.currentReview.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        rating: this.state.rating,
        content: this.state.content
      })
    })
    .then( resp => resp.json())
    .then( updatedReview => this.props.editReview(updatedReview))
  }


  render() {
    return (
      <div className="profile-wrapper">
        <div></div>
        <div className="single-review-container">
          {this.props.currentUserReviews.map(review => {
            const college = this.props.allColleges.find( college => college.id === review.college_id)
            const category = this.props.allCategories.find( category => category.id === review.category_id)
            return (
              <div className="single-review-container">

                <div className="ui message info">
                  <div className="header">
                  <p style={{textAlign:"left"}}>
                    {college.name}
                    <span style={{float: "right"}}>
                      <i onClick={() => this.props.deleteReview(review.id)} className="window close outline large icon red"></i>
                    </span>
                     <br/> Category: {category.title}
                    <span style={{float:"right"}} className="dot"><p className="circle-rating" style={{color: this.setColor(review.rating)}}>{review.rating}</p></span>
                  </p><br/>
                    <p style={{width: "70%", textAlign: "left"}}>{review.content}</p>
                  </div><br/>
                  <p style={{textAlign: "left"}}>
                    {review.updated_at.split("T")[0]}
                    <span style={{float: "right"}}>
                      <i id={review.id} onClick={(e) => this.showEditReviewModal(e)} className="edit outline large icon blue"></i>
                    </span>
                  </p>
                </div>
                <br/>
              </div>
            )
          })}
          <br/>
        </div>
        <EditReviewForm
          key={this.state.currentReview.id}
          show={this.state.showModal}
          handleClose={this.hideEditReviewModal}
          currentReview={this.state.currentReview}
          rating={this.state.rating}
          content={this.state.content}
          handleFormChange={this.handleFormChange}
          changeRating={this.changeRating}
          handleEditReviewSubmit={this.handleEditReviewSubmit}
        />
      </div>
    )
  }
}
