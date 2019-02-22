import React from 'react'

const Search = (props) => {
  return (
    <div className="ui huge fluid icon input search-college-form" onChange={props.handleSearch}>
      <input
        type="text"
        placeholder={"Search Colleges"}
      />
      <i className="circular search link icon"></i>
    </div>
  )
}

export default Search
