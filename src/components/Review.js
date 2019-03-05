import React from 'react'
import StarRatings from 'react-star-ratings'
// import Vue from 'Vue'
// import vueClapButton from 'vue-clap-button'
// Vue.use(vueClapButton);


// <circle style={{float:"right"}} className="review-circle"><p className="circle-rating" style={{color: props.setColor(props.review.rating)}}>{props.review.rating}</p></circle>

const Review = (props) => {

  const reviewer = props.users.find( user => user.id === props.review.user_id )


  return (
    <div className="single-review-container">
      <div className="ui message">
        <div className="header">
          {reviewer.username} says:
        </div><br/>
        <StarRatings
          rating={props.review.rating}
          starDimension="30px"
          starRatedColor={props.setColor(props.review.rating)}
          // changeRating={props.changeRating}
          numberOfStars={5}
        />
        <em><p style={{fontSize: "1.3rem"}}>{props.review.content}</p></em><br/>
      </div>
      <br/>
    </div>
  )
}

export default Review
