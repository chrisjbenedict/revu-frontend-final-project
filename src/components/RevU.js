import React from 'react'

// <button className="circular ui black icon button get-started" onClick={() => window.location.assign("/signup")}>GET STARTED</button>

const RevU = (props) => {

  return (
    <div className="revu-wrapper">
      <div className="revu-background">
        <h2 className="revu-header">REVU<br/></h2>
        <p className="revu-tagline">unpolished college reviews to help you choose</p><br/>
        <p className="revu-description">Finding the right college, the right classes, the right groups is hard. Let us help. <br/> Sign up or log in to get honest reviews to help you find your ideal matches.</p>
      </div>
      <div className="revu-summary">
        <div className="revu-card-info">
          <div className="card-contents-info">
            <h1>View College Information</h1>
            <p>Finally, a complete, interactive college guide that fits in the palm of your hand, built from the ground up to ensure that you have total control of your college search. Browse, sort and organize a treasure trove of the latest data on over 7,000 colleges. Even build a spreadsheet in seconds comparing all the key stats that would otherwise take weeks to complete. Here is just some of the information at your fingertips:</p>
            <ul>
              <li>College Websites</li>
              <li>Average SAT and ACT Scores</li>
              <li>Student Demographics</li>
              <li>Average Cost of Tuition</li>
              <li>Admission Rates</li>
              <li>Graduation Rates</li>
            </ul>
          </div>
          <div className='revu-card-info-pic'>
          </div>
        </div>
        <div className="revu-card-favorites">
          <div className='revu-card-favorites-pic'>
          </div>
          <div className="card-contents-favorites">
            <h1>Compare Your Favorite Schools</h1>
            <p>With advanced filter and sort options, find the perfect colleges for you, and add some colleges to your Favorites in order to compare them. With quick-search functionality, it’s always easy to jump to a school.</p>
            <p>Select your favorite colleges and you’ve already built a powerful spreadsheet that you can view in-app.</p>
            <p>Visit your favorites to compare and visualize the differences in ACT and SAT requirements, Cost, and Admission Rate.</p>
            <p>Use our application manager to keep track of the applications you have started, written essays for, and submitted.</p>
          </div>
        </div>
        <div className="revu-card-reviews">
          <div className="card-contents-reviews">
            <h1>View/Write College Reviews</h1>
            <p>Don't be fooled by other sites that push polished reviews that are tailored by the colleges themselves. Our college reviews come from actual students and RevU was designed to give you a platform to get the best possible feel for your potential or current college.</p>
            <p>Our easy-to-use review tools group reviews by categories so you can focus on the aspects of college important to you.</p>
            <p>Curious about events on campus? Want to know what students are saying about the academics and athletics? Need to know what the social scene is like? We've got it all.</p>
          </div>
          <div className='revu-card-reviews-pic'>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RevU
