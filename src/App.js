import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom'
import CollegeContainer from './components/CollegeContainer'
// import Search from './components/Search'
import Navigation from './components/Navigation'
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'
import Profile from './components/Profile'
import Favorites from './components/Favorites'
import RevU from './components/RevU'


class App extends Component {

  state = {
    allCollegeResults: [],
    hidden: false,
    users: [],
    currentUser: {},
    allReviews: [],
    currentUserReviews: [],
    allCategories: []
  }

  componentDidMount() {
    let token = localStorage.getItem("token")

    if(token) {
      fetch(`http://localhost:3001/api/v1/current_user`, {
        headers: {
          "Authorization": token
        }
      })
      .then( res => res.json())
      .then( currentUser => {
        this.setState({
          currentUser
        })
      })
    }
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
      })
      fetch("http://localhost:3001/api/v1/users")
      .then( resp => resp.json())
      .then( users => {
        this.setState({ users })
      })
      fetch("http://localhost:3001/api/v1/reviews")
      .then( resp => resp.json())
      .then( allReviews => {
        const currentUserReviews = allReviews.filter( review => review.user_id === this.state.currentUser.id )
        this.setState({ allReviews, currentUserReviews }, () => console.log("user reviews", this.state.currentUserReviews))
      })
    })
    fetch("http://localhost:3001/api/v1/categories")
    .then( resp => resp.json())
    .then( allCategories => {
      this.setState({ allCategories })
    })
  }

  logout = () => {
    //Set currentUser to null
    //Clear localStorage
    this.setState({ currentUser: null })
    localStorage.removeItem("token")
    this.props.history.push("/login")
  }

  signup = (username, password, passwordConfirmation) => {
    if (password === passwordConfirmation) {
      fetch("http://localhost:3001/api/v1/users", {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          'Accept': "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      .then( res => res.json())
      .then( response => {
        if (response.errors) {
          alert(response.errors)
        } else {
          localStorage.setItem("token", response.token)
          this.setState({
            currentUser: response.user
          }, () => console.log(response))
          this.props.history.push('college_info')
        }
      })
    } else {
      alert("Passwords do not match.")
    }
  }

  login = (username, password) => {
    fetch("http://localhost:3001/api/v1/login", {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then( res => res.json())
    .then( response => {
      if (response.errors) {
        alert(response.errors)
      } else {
        localStorage.setItem("token", response.token)
        this.setState({
          currentUser: response.user
        }, console.log(response))
        this.props.history.push('college_info')
      }
    })
  }


  deleteReview = (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      fetch(`http://localhost:3001/api/v1/reviews/${reviewId}`, {
        method: "DELETE"
      })
      .then( () => {
        this.setState({
          allReviews: this.state.allReviews.filter( review => review.id !== reviewId)
        })
      })
    }
  }

  renderRevU = () => (
    <RevU />
  )


  renderCollegeInfo = () => (
    <div className="wrapper">
      <CollegeContainer
        key={this.state.allCollegeResults.length}
        allCollegeResults={this.state.allCollegeResults}
        currentUser={this.state.currentUser}
        users={this.state.users}
        allReviews={this.state.allReviews}
      />
    </div>
  )

  renderProfile = () => (
      <Profile
        key={this.state.allCollegeResults.length}
        currentUser={this.state.currentUser}
        currentUserReviews={this.state.currentUserReviews}
        allColleges={this.state.allCollegeResults}
        allCategories={this.state.allCategories}
        deleteReview={this.deleteReview}
      />
  )

  renderFavorites = ()  => (
    <Favorites
      key={this.state.allCollegeResults.length}
      allColleges={this.state.allCollegeResults}
      currentUser={this.state.currentUser}
      currentUserReviews={this.state.currentUserReviews}
      getCollegesReviewed={this.getCollegesReviewed}
    />
  )

  render() {
    return (
      <div className="App">
        <Navigation currentUser={this.state.currentUser} logout={this.logout} />
        <Switch>
          <Route path="/revu" component={this.renderRevU} />
          <Route path="/college_info" component={this.renderCollegeInfo} />
          <Route path="/profile" component={this.renderProfile} />
          <Route path="/favorites" component={this.renderFavorites} />
          <Route path="/login" render={(routerProps) => <LoginForm login={this.login} {...routerProps}/>} />
         	<Route path="/signup" render={(routerProps) => <SignupForm signup={this.signup} {...routerProps}/>} />
        </Switch>
      </div>

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

export default withRouter(App);
