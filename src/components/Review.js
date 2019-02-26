import React from 'react'

const Review = (props) => {

  const reviewer = props.users.find( user => user.id == props.review.user_id )

  return (
    <div className="single-review-container">
      <div className="ui message">
        <div className="header">
          {reviewer.username} says:
        </div>
        <p>{props.review.content}</p>
      </div>
      <br/>
    </div>
  )
}

export default Review
