import React from 'react'
// import ReactDOM from "react-dom";
import { Chart } from 'react-google-charts'

const pieOptions = {
  title: "",
  backgroundColor: "#1a1c1d",
  pieHole: 0.4,
  slices: [
    {
      color: "#2BB673"
    },
    {
      color: "#d91e48"
    },
    {
      color: "#007fad"
    },
    {
      color: "#e9a227"
    }
  ],
  legend: {
    position: "left",
    margin: "2rem",
    alignment: "center",
    textStyle: {
      color: "white",
      fontSize: 14
    }
  },
  tooltip: {
    showColorCode: true
  },
  chartArea: {
    left: 0,
    top: 0,
    width: "60%",
    height: "100%"
  },
  fontName: "Roboto"
};

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

let status = true
const showHideContent = () => {
  console.log(status);
  status = !status
}

export default class College extends React.Component {

  state = {
    hideShowAddToFavorites: false
  }


  addToFavorites = (e) => {
    console.log(e.target.id, this.props.currentUser);
    fetch("http://localhost:3001/api/v1/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user_id: this.props.currentUser.id,
        college_id: e.target.id,
        ranking: null,
        app_started: false,
        essay: false,
        app_submitted: false
      })
    })
    .then( resp => resp.json())
    .then( resp => {
      this.setState({ hideShowAddToFavorites: !this.state.hideShowAddToFavorites})
    })
  }


  render() {
    let acc = document.querySelectorAll(".title")
    let i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block"
        }
      })
    }
    return (
      <div className="ui college container">

        <div className="ui labeled button" tabIndex="0">
          <div className="ui basic blue button" onClick={this.props.onReviewButtonClick}>
            Reviews
          </div>
          <a className="ui basic left pointing blue label">
            {this.props.collegeReviews}
          </a>
        </div>
        <div className="ui primary basic button add-to-favorites" id={this.props.college.id} onClick={this.addToFavorites} hidden={this.state.hideShowAddToFavorites}>
          Add to Favorites
        </div>

        <div className="column">
          <div className="img-container">
            <h1 className="college-card-title"><span>{this.props.college.name}</span></h1>
            <img className="ui fluid centered image" src={this.props.photos[Math.floor(Math.random()*this.props.photos.length)]} alt="random college"/>
          </div>
        </div>

          <div className="ui inverted segment">
            <div className="ui inverted accordion">
              <div className="title" onClick={showHideContent}>
                <i className="dropdown icon"></i>
                Website
              </div>
              <div className="info-content" hidden={false}>
                <p><a onClick={() => window.open(this.props.college.school_url, "_blank")}>{this.props.college.school_url}</a></p>
              </div>
              <div className="title">
                <i className="dropdown icon"></i>
                Average Total Cost
              </div>
              <div className="info-content">
                <p>{formatter.format(this.props.college.average_cost)}</p>
              </div>
              <div className="title">
                <i className="dropdown icon"></i>
                Admission Rate
              </div>
              <div className="info-content">
                <p>{Math.round(this.props.college.admission_rate * 100)}%</p>
              </div>
              <div className="title">
                <i className="dropdown icon"></i>
                Graduation Rate
              </div>
              <div className="info-content">
                <p>{Math.round(this.props.college.completion_rate * 100)}%</p>
              </div>
              <div className="title">
                <i className="dropdown icon"></i>
                Average SAT/ACT Scores
              </div>
              <div className="info-content">
                <p>SAT:  <span>{this.props.college.avg_sat}</span></p>
                <p>ACT:  <span>{this.props.college.avg_act}</span></p>
              </div>
              <div className="title">
                <i className="dropdown icon"></i>
                Demographics: Race
              </div>
              <div className="info-content" style={{marginLeft: "4rem"}}>
                <Chart
                  chartType="PieChart"
                  data={[
                    ["Race", "Percentage"],
                    ["White",this.props.college.percent_white],
                    ["Black", this.props.college.percent_black],
                    ["Hispanic", this.props.college.percent_hispanic],
                    ["Asian", this.props.college.percent_asian],
                    ["NHPI", this.props.college.percent_nhpi],
                    ["AIAN", this.props.college.percent_aia]
                  ]}
                  options={pieOptions}
                  graph_id="PieChart"
                  width={"80%"}
                  height={"300px"}
                  legend_toggle
                />
              </div>

            </div>
          </div>

      </div>
    )
  }
}
