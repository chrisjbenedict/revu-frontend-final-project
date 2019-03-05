import React from 'react'
import Favorite from './Favorite'

export default class FavoritesContainer extends React.Component {

  state = {
    allFavorites: [],
    currentUserFavorites: [],
  }

  componentDidMount() {
    fetch("http://localhost:3001/api/v1/favorites")
    .then( res => res.json())
    .then( allFavorites => {
      this.setState({
        allFavorites,
        currentUserFavorites: allFavorites.filter(favorite => favorite.user_id === this.props.currentUser.id)
      }, () => console.log("my fav", this.state.currentUserFavorites))
    })
  }

  deleteFavorite = (collegeId) => {
    const favoriteToDeleteId = this.state.allFavorites.find(favorite => favorite.college_id === collegeId).id
    fetch(`http://localhost:3001/api/v1/favorites/${favoriteToDeleteId}`, {
      method: "DELETE"
    })
    .then( () => {
      this.setState({
        currentUserFavorites: this.state.currentUserFavorites.filter(favorite => favorite.id !== favoriteToDeleteId)
      })
    })
  }

  // const reviewedCollegeIds = this.props.currentUserReviews.map( review => review.college_id )
  //
  // const reviewedColleges = this.props.allColleges.filter( college => {
    //   return reviewedCollegeIds.includes(college.id)
    // })

  render() {

    const favoriteCollegeIds = this.state.currentUserFavorites.map( favorite => favorite.college_id )

    const favoriteColleges = this.props.allColleges.filter( college => {
      return favoriteCollegeIds.includes(college.id)
    })

    return (
      <div className="favorite-colleges">
        <table className="ui teal celled structured table">
          <thead>
            <tr>
              <th rowSpan="2"></th>
              <th rowSpan="2">College</th>
              <th rowSpan="2">City</th>
              <th rowSpan="2">State</th>
              <th rowSpan="2">Average ACT</th>
              <th rowSpan="2">Average SAT</th>
              <th rowSpan="2">Admission Rate</th>
              <th className="center aligned" colSpan="3">Application Status</th>
            </tr>
            <tr>
              <th>Started</th>
              <th>Essay(s)</th>
              <th>Submitted</th>
            </tr>
          </thead>
          <tbody>
            {favoriteColleges.map( college => {
              return (
                <Favorite
                  key={college.id}
                  deleteFavorite={this.deleteFavorite}
                  currentUser={this.props.currentUser}
                  currentUserFavorites={this.state.currentUserFavorites}
                  favoriteCollege={college}
                />
              )
            })}
            </tbody>
          </table>
      </div>
    )
  }
}
