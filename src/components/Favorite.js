import React from 'react'

export default class FavoritesContainer extends React.Component {

  state = {
    showStartedCheckMark: false,
    showEssayCheckMark: false,
    showSubmittedCheckMark: false,
    started: false,
    essay: false,
    submitted: false
  }

  toggleStartedCheckMark = (favoriteId) => {
    fetch(`http://localhost:3001/api/v1/favorites/${favoriteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        app_started: !this.state.started
      })
    })
    .then( resp => resp.json())
    .then( updatedFavorite => {
      this.setState({
        showStartedCheckMark: !this.state.showStartedCheckMark,
        started: !this.state.started
      })
    })
  }
  toggleEssayCheckMark = (favoriteId) => {
    fetch(`http://localhost:3001/api/v1/favorites/${favoriteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        essay: !this.state.essay
      })
    })
    .then( resp => resp.json())
    .then( updatedFavorite => {
      this.setState({
        showEssayCheckMark: !this.state.showEssayCheckMark,
        essay: !this.state.essay
      })
    })
  }
  toggleSubmittedCheckMark = (favoriteId) => {
    fetch(`http://localhost:3001/api/v1/favorites/${favoriteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        app_submitted: !this.state.submitted
      })
    })
    .then( resp => resp.json())
    .then( updatedFavorite => {
      this.setState({
        showSubmittedCheckMark: !this.state.showSubmittedCheckMark,
        submitted: !this.state.submitted
      })
    })
  }

  render() {
    const foundFavorite = this.props.allFavorites.find(favorite => favorite.user_id === this.props.currentUser.id && favorite.college_id === this.props.favoriteCollege.id)

    return(
      <tr>
        <td className="center aligned" onClick={() => this.props.deleteFavorite(this.props.favoriteCollege.id)}><strong>remove</strong></td>
        <td>{this.props.favoriteCollege.name}</td>
        <td>{this.props.favoriteCollege.city}</td>
        <td>{this.props.favoriteCollege.state}</td>
        <td className="center aligned" onClick={()=>this.toggleStartedCheckMark(foundFavorite.id)} id={this.props.favoriteCollege.id}>
          {this.state.showStartedCheckMark && <i className="large green checkmark icon"></i>}
        </td>
        <td className="center aligned" onClick={()=>this.toggleEssayCheckMark(foundFavorite.id)} id={this.props.favoriteCollege.id}>
          {this.state.showEssayCheckMark && <i className="large green checkmark icon"></i>}
        </td>
        <td className="center aligned" onClick={()=>this.toggleSubmittedCheckMark(foundFavorite.id)} id={this.props.favoriteCollege.id}>
          {this.state.showSubmittedCheckMark && <i className="large green checkmark icon"></i>}
        </td>
      </tr>
    )
  }
}
