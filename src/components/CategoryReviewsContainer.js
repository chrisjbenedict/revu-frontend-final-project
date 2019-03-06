import React from 'react'
import NewReviewForm from './NewReviewForm'
import Review from './Review'
import StarRatings from 'react-star-ratings'

export default class CategoryReviewsContainer extends React.Component {

  state = {
    showModal: false,
    rating: 0,
    content: "",
    allReviews: [],
    sortByCategory: "sort-by-date"
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
    // if (rating >= 4.5) {
    //   return "#19647E"
    // } else if (rating >= 3.5 && rating < 4.5) {
    //   return "#5FAD56"
    // } else if (rating >= 2.5 && rating < 3.5) {
    //   return "#8EB8E5"
    // } else if (rating >= 1.5 && rating < 2.5) {
    //   return "#E3B505"
    // } else if (rating > 0 && rating < 1.5) {
    //   return "#EE6C4D"
    // } else {
    //   return "black"
    // }
    return "#82BA92"
  }

  calculateAverageRating = (reviewsArray) => {
    const reducer = (acc, cV) => acc + cV
    const ratings = reviewsArray.map( review => review.rating)
    return (Math.round((ratings.reduce(reducer, 0)/ratings.length) * 100) / 100)
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

    const allCatReviews = this.state.allReviews.filter( review => review.college_id === this.props.college.id && review.category_id === this.props.category.id).sort( (a,b) => b.created_at - a.created_at)

    const sortMyReviews = () => {
      if (this.state.sortByCategory === "sort-by-rating") {
        return allCatReviews.sort( (a,b) => { if (a.rating > b.rating) { return -1 } if (a.rating < b.rating) { return 1 } return 0 })
      } else if (this.state.sortByCategory === "sort-by-date") {
        return allCatReviews.sort( (a,b) => { if (a.created_at > b.created_at) { return -1 } if (a.created_at < b.created_at) { return 1 } return 0 })
      } else {
        return allCatReviews
      }
    }

    return(
      <div className="college-all-reviews-container">
        <div className="review-header">
          <h1 className="ui left aligned header" style={{fontSize:"3rem", display:'flex'}}>{this.props.college.name}</h1>
          <h2 className="ui left aligned header">{this.props.category.title}
            {sortMyReviews().length !== 0 ? <p style={{fontSize:"2rem", color: Math.round(this.calculateAverageRating(allCatReviews))}}>{this.calculateAverageRating(allCatReviews)}</p> : <p>no reviews yet :(</p>}
          </h2>
          <div className="new-review-button">
            <button className="ui button new-review" style={{backgroundColor: "#02111B", color: "white"}} onClick={this.showNewReviewModal}><i className="pencil alternate icon"></i>write a review</button><br/>
          </div>
        </div>
        {allCatReviews.length > 1 ?
        <div className="sort-buttons">
          <div className="ui buttons">
            <button className="ui button sort-reviews" style={{backgroundImage: "linear-gradient(to right, #02111B, #82BA92)", color: "white"}} value="sort-by-rating" onClick={this.toggleSortedReviews}>Sort by Rating</button>
            <button className="ui button sort-reviews" style={{backgroundImage: "linear-gradient(to right, #82BA92, #02111B)", color: "white"}} value="sort-by-date" onClick={this.toggleSortedReviews}>Most Recent</button>
          </div>
        </div> : <div></div>
        }
        <br/>
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
