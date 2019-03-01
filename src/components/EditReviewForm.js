import React from 'react'
import StarRatings from 'react-star-ratings'

const EditReviewForm = (props) => {

    return (
      <div className="review-modal-container" hidden={!props.show}>
        <section className="modal-main">
          <form className="review-form" onChange={props.handleFormChange}><br/>
            <div className="modal-content">
              <StarRatings
                name="rating"
                rating={props.rating}
                value={props.rating}
                starRatedColor="blue"
                changeRating={props.changeRating}
                numberOfStars={5}
              />
              <br/><br/>
              <textarea name="content" id="content" rows="8" value={props.content}></textarea>
              <br/>
              <div className="ui large buttons">
                <button className="ui button" onClick={props.handleClose}>Cancel</button>
                <div className="or"></div>
                <button onClick={props.handleEditReviewSubmit} className="ui button">Submit</button>
              </div>
            </div>
          </form>
        </section>
      </div>
    )
}

export default EditReviewForm
