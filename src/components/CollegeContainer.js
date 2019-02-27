import React from 'react'
import CollegeInfoCard from './CollegeInfoCard'
import Search from './Search'
import College from './College'
import ReviewPage from './ReviewPage'
import CategoryReviewsContainer from './CategoryReviewsContainer'

export default class CollegeContainer extends React.Component {

  state = {
    collegesToSend: [],
    searchTerm: "",
    selectedCollege: "",
    hideColleges: false,
    hideCollege: true,
    hideReview: true,
    allCategories: [],
    category: {},
    hideReviewCategory: true,
    collegeReviews: []
  }

  componentDidMount() {
    fetch("http://localhost:3001/api/v1/categories")
    .then(resp => resp.json())
    .then( allCategories => {
      this.setState({
        allCategories
      })
    })
  }


  handleSearch = (e) => {
    e.preventDefault()
    this.setState({
      searchTerm: e.target.value
    }, () => this.searchesToDisplay())
  }

  searchesToDisplay = () => {
    const searchesToDisplay = this.props.allCollegeResults.filter( college => {
      return college.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    })
    this.setState({
      collegesToSend: searchesToDisplay
    })
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
    })
  }

  onCardClick = (selectedCollege) => {
    const collegeReviews = this.props.allReviews.filter( review => review.college_id === selectedCollege.id)
    this.setState({
      selectedCollege,
      collegeReviews,
      hideColleges: !this.state.hideColleges,
      hideCollege: !this.state.hideCollege
    }, () => console.log(this.state.collegeReviews.length))
  }

  onReviewButtonClick = (college) => {
    this.setState({
      hideReview: !this.state.hideReview,
      hideCollege: !this.state.hideCollege
    })
  }

  goBackToCollegeSearch = () => {
    this.setState({
      hideColleges: !this.state.hideColleges,
      hideCollege: !this.state.hideCollege
    })
  }

  goBackToCollegeProfile = () => {
    this.setState({
      hideCollege: !this.state.hideCollege,
      hideReview: !this.state.hideReview
    })
  }

  goBackToAllReviewOptions = () => {
    this.setState({
      hideReview: !this.state.hideReview,
      hideReviewCategory: !this.state.hideReviewCategory
    })
  }

  onIconClick = (e) => {
    const foundCategory = this.state.allCategories.find(category => {
      return category.title == e.target.id
    })
    console.log("constant", foundCategory);
    this.setState({
      category: foundCategory,
      hideReview: !this.state.hideReview,
      hideReviewCategory: !this.state.hideReviewCategory
    }, () => console.log("setting state", this.state.category))
  }


  render() {
    const photos = [
      "https://images.unsplash.com/photo-1505919686840-88ef2bc05b85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80",
      "https://www.vantagetcg.com/wp-content/uploads/2018/07/Princeton-University-Blair-Arch-from-Princeton-University-Website-1920x1082.jpg",
      "https://cdn.cnn.com/cnnnext/dam/assets/151007071814-harvard-campus-stock-super-tease.jpg",
      "https://www.johnson.cornell.edu/businessfeed/wp-content/uploads/2018/03/cornell-university-featured.jpg",
      "https://news.dartmouth.edu/sites/dart_news.prod/files/styles/slide/public/news/images/20170926_campus_aerials_eb_069_810.jpg",
      "https://cdn-images-1.medium.com/max/1188/0*0jHn48Tp5wC_FqUc.jpg",
      "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      "https://news.yale.edu/sites/default/files/styles/featured_media/public/2010_05_10_19_03_37_central_campus_1.jpg?itok=dFqc-hAD&c=07307e7d6a991172b9f808eb83b18804",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      "https://images.unsplash.com/photo-1474650919751-b7e21a1b180f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      "https://images.unsplash.com/20/cambridge.JPG?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1030&q=80",
      "https://images.unsplash.com/photo-1501503069356-3c6b82a17d89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      "https://images.unsplash.com/photo-1471874622662-3fe52245b2f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      "https://images.unsplash.com/photo-1455734729978-db1ae4f687fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      "https://images.unsplash.com/photo-1542019886894-8346ec5e3e4b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      "https://images.unsplash.com/photo-1496149720447-5f43ceb5351a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=993&q=80",
      "https://images.unsplash.com/photo-1542906484-f6a89f408345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      "https://images.unsplash.com/photo-1470378639897-89788e74b7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1054&q=80",
      "https://images.unsplash.com/photo-1541691734047-8345ea5cf6ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      "https://images.unsplash.com/photo-1547653872-052e3539decc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      "https://images.unsplash.com/photo-1542906473-60340c54ec40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      "https://images.unsplash.com/photo-1550952853-1eb861d927b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      "https://images.unsplash.com/photo-1534161197248-bae0085acec9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
    ]
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    return(
      <div className="college-wrapper">
        <div className="college-search-container" hidden={this.state.hideColleges}>
          <div className="search-colleges-wrapper">
            <Search handleSearch={this.handleSearch}/>
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
                  onCardClick={this.onCardClick}
                  photos={photos}
                />
              )
            })}
          </div>
        </div>
        <div className="selected-college-container" hidden={this.state.hideCollege}>
          <div className="ui labeled button" tabIndex="0" onClick={this.goBackToCollegeSearch}>
            <div className="ui basic blue button">
              Back
            </div>
          </div>
          <div className="selected-college-page">
            <College
              key={this.state.selectedCollege.id}
              college={this.state.selectedCollege}
              photos={photos}
              onReviewButtonClick={this.onReviewButtonClick}
              collegeReviews={this.state.collegeReviews.length}
            />
          </div>
        </div>
        <div className="selected-college-review-container" hidden={this.state.hideReview}>
          <div className="ui labeled button" tabIndex="0" onClick={this.goBackToCollegeProfile}>
            <div className="ui basic blue button">
              Back
            </div>
          </div>
          <div className="selected-college-review-page">
            <ReviewPage
              key={this.state.selectedCollege.id}
              college={this.state.selectedCollege}
              photos={photos}
              onIconClick={this.onIconClick}
            />
          </div>
        </div>
        <div className="selected-college-category-review-container" hidden={this.state.hideReviewCategory}>
          <div className="ui labeled button" tabIndex="0" onClick={this.goBackToAllReviewOptions}>
            <div className="ui basic blue button">
              Back
            </div>
          </div>
          <div className="selected-college-category-review-page">
            <CategoryReviewsContainer
              key={this.state.selectedCollege.id}
              college={this.state.selectedCollege}
              photos={photos}
              category={this.state.category}
              currentUser={this.props.currentUser}
              users={this.props.users}
            />
          </div>
        </div>
      </div>
    )
  }
}
