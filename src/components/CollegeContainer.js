import React from 'react'
import CollegeInfoCard from './CollegeInfoCard'
import Search from './Search'

export default class CollegeContainer extends React.Component {

  state = {
    collegesToSend: []
  }

  handleLetterClick = (e) => {
    const collegesToSend = this.props.allCollegeResults.filter( college => {
      return college.name.startsWith(e.target.id)
    })
    console.log(collegesToSend);
    console.log(e.target.id);
    this.setState({
      collegesToSend: collegesToSend.sort( (a,b) => {
        if (a.average_cost < b.average_cost) { return 1 }
        if (a.average_cost > b.average_cost) { return -1 }
        return 0
      })
    }, () => console.log("send em", this.state.collegesToSend))
  }


  render() {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    return(
      <div className="college-search-container">
        <div className="search-colleges-wrapper">
          <Search handleSearch={this.props.handleSearch}/>
        </div>
        <div className="alphabet-wrapper">
          {alphabet.map(letter => {
            return <a href="#" onClick={this.handleLetterClick} id={letter.toUpperCase()} className="letters"> {letter.toUpperCase()} </a>
          })}
        </div>
        <div className="college-by-letter">
          {this.state.collegesToSend.slice(0,20).map( college => {
            return (
              <CollegeInfoCard
                key={college.id}
                collegeData={college}
                // searchesToDisplay={this.searchesToDisplay()}
              />
            )
          })}
        </div>
      </div>
    )
  }
}
