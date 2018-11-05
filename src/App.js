import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

function loadGoogleMapScript(url) {
  const index = window.document.getElementsByTagName('script')[0];
  const script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index)
}


class App extends Component {

  state = {
    venues: []
  }

  componentDidMount () {
    this.getVenue()
  }

  renderMap = () => {
    loadGoogleMapScript("https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing&key=AIzaSyBJhg8V9CYH7XONDGiFh-s7hnDqZxNScmE&v=3&callback=initMap"
    )
    window.initMap = this.initMap;
  }

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
        this.setState({venues: res.data.response.groups[0].items}, this.renderMap())
      })
      .catch((error) => {
        console.log("Error! " + error)
      })

  })

  initMap = (() => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.7700021, lng: -122.4492177},
      zoom: 13
    });

    const infowindow = new window.google.maps.InfoWindow();

    this.state.venues.map((fetchedVenue) => {
      const marker = new window.google.maps.Marker({
        position: {lat: fetchedVenue.venue.location.lat, lng: fetchedVenue.venue.location.lng},
        map: map,
        title: fetchedVenue.venue.name
      });

      const infoWindowContent = `${fetchedVenue.venue.name}`

      marker.addListener('click', function(){
        infowindow.setContent(infoWindowContent)
        infowindow.open(map, marker)
      })
    })
  })

  render() {
    return (
      <div className='app'>
        <div id='map'>
        </div>
      </div>
    );
  }
}



export default App;
 