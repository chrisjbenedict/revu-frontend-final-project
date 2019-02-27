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

export default class College extends React.Component {


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
      <div className="ui">

      <div className="ui labeled button" tabIndex="0" onClick={this.props.onReviewButtonClick}>
        <div className="ui basic blue button">
          Reviews
        </div>
        <a className="ui basic left pointing blue label">
          {this.props.collegeReviews}
        </a>
      </div>

      <div className="column">
        <div className="img-container">
          <h1 className="college-card-title"><span>{this.props.college.name}</span></h1>
          <img className="ui fluid centered image" src={this.props.photos[Math.floor(Math.random()*this.props.photos.length)]} alt="random college"/>
        </div>
      </div>

          <div className="ui inverted segment">
            <div className="ui inverted accordion">
              <div className="title">
                <i className="dropdown icon"></i>
                Website
              </div>
              <div className="content">
                <p><a href={this.props.college.school_url}>{this.props.college.school_url}</a></p>
              </div>
              <div className="title">
                <i className="dropdown icon"></i>
                Average Total Cost
              </div>
              <div className="content">
                <p>{formatter.format(this.props.college.average_cost)}</p>
              </div>
              <div className="title">
                <i className="dropdown icon"></i>
                Admission Rate
              </div>
              <div className="content">
                <p>{this.props.college.admission_rate * 100}%</p>
              </div>
              <div className="title">
                <i className="dropdown icon"></i>
                Graduation Rate
              </div>
              <div className="content">
                <p>{this.props.college.completion_rate * 100}%</p>
              </div>
              <div className="title">
                <i className="dropdown icon"></i>
                Average SAT/ACT Scores
              </div>
              <div className="content">
                <p>SAT:  <span>{this.props.college.avg_sat}</span></p>
                <p>ACT:  <span>{this.props.college.avg_act}</span></p>
              </div>
              <div className="title">
                <i className="dropdown icon"></i>
                Demographics: Race
              </div>
              <div className="content" style={{marginLeft: "4rem"}}>
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
