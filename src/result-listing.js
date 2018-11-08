import React, { Component } from 'react';

class ResultListing extends Component {
	state ={
		query: '',
		selection: ''
	}

	updateQuery = (query) => (
		this.setState({query: query})
	)

  render() {
		const { displayVenues, updateDisplayVenues, updateSelectedVenue } = this.props;
		const { query } = this.state;

    return (
			<div id='listing' role="list">
				<h1 className='listing-title' tabindex="1">SF Chinese Food</h1>
				<div className='search-box-wrap'>
					<input 
						type='text' 
						tabindex="1"
						aria-labelledby='filter' 
						placeholder='Search by restaurant name'
						className='search-box'
						role='search'
						value={query}
						onChange={(e) => {
							this.updateQuery(e.target.value)
							updateDisplayVenues(e.target.value)
						}}
						/>
				</div>

				<ol className='restaurant-listing' role="list">
					{displayVenues.map((showingVenue) => (
						<div key={showingVenue.venue.id}>
							<li className="individual-listing" tabindex="1">
								<div role='button' onClick={() => {updateSelectedVenue(showingVenue.venue.id)}}>{showingVenue.venue.name}</div>
							</li>
						</div>
					))}
				</ol>
			</div>
		)
  }
}

export default ResultListing;