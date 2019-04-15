import React from 'react'
import Favorite from '../components/Favorite'
import { Chart } from 'react-google-charts'


export default class FavoritesContainer extends React.Component {

  state = {
    allFavorites: [],
    currentUserFavorites: [],
    hidden: true,
    visualize: "Visualize",
    color: "#82BA92"
  }

  componentDidMount() {
    fetch("http://localhost:3001/api/v1/favorites")
    .then( res => res.json())
    .then( allFavorites => {
      this.setState({
        allFavorites,
        currentUserFavorites: allFavorites.filter(favorite => favorite.user_id === this.props.currentUser.id)
      })
    })
  }

  deleteFavorite = (collegeId) => {
    const favoriteToDeleteId = this.state.allFavorites.find(favorite => favorite.college_id === collegeId).id
    fetch(`http://localhost:3001/api/v1/favorites/${favoriteToDeleteId}`, {
      method: "DELETE"
    })
    .then( () => {
      this.setState({
        currentUserFavorites: this.state.currentUserFavorites.filter(favorite => favorite.id !== favoriteToDeleteId)
      })
    })
  }

  renderCharts = () => {
    if (this.state.visualize === "Hide Graphs") {
      this.setState({
        hidden: !this.state.hidden,
        visualize: "Visualize",
        color: "#82BA92"
      })
    } else {
      this.setState({
        hidden: !this.state.hidden,
        visualize: "Hide Graphs",
        color: "#02111B"
      })
    }
  }

  render() {
    const favoriteCollegeIds = this.state.currentUserFavorites.map( favorite => favorite.college_id )

    const favoriteColleges = this.props.allColleges.filter( college => {
      return favoriteCollegeIds.includes(college.id)
    })

    const actData = [
      [['College', 'ACT']].concat(favoriteColleges.map( college => {
        return [college.name, college.avg_act]
      }))
    ]

    const satData = [
      [['College', 'SAT']].concat(favoriteColleges.map( college => {
        return [college.name, college.avg_sat]
      }))
    ]

    const costData = [
      [['College', 'Cost']].concat(favoriteColleges.map( college => {
        return [college.name, college.average_cost]
      }))
    ]

    const admissionData = [
      [['College', 'Admission Rate']].concat(favoriteColleges.map( college => {
        return [college.name, college.admission_rate*100]
      }))
    ]

    return (
      <div className="favorite-colleges">
        <table className="ui green 5D966D celled structured table centered" style={{boxShadow: "5px 5px #9DA0B2", borderRadius: "10px"}}>
          <thead>
            <tr>
              <th rowSpan="2" style={{textAlign: "center"}}><button style={{backgroundColor: this.state.color, padding: "15px", color: "white", borderRadius: "10px"}} onClick={this.renderCharts}><strong>{this.state.visualize}</strong></button></th>
              <th rowSpan="2">College</th>
              <th rowSpan="2">City</th>
              <th rowSpan="2">State</th>
              <th rowSpan="2">Average ACT</th>
              <th rowSpan="2">Average SAT</th>
              <th rowSpan="2">Admission Rate</th>
              <th rowSpan="2">Average Cost</th>
              <th className="center aligned" colSpan="3">Application Status</th>
            </tr>
            <tr>
              <th>Started</th>
              <th>Essay(s)</th>
              <th>Submitted</th>
            </tr>
          </thead>
          <tbody>
            {favoriteColleges.map( college => {
              return (
                <Favorite
                  key={college.id}
                  deleteFavorite={this.deleteFavorite}
                  currentUser={this.props.currentUser}
                  currentUserFavorites={this.state.currentUserFavorites}
                  favoriteCollege={college}
                />
              )
            })}
            </tbody>
          </table>
          <div className="charts-wrapper" hidden={this.state.hidden}>
            <div className="favorite-college-charts" style={{display: 'flex', flexWrap: 'wrap', marginTop: "3%"}}>
              <div style={{display: 'flex', width: "24%", boxShadow: "5px 5px #9DA0B2", marginRight: "1%", borderRadius: "10px"}}>
                <Chart
                  width={"100%"}
                  height={500}
                  chartType="ColumnChart"
                  loader={<div>Loading Chart</div>}
                  data={actData[0]}
                  options={{
                    title: 'Average ACT Score',
                    chartArea: { width: '30%' },
                    colors: ['#82BA92'],
                    hAxis: {
                      title: 'College',
                      minValue: 0,
                    },
                    vAxis: {
                      title: 'Score',
                    },
                  }}
                  legendToggle
                />
              </div>
              <div style={{display: 'flex', width: "24%", boxShadow: "5px 5px #9DA0B2", marginRight: "1%", borderRadius: "10px"}}>
                <Chart
                  width={"100%"}
                  height={500}
                  chartType="ColumnChart"
                  loader={<div>Loading Chart</div>}
                  data={satData[0]}
                  options={{
                    title: 'Average SAT Score',
                    chartArea: { width: '30%' },
                    colors: ['#82BA92'],
                    hAxis: {
                      title: 'College',
                      minValue: 0,
                    },
                    vAxis: {
                      title: 'Score',
                    },
                  }}
                  legendToggle
                />
              </div>
              <div style={{display: 'flex', width: "24%", boxShadow: "5px 5px #9DA0B2", marginRight: "1%", borderRadius: "10px"}}>
                <Chart
                  width={"100%"}
                  height={500}
                  chartType="ColumnChart"
                  loader={<div>Loading Chart</div>}
                  data={costData[0]}
                  options={{
                    title: 'Average Tuition',
                    chartArea: { width: '30%' },
                    colors: ['#82BA92'],
                    hAxis: {
                      title: 'College',
                      minValue: 0,
                    },
                    vAxis: {
                      title: 'Cost',
                    },
                  }}
                  legendToggle
                />
              </div>
              <div style={{display: 'flex', width: "24%", boxShadow: "5px 5px #9DA0B2"}}>
                <Chart
                  width={"100%"}
                  height={500}
                  chartType="ColumnChart"
                  loader={<div>Loading Chart</div>}
                  data={admissionData[0]}
                  options={{
                    title: 'Admission Rates',
                    chartArea: { width: '30%' },
                    colors: ['#82BA92'],
                    hAxis: {
                      title: 'College',
                      minValue: 0,
                    },
                    vAxis: {
                      title: 'Percent',
                    },
                  }}
                  legendToggle
                />
              </div>
            </div>
          </div>
      </div>
    )
  }
}
