import React, { Component } from 'react';

class ResultListing extends Component {
  render() {
		const { fetchedVenues } = this.props;
		console.log(fetchedVenues)

    return (
			<div id='listing'>
				<h1 className='listing-title'>SF Chinese Food</h1>
				<ol className='restaurant-listing'>
					{fetchedVenues.map((fectchedVenue) => (
						<div key={fectchedVenue.venue.id}>
							<li className="individual-listing" >
								<a role='button'>{fectchedVenue.venue.name}</a>
							</li>
						</div>
					))}
				</ol>
			</div>
		)
  }
}

export default ResultListing;