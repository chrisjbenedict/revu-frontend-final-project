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
        currentUserFavorites: allFavorites.filter(favorite => favorite.user_id = this.props.currentUser.id)
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
        allFavorites: this.state.allFavorites.filter( favorite => favorite.id !== favoriteToDeleteId)
      })
    })
  }


  render() {
    const reviewedCollegeIds = this.props.currentUserReviews.map( review => review.college_id )

    const reviewedColleges = this.props.allColleges.filter( college => {
      return reviewedCollegeIds.includes(college.id)
    })

    const favoriteCollegeIds = this.state.currentUserFavorites.map( favorite => favorite.college_id )

    const favoriteColleges = this.props.allColleges.filter( college => {
      return favoriteCollegeIds.includes(college.id)
    })

    return (
      <div className="favorite-colleges">
        <table className="ui teal celled structured table">
          <thead>
            <tr>
              <th rowspan="2"></th>
              <th rowspan="2">College</th>
              <th rowspan="2">City</th>
              <th rowspan="2">State</th>
              <th className="center aligned" colspan="3">Application Status</th>
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
                  deleteFavorite={this.deleteFavorite}
                  currentUser={this.props.currentUser}
                  allFavorites={this.state.allFavorites}
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
