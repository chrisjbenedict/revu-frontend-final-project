import React from 'react'
import College from './College'

export default class CollegeInfoCard extends React.Component {

  state = {
    clickedCollege: ""
  }

  onClick = (e) => {
    e.preventDefault()
    this.setState({
      clickedCollege: e.target.id
    }, () => console.log("clickedCollege state", this.state.clickedCollege))
  }


  render() {

    const photos = [
      "https://images.unsplash.com/photo-1505919686840-88ef2bc05b85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80",
      "https://www.vantagetcg.com/wp-content/uploads/2018/07/Princeton-University-Blair-Arch-from-Princeton-University-Website-1920x1082.jpg",
      "https://cdn.cnn.com/cnnnext/dam/assets/151007071814-harvard-campus-stock-super-tease.jpg",
      "https://www.johnson.cornell.edu/businessfeed/wp-content/uploads/2018/03/cornell-university-featured.jpg",
      "https://news.dartmouth.edu/sites/dart_news.prod/files/styles/slide/public/news/images/20170926_campus_aerials_eb_069_810.jpg",
      "https://cdn-images-1.medium.com/max/1188/0*0jHn48Tp5wC_FqUc.jpg",
      // "https://cdn.cnn.com/cnnnext/dam/assets/161115114714-columbia-university-nyc-file-large-169.jpg",
      "https://news.yale.edu/sites/default/files/styles/featured_media/public/2010_05_10_19_03_37_central_campus_1.jpg?itok=dFqc-hAD&c=07307e7d6a991172b9f808eb83b18804",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      "https://images.unsplash.com/photo-1474650919751-b7e21a1b180f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      "https://images.unsplash.com/20/cambridge.JPG?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1030&q=80",
      "https://images.unsplash.com/photo-1501503069356-3c6b82a17d89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      "https://images.unsplash.com/photo-1471874622662-3fe52245b2f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      "https://images.unsplash.com/photo-1455734729978-db1ae4f687fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      "https://images.unsplash.com/photo-1542019886894-8346ec5e3e4b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
    ]

    return(
      <div className="card-wrapper">
        <div className="ui link cards" id={this.props.collegeData.name} onClick={this.onClick}>
          <div className="card">
            <div className="image">
              <img src={photos[Math.floor(Math.random()*photos.length)]}/>
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
