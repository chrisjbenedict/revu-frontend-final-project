import React from 'react'

export default class ReviewPage extends React.Component {
  //
  // state = {
  //   category: null
  // }

  render() {
    return (
      <div className="review-wrapper">
        <div className="review-header">
          <h1 className="ui center aligned header">{this.props.college.name}</h1>
        </div>
        <div className="review-icons">
          <div className="review-item">
            <i className="futbol review huge circular icon"  id="Athletics" onClick={(e) => this.props.onIconClick(e)}></i><br/>
            <label className="icon-label">Athletics</label>
          </div>
          <div className="review-item">
            <i className="book review huge circular icon" id="Academics" onClick={(e) => this.props.onIconClick(e)}></i><br/>
            <label className="icon-label">Academics</label>
          </div>
          <div className="review-item" >
            <i className="glass martini review huge circular icon" id="Social Life" onClick={(e) => this.props.onIconClick(e)}></i><br/>
            <label className="icon-label">Social Life</label>
          </div>
          <div className="review-item" >
            <i className="utensils review huge circular icon" id="Food" onClick={(e) => this.props.onIconClick(e)}></i><br/>
            <label className="icon-label">Food</label>
          </div>
          <div className="review-item">
            <i className="university review huge circular icon" id="Campus" onClick={(e) => this.props.onIconClick(e)}></i><br/>
            <label className="icon-label">Campus</label>
          </div>
          <div className="review-item" >
            <i className="user md review huge circular icon" id="Health Services" onClick={(e) => this.props.onIconClick(e)}></i><br/>
            <label className="icon-label">Health Services</label>
          </div>
          <div className="review-item" >
            <i className="bed review huge circular icon" id="Dorms" onClick={(e) => this.props.onIconClick(e)}></i><br/>
            <label className="icon-label">Dorms</label>
          </div>
          <div className="review-item" >
            <i className="beer review huge circular icon" id="Greek Life" onClick={(e) => this.props.onIconClick(e)}></i><br/>
            <label className="icon-label">Greek Life</label>
          </div>
          <div className="review-item" >
            <i className="camera retro review huge circular icon" id="Events" onClick={(e) => this.props.onIconClick(e)}></i><br/>
            <label className="icon-label">Events</label>
          </div>
          <div className="review-item" >
            <i className="map pin review huge circular icon" id="Location" onClick={(e) => this.props.onIconClick(e)}></i><br/>
            <label className="icon-label">Location</label>
          </div>
          <div className="review-item" >
            <i className="lock open review huge circular icon" id="Off Campus" onClick={(e) => this.props.onIconClick(e)}></i><br/>
            <label className="icon-label">Off Campus</label>
          </div>
          <div className="review-item" >
            <i className="bus review huge circular icon" id="Transportation" onClick={(e) => this.props.onIconClick(e)}></i><br/>
            <label className="icon-label">Transportation</label>
          </div>
        </div>
      </div>
    )
  }

}
