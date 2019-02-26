import React from 'react'
import EditReviewForm from './EditReviewForm'

export default class Profile extends React.Component {

  state = {
    showModal: false,
    rating: 0,
    content: "",
    currentReview: {},
    edittedRating: 0,
    edittedContent: ""
  }

  handleEditReviewSubmit = (review, e) => {
    e.preventDefault()
    fetch(`http://localhost:3001/api/v1/reviews/${review.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        rating: this.state.edittedRating,
        content: this.state.edittedContent
      })
    })
    .then( resp => resp.json())
    .then( () => {
      this.setState({ showModal: !this.state.showModal })
    })
  }

  showEditReviewModal = (e) => {
    const currentReview = this.props.currentUserReviews.find( review => review.id == e.target.id)
    const content = currentReview.content
    const rating = currentReview.rating
    this.setState({ showModal: !this.state.showModal, content, rating, currentReview })
  }

  hideEditReviewModal = (e) => {
    e.preventDefault()
    this.setState({ showModal: !this.state.showModal })
  }

  changeRating = ( newRating ) => {
    this.setState({
      edittedRating: newRating
    })
  }

  handleFormChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log(this.state.edittedRating, this.state.edittedContent))
  }

  render() {
    return (
      <div className="profile-wrapper">
        <h1 className="profile-header">{this.props.currentUser.username}'s reviews:</h1>
        <div className="single-review-container">
          {this.props.currentUserReviews.map(review => {
            const college = this.props.allColleges.find( college => college.id == review.college_id)
            const category = this.props.allCategories.find( category => category.id == review.category_id)
            return (
              <div className="single-review-container">
                <div className="ui message">
                  <div className="header">
                  <p style={{textAlign:"left"}}>
                    {college.name}: {category.title}
                    <span style={{float: "right"}}>
                      <i onClick={() => this.props.deleteReview(review.id)} className="window close outline large icon red"></i>
                    </span>
                  </p><br/>
                    {review.content}
                  </div><br/>
                  <p style={{textAlign: "left"}}>
                    {review.updated_at.split("T")[0]}
                    <span style={{float: "right"}}>
                      <i id={review.id} onClick={this.showEditReviewModal} className="edit outline large icon blue"></i>
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
          show={this.state.showModal}
          handleClose={this.hideEditReviewModal}
          rating={this.state.rating}
          handleFormChange={this.handleFormChange}
          changeRating={this.changeRating}
          content={this.state.content}
          handleEditReviewSubmit={this.handleEditReviewSubmit}
          currentReview={this.state.currentReview}
        />
      </div>
    )
  }
}
