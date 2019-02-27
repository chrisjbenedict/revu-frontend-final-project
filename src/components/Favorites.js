import React from 'react'

const Favorites = (props) => {

  const collegeIds = props.currentUserReviews.map( review => review.college_id)

  const reviewedColleges = props.allColleges.filter( college => {
    return collegeIds.includes(college.id)
  })



  return (
    <div className="favorite-colleges">
      {reviewedColleges.slice(0, 6).map( college => {
        return (
          <div className="favorite-card">
          <div className="ui cards">
            <div className="card">
              <div className="content">
                <div className="header">
                  {college.name}
                </div>
                <div className="meta">
                  {college.city}, {college.state}
                </div>
                <div className="description">
                  {college.school_url}
                </div>
              </div>
              <div className="extra content">
                <div className="ui two buttons">
                  <div className="ui basic purple button">Info</div>
                  <div className="ui basic blue button">Reviews</div>
                </div>
              </div>
            </div>
          </div>
          </div>
        )
      })}
    </div>
  )
}

export default Favorites
