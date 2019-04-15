import React from 'react'
import EditReviewForm from './EditReviewForm'
import StarRatings from 'react-star-ratings'

// <span style={{float:"right"}} className="dot"><p className="circle-rating" style={{color: this.setColor(review.rating)}}>{review.rating}</p></span>


export default class Profile extends React.Component {

  state = {
    showModal: false,
    rating: 0,
    content: "",
    currentUserReviews: [],
    currentReview: {},
    sortByCategory: "sort-by-date"
  }


  setColor = (rating) => {
    // if (rating === 5) {
    //   return "#19647E"
    // } else if (rating === 4) {
    //   return "#5FAD56"
    // } else if (rating === 3) {
    //   return "#8EB8E5"
    // } else if (rating === 2) {
    //   return "#E3B505"
    // } else if (rating === 1) {
    //   return "#EE6C4D"
    // } else {
    //   return "black"
    // }
    return "#82BA92"
  }

  // componentDidMount() {
  //   fetch("http://localhost:3001/api/v1/reviews")
  //   .then( res => res.json())
  //   .then( reviews => {
  //     this.setState({
  //       currentUserReviews: reviews.filter( review => review.user_id === this.props.currentUser.id )
  //     }, () => console.log("my reviews", this.state.currentUserReviews))
  //   })
  // }


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

  toggleSortedReviews = (e) => {
    e.preventDefault()
    this.setState({
      sortByCategory: e.target.value
    }, () => console.log("sorting", this.state.sortByCategory))
  }

  sortMyReviews = () => {
    if (this.state.sortByCategory === "sort-by-rating") {
      return this.props.currentUserReviews.sort( (a,b) => { if (a.rating > b.rating) { return -1 } if (a.rating < b.rating) { return 1 } return 0 })
    } else if (this.state.sortByCategory === "sort-by-college") {
      return this.props.currentUserReviews.sort( (a,b) => { if (a.college_id > b.college_id) { return -1 } if (a.college_id < b.college_id) { return 1 } return 0 })
    } else if (this.state.sortByCategory === "sort-by-date") {
      return this.props.currentUserReviews.sort( (a,b) => { if (a.created_at > b.created_at) { return -1 } if (a.created_at < b.created_at) { return 1 } return 0 })
    } else {
      return this.state.currentUserReviews
    }
  }


  render() {
    return (
      <div className="profile-wrapper">
        <div className="sort-buttons">
          <div className="ui buttons" style={{marginTop: "5rem"}}>
            <button className="ui button" style={{backgroundImage: "linear-gradient(to right, #02111B, #82BA92)", color: "white"}} value="sort-by-college" onClick={this.toggleSortedReviews}>Sort by College</button>
            <button className="ui button" style={{backgroundColor: "#82BA92", color: "white"}} value="sort-by-rating" onClick={this.toggleSortedReviews}>Sort by Rating</button>
            <button className="ui button" style={{backgroundImage: "linear-gradient(to right, #82BA92, #02111B)", color: "white"}} value="sort-by-date" onClick={this.toggleSortedReviews}>Most Recent</button>
          </div>
        </div>
      <br/>

          {this.sortMyReviews().map(review => {
            let college = this.props.allColleges.find( college => college.id === review.college_id)
            const category = this.props.allCategories.find( category => category.id === review.category_id)
            return (
              <div className="single-review-container">

                <div className="ui message">
                  <div className="header">
                  <StarRatings
                    key={review.id}
                    rating={review.rating}
                    starDimension="30px"
                    starRatedColor={this.setColor(review.rating)}
                    // changeRating={props.changeRating}
                    numberOfStars={5}
                  />
                  <span style={{float: "right"}}>
                    <i onClick={() => this.props.deleteReview(review.id)} className="window close outline large icon"></i>
                  </span>
                  <div style={{textAlign:"left", fontSize:"1.3rem"}}>
                  <br/>
                    {college.name}
                     <br/><p style={{fontSize: "1.2rem"}}> Category: {category.title}</p>
                  </div><br/>
                    <em><p style={{fontSize:"1.1rem"}}>{review.content}</p></em>
                  </div><br/>
                  <p style={{textAlign: "left"}}>
                    {review.updated_at.split("T")[0]}
                    <span style={{float: "right"}}>
                      <i id={review.id} onClick={(e) => this.showEditReviewModal(e)} className="edit outline large icon"></i>
                    </span>
                  </p>
                </div>
                <br/>
              </div>
            )
          })}
          <br/>

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
