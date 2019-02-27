import React from 'react'

const Review = (props) => {

  const reviewer = props.users.find( user => user.id === props.review.user_id )


  return (
    <div className="single-review-container">
      <div className="ui message">
        <div className="header">
        <circle style={{float:"right"}} className="review-circle"><p className="circle-rating" style={{color: props.setColor(props.review.rating)}}>{props.review.rating}</p></circle>
          {reviewer.username} says:
        </div><br/>
        <p>{props.review.content}</p><br/>
      </div>
      <br/>
    </div>
  )
}

export default Review
