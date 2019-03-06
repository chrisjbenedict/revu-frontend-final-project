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
          <h1 className="ui left aligned header" style={{fontSize: "3rem"}}>{this.props.college.name}</h1>
        </div>
        <div className="review-icons">
          <div className="review-item">
            <i className="futbol review huge circular icon"  id="Athletics" onClick={(e) => this.props.onIconClick(e)}></i><br/>
            <label className="icon-label"><strong>Athletics</strong></label>
          </div>
          <div className="review-item">
            <i className="book review huge circular icon" id="Academics" onClick={(e) => this.props.onIconClick(e)}></i><br/>
            <label className="icon-label"><strong>Academics</strong></label>
          </div>
          <div className="review-item" >
            <i className="glass martini review huge circular icon" id="Social Life" onClick={(e) => this.props.onIconClick(e)}></i><br/>
            <label className="icon-label"><strong>Social Life</strong></label>
          </div>
          <div className="review-item" >
            <i className="utensils review huge circular icon" id="Food" onClick={(e) => this.props.onIconClick(e)}></i><br/>
            <label className="icon-label"><strong>Food</strong></label>
          </div>
          <div className="review-item">
            <i className="university review huge circular icon" id="Campus" onClick={(e) => this.props.onIconClick(e)}></i><br/>
            <label className="icon-label"><strong>Campus</strong></label>
          </div>
          <div className="review-item" >
            <i className="user md review huge circular icon" id="Health Services" onClick={(e) => this.props.onIconClick(e)}></i><br/>
            <label className="icon-label"><strong>Health Services</strong></label>
          </div>
          <div className="review-item" >
            <i className="bed review huge circular icon" id="Dorms" onClick={(e) => this.props.onIconClick(e)}></i><br/>
            <label className="icon-label"><strong>Dorms</strong></label>
          </div>
          <div className="review-item" >
            <i className="beer review huge circular icon" id="Greek Life" onClick={(e) => this.props.onIconClick(e)}></i><br/>
            <label className="icon-label"><strong>Greek Life</strong></label>
          </div>
          <div className="review-item" >
            <i className="camera retro review huge circular icon" id="Events" onClick={(e) => this.props.onIconClick(e)}></i><br/>
            <label className="icon-label"><strong>Events</strong></label>
          </div>
          <div className="review-item" >
            <i className="map pin review huge circular icon" id="Location" onClick={(e) => this.props.onIconClick(e)}></i><br/>
            <label className="icon-label"><strong>Location</strong></label>
          </div>
          <div className="review-item" >
            <i className="lock open review huge circular icon" id="Off Campus" onClick={(e) => this.props.onIconClick(e)}></i><br/>
            <label className="icon-label"><strong>Off Campus</strong></label>
          </div>
          <div className="review-item" >
            <i className="bus review huge circular icon" id="Transportation" onClick={(e) => this.props.onIconClick(e)}></i><br/>
            <label className="icon-label"><strong>Transportation</strong></label>
          </div>
        </div>
      </div>
    )
  }

}
