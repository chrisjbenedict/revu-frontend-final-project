import React from 'react'
import College from './College'

export default class CollegeInfoCard extends React.Component {

  // state = {
  //   clickedCollege: ""
  // }
  //
  // onClick = (e) => {
  //   e.preventDefault()
  //   this.setState({
  //     clickedCollege: e.target.id
  //   }, () => console.log("clickedCollege state", this.state.clickedCollege))
  // }


  render() {

    return(
      <div className="card-wrapper" id={this.props.collegeData.id} onClick={() => this.props.onCardClick(this.props.collegeData)}>
        <div className="ui link cards" >
          <div className="card">
            <div className="image">
              <img src={this.props.photos[Math.floor(Math.random()*this.props.photos.length)]} />
            </div>
            <div className="content">
              <div className="header">{this.props.collegeData.name}</div>
              <div className="meta">
                <p>{this.props.collegeData.city}, {this.props.collegeData.state}</p>
              </div>
            </div>
            <div className="extra content">
              <span className="right floated">
                Admission Rate: {Math.round(this.props.collegeData.admission_rate * 100)}%
              </span>
              <span>
                <i className="users icon"></i>
                {this.props.collegeData.size}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
