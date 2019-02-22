import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link, NavLink} from "react-router-dom"
import CollegeContainer from './components/CollegeContainer'
import Search from './components/Search'
import LogInSignUpForm from './components/LogInSignUpForm'


class App extends Component {

  state = {
    allCollegeResults: [],
    hidden: false,
    users: []
  }

  componentDidMount() {
    fetch("http://localhost:3001/api/v1/colleges")
    .then( resp => resp.json())
    .then( results => {
      const sortedResults = results.sort((a, b) => {
        if (a.cost < b.cost) { return -1 }
        if (a.cost > b.cost) { return 1 }
        return 0
      })
      this.setState({
        allCollegeResults: sortedResults,
        // ivyColleges: ivyData
      }, () => console.log("college results", this.state.allCollegeResults))
      fetch("http://localhost:3001/api/v1/users")
      .then( resp => resp.json())
      .then( users => {
        this.setState({
          users
        }, () => console.log(this.state.users))
      })
    })
  }


  logInSignUpForm = () => (
    <div className="log-in-sign-up-wrapper">
      <LogInSignUpForm
        users={this.state.users}
      />
    </div>
  )

  renderCollegeInfo = () => (
    <div className="wrapper">
      <CollegeContainer
        allCollegeResults={this.state.allCollegeResults}
      />
    </div>
  )

  render() {
    return (
      <Router>
        <div className="router-child">

          <div className="ui secondary  menu">
            <a className="active item">
              <NavLink exact to="/revU">
                RevU
              </NavLink>
            </a>
            <a className="item">
              <NavLink exact to="/about">
                About
              </NavLink>
            </a>
            <a className="item" >
              <NavLink exact to="/college_info">
                College Info
              </NavLink>
            </a>
            <a className="item" >
              <NavLink exact to="/college_info">
                Favorites
              </NavLink>
            </a>
            <div className="right menu" >
              <a className="ui item">
                Logout
              </a>
            </div>
          </div>
          <Route exact path='/revU' component={this.logInSignUpForm}/>
          <Route exact path='/' component={this.logInSignUpForm}/>
          <Route exact path='/college_info' component={this.renderCollegeInfo} />
        </div>
      </Router>
    );
  }
}


  // componentDidMount() {
  //   const ivy = ["princeton", "harvard", "yale", "cornell", "dartmouth", "brown", "columbia", "upenn"]
  //   ivy.forEach( college => {
  //     fetch(`https://api.data.gov/ed/collegescorecard/v1/schools?school.school_url=www.${college}.edu&fields=school.name,latest.admissions.act_scores.midpoint.cumulative,latest.admissions.sat_scores.average.overall,latest.admissions.admission_rate.overall,latest.completion.completion_rate_4yr_150nt,latest.cost.avg_net_price.public,latest.cost.avg_net_price.private,id,school.city,school.state,school.zip,school.school_url,school.region_id,school.locale&api_key=M7Oc5YHxn5DU9i0HUH8ETdfw6OWwBOnk0I8lZh7Q`)
  //     .then( resp => resp.json())
  //     .then( collegeData => {
  //       this.setState({
  //         collegeData: [...this.state.collegeData, collegeData.results[0]]
  //       }, () => console.log("collegeData", this.state.collegeData))
  //     })
  //   })
  // }

export default App;
