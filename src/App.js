import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import ResultListing from './result-listing'
import Map from './Map'
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.venues = []
    this.state = {
      displayVenues: [],
      selectedVenueId: undefined
    }
    this.updateDisplayVenues = this.updateDisplayVenues.bind(this)
    this.updateSelectedVenue = this.updateSelectedVenue.bind(this)
  }
  
  componentDidMount () {
    this.getVenue()
  }

  updateDisplayVenues = ((query) => {
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      this.setState(prevState => ({
        displayVenues: prevState.displayVenues.filter((fectchedVenue) => match.test(fectchedVenue.venue.name))
      }))
    } else {
      this.setState({
        displayVenues: this.venues
      })
    }
  })

  updateSelectedVenue = ((clickedVenue) => {
    this.setState({selectedVenueId: clickedVenue})
  })

  getVenue = (() => {
    const fsVenueRecEndPoint = '//api.foursquare.com/v2/venues/explore?'
    const param = {
      client_id: 'VJ4TVWJKEV4ED41VJ4GLAEEDCLYSST4J35DMEP4FCDCPD1G4',
      client_secret: 'ZUAMLAFVTGPRWPLO0MVEM3OUW3LS2M00KVR5FJGCWXQZ5JLA',
      query: 'Chinese food',
      near: 'San Francisco',
      v: "20182507"
    }
    axios.get(fsVenueRecEndPoint + new URLSearchParams(param))
      .then((res) => {
        // console.log(res.data.response.groups[0])
        this.venues = res.data.response.groups[0].items
        this.updateDisplayVenues()
      })
      .catch((error) => {
        console.log("Error! " + error)
      })
  })

  render() {
    console.log(this.state.displayVenues)
    return (
      <div className='app' role="main">
        <ResultListing 
          displayVenues={this.state.displayVenues}
          updateDisplayVenues={this.updateDisplayVenues}
          updateSelectedVenue={this.updateSelectedVenue}
        />
        <Map
          displayVenues={this.state.displayVenues}
          selectedVenueId={this.state.selectedVenueId}
        />
      </div>
    );
  }
}

export default App;
