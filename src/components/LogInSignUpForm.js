import React from 'react'
import { Redirect } from 'react-router-dom'

export default class LogInSignUpForm extends React.Component {

  state = {
    firstName: "",
    lastName: "",
    username: "",
    signUpHidden: false,
    logInHidden: true
  }

  onSignUpFormChange = (e) => {
    e.persist()
    this.setState({
      [e.target.id]: e.target.value
    }, () => console.log(e.target.value))
  }

  signUp = (e) => {
    e.preventDefault()
    fetch("http://localhost:3001/api/v1/users", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        username: this.state.username
      })
    })
    .then( resp => resp.json())
    .then( user => {
      return <Redirect to='/college_info' />
    })
  }

  handleSignUpClick = (e) => {
    if (e.target.id === "sign-up-button" && this.state.signUpHidden==true) {
      this.setState({
        signUpHidden: false,
        logInHidden: true
      })
    }
  }

  handleLogInClick = (e) => {
    if (e.target.id === "log-in-button" && this.state.logInHidden==true) {
      this.setState({
        logInHidden: false,
        signUpHidden: true
      })
    }
  }

  redirectLogIn = () => {
    if (this.props.users.includes(this.state.username)) {
      console.log(this.state.username)
    } else {
      window.alert("That username does not exist. Please sign up.")
    }
  }

  render() {
    return (
      <div className="form">

        <ul className="tab-group">
          <button className="sign-up-log-in-button" id="sign-up-button" onClick={this.handleSignUpClick}>Sign Up</button>
          <button className="sign-up-log-in-button" id="log-in-button" onClick={this.handleLogInClick}>Log In</button>
        </ul>

        <div className="tab-content">
          <div id="signup"  hidden={this.state.signUpHidden}>
            <h1>Sign Up</h1>

            <form action="/" method="post" onChange={this.onSignUpFormChange}>

            <div className="top-row">
              <div className="field-wrap">
                <input id="firstName" type="text" required autoComplete="off" placeholder="First Name"/>
              </div>

              <div className="field-wrap">
                <input id="lastName" type="text"required autoComplete="off" placeholder="Last Name"/>
              </div>
            </div>

            <div className="field-wrap">
              <input id="username" type="text"required autoComplete="off" placeholder="Username"/>
            </div>

            <button onClick={this.signUp} id="get-started" className="button button-block">Get Started</button>

            </form>

          </div>

          <div id="login" hidden={this.state.logInHidden}>
            <h1>Welcome Back!</h1>

            <form action="/" method="post" onChange={this.onSignUpFormChange}>

              <div className="field-wrap">

              <input type="text"required autoComplete="off" placeholder="Username"/>
            </div>


            <button id="log-in" className="button button-block">Log In</button>

            </form>

          </div>

        </div>
      </div>
    )
  }
}
