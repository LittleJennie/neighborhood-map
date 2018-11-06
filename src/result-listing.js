import React, { Component } from 'react';
import sortBy from 'sort-by'

class ResultListing extends Component {
	state ={
		query: ''
	}

	updateQuery = (query) => (
		this.setState({query: query})
	)

  render() {
		const { displayVenues, updateDisplayVenues } = this.props;
		const { query } = this.state;

		// updateDisplayVenues(query);
		// displayVenues.sort(sortBy('name'));

    return (
			<div id='listing'>
				<h1 className='listing-title'>SF Chinese Food</h1>
				<div className='search-box-wrap'>
					<input 
						type='text' 
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

				<ol className='restaurant-listing'>
					{displayVenues.map((showingVenue) => (
						<div key={showingVenue.venue.id}>
							<li className="individual-listing" >
								<a role='button'>{showingVenue.venue.name}</a>
							</li>
						</div>
					))}
				</ol>
			</div>
		)
  }
}

export default ResultListing;