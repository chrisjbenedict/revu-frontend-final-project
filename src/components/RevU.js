import React from 'react'

const RevU = (props) => {

  return (
    <div className="revu-background">
      <p className="revu-description">Finding the right college, the right classes, the right groups is hard. Let us help. <br/> Sign up or log in to get honest reviews to help you find your ideal matches.</p>
      <h2 className="revu-header">REVU<br/></h2>
      <p className="revu-tagline">unpolished college reviews to help you choose</p>
      <button className="circular ui inverted black icon button get-started" onClick={() => window.open("/login", "_self")}>GET STARTED</button>
    </div>
  )
}

export default RevU
