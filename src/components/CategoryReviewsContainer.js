import React from 'react'
import NewReviewForm from './NewReviewForm'
import Review from './Review'
import StarRatings from 'react-star-ratings'

export default class CategoryReviewsContainer extends React.Component {

  state = {
    showModal: false,
    rating: 0,
    content: "",
    allReviews: []
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/reviews')
    .then( resp => resp.json())
    .then( allReviews => {
      this.setState({
        allReviews
      }, () => console.log("allReviews", this.state.allReviews))
    })
  }

  showNewReviewModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  hideNewReviewModal = (e) => {
    e.preventDefault()
    this.setState({ showModal: !this.state.showModal })
  }

  changeRating = ( newRating ) => {
    this.setState({
      rating: newRating
    }, () => console.log(this.state.rating))
  }

  handleFormChange = (e) => {
    e.preventDefault()
    this.setState({
      content: e.target.value
    }, () => console.log(this.state.content))
  }

  handleNewReviewSubmit = (e) => {
    e.preventDefault()
    fetch("http://localhost:3001/api/v1/reviews", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        college_id: this.props.college.id,
        user_id: this.props.currentUser.id,
        category_id: this.props.category.id,
        content: this.state.content,
        rating: this.state.rating
      })
    })
    .then( res => res.json())
    .then( review => {
      console.log(review)
      this.setState({
        rating: 0,
        content: "",
        allReviews: [...this.state.allReviews, review]
      }, this.hideNewReviewModal(e))
    })
  }

  setColor = (rating) => {
    if (rating === 5) {
      return "#19647E"
    } else if (rating === 4) {
      return "#5FAD56"
    } else if (rating === 3) {
      return "#8EB8E5"
    } else if (rating === 2) {
      return "#E3B505"
    } else if (rating === 1) {
      return "#EE6C4D"
    } else {
      return "black"
    }
  }

  calculateAverageRating = (reviewsArray) => {
    const reducer = (acc, cV) => acc + cV
    const ratings = reviewsArray.map( review => review.rating)
    return (Math.round((ratings.reduce(reducer, 0)/ratings.length) * 100) / 100)
  }


  render() {

    const allCatReviews = this.state.allReviews.filter( review => review.college_id === this.props.college.id && review.category_id === this.props.category.id).sort( (a,b) => b.created_at - a.created_at)

    return(
      <div className="college-all-reviews-container">
        <div className="review-header">
          <h1 className="ui center aligned header">{this.props.college.name}</h1>
          <h2 className="ui center aligned header">{this.props.category.title}
            { allCatReviews.length !== 0 ? <p style={{color: this.setColor(Math.round(this.calculateAverageRating(allCatReviews)))}}>{this.calculateAverageRating(allCatReviews)}</p> : <p>no reviews yet :(</p>}
          </h2>
        </div>
        <div className="new-review-button">
          <button className="ui inverted primary button" onClick={this.showNewReviewModal}><i className="pencil alternate icon"></i>write a review</button><br/>
        </div>
        <div className="reviews-container">
          {allCatReviews.map( review => {
            return (
              <Review
                review={review}
                users={this.props.users}
                setColor={this.setColor}
              />
            )
          })}
        </div>

        <NewReviewForm
          show={this.state.showModal}
          handleClose={this.hideNewReviewModal}
          college={this.props.college}
          handleNewReviewSubmit={this.handleNewReviewSubmit}
          category={this.props.category}
          currentUser={this.props.currentUser}
          rating={this.state.rating}
          handleFormChange={this.handleFormChange}
          changeRating={this.changeRating}
        />

      </div>
    )
  }
}
