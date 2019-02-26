import React from 'react'
import StarRatings from 'react-star-ratings'

const EditReviewForm = (props) => {

    return (
      <div className="review-modal-container" hidden={!props.show}>
        <section className="modal-main">
          <form className="review-form" onChange={props.handleFormChange}><br/>
            <div className="modal-content">
              <StarRatings
                name="edittedRating"
                rating={props.rating}
                value={props.rating}
                starRatedColor="blue"
                changeRating={props.changeRating}
                numberOfStars={5}
              />
              <br/><br/>
              <textarea name="edittedContent" id="content" rows="8"></textarea>
              <br/>
              <div className="ui large buttons">
                <button className="ui button" onClick={props.handleClose}>Cancel</button>
                <div className="or"></div>
                <button className="ui button" onClick={(e) => props.handleEditReviewSubmit(props.currentReview, e)}>Submit</button>
              </div>
            </div>
          </form>
        </section>
      </div>
    )
}

export default EditReviewForm
