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
      }, console.log(updatedFavorite, this.state.started))
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
      }, console.log(updatedFavorite, this.state.essay))
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
      }, console.log(updatedFavorite, this.state.submitted))
    })
  }

  render() {
    const foundFavorite = this.props.currentUserFavorites.find(favorite => favorite.user_id === this.props.currentUser.id && favorite.college_id === this.props.favoriteCollege.id)

    return(
      <tr>
        <td className="center aligned remove" onClick={() => this.props.deleteFavorite(this.props.favoriteCollege.id)}><strong>remove</strong></td>
        <td>{this.props.favoriteCollege.name}</td>
        <td>{this.props.favoriteCollege.city}</td>
        <td>{this.props.favoriteCollege.state}</td>
        <td>{this.props.favoriteCollege.avg_act}</td>
        <td>{this.props.favoriteCollege.avg_sat}</td>
        <td>{Math.round(this.props.favoriteCollege.admission_rate * 10000)/100}%</td>
        <td className="center aligned" onClick={()=>this.toggleStartedCheckMark(foundFavorite.id)} id={this.props.favoriteCollege.id}>
          {foundFavorite.app_started ? <i className="large green checkmark icon"></i> : this.state.showStartedCheckMark && <i className="large green checkmark icon"></i>}
        </td>
        <td className="center aligned" onClick={()=>this.toggleEssayCheckMark(foundFavorite.id)} id={this.props.favoriteCollege.id}>
          {foundFavorite.essay ? <i className="large green checkmark icon"></i> : this.state.showEssayCheckMark && <i className="large green checkmark icon"></i>}
        </td>
        <td className="center aligned" onClick={()=>this.toggleSubmittedCheckMark(foundFavorite.id)} id={this.props.favoriteCollege.id}>
          {foundFavorite.app_submitted ? <i className="large green checkmark icon"></i> : this.state.showSubmittedCheckMark && <i className="large green checkmark icon"></i>}
        </td>
      </tr>
    )
  }
}
