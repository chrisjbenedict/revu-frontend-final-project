import React from 'react'
import StarRatings from 'react-star-ratings'

const NewReviewForm = (props) => {

    return (
      <div className="review-modal-container" hidden={!props.show}>
        <section className="modal-main">
          <form className="review-form" onChange={props.handleFormChange}><br/>
            <h2 className="review-form-header">Review {props.college.name}'s {props.category.title}</h2>
            <div className="modal-content">
              <StarRatings
                rating={props.rating}
                starRatedColor="blue"
                changeRating={props.changeRating}
                numberOfStars={5}
              />
              <br/><br/>
              <textarea name="content" id="content" rows="8" placeholder="Whatcha gotta say?"></textarea>
              <br/>
              <div className="ui large buttons">
                <button className="ui button" onClick={props.handleClose}>Cancel</button>
                <div className="or"></div>
                <button className="ui button" onClick={props.handleNewReviewSubmit}>Submit</button>
              </div>
            </div>
          </form>
        </section>
      </div>
    )
}

export default NewReviewForm
