import React, { Component } from 'react';
import FSimg from './foursquare.png';

function loadGoogleMapScript(url) {
	const index = window.document.getElementsByTagName('script')[0];
	const script = window.document.createElement('script');
	script.src = url;
	script.async = true;
	script.defer = true;
	index.parentNode.insertBefore(script, index)
}

class Map extends Component {
	constructor(props) {
		super(props)
		this.map = undefined
		this.markers = []
	}

	componentDidMount () {
    this.renderMap()
  }

  renderMap = () => {
    loadGoogleMapScript("https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing&key=AIzaSyBJhg8V9CYH7XONDGiFh-s7hnDqZxNScmE&v=3&callback=initMap"
    )
    window.initMap = this.initMap;
	}
	
  initMap = (() => {
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.7700021, lng: -122.4492177},
      zoom: 13
    });
	})

	addMarker = (displayVenues, selectedVenueId) => {
		if (this.map && displayVenues) {
			const infowindow = new window.google.maps.InfoWindow();

			let markers = []

			for (let i in displayVenues) {
				const marker = new window.google.maps.Marker({
					position: {lat: displayVenues[i].venue.location.lat, lng: displayVenues[i].venue.location.lng},
					map: this.map,
					title: displayVenues[i].venue.name
				});
	
				const infoWindowContent = `
					<h2> <a href="http://foursquare.com/v/${displayVenues[i].venue.id}" target="_blank">${displayVenues[i].venue.name} </a></h2>
					<p> <p class="address">Restaurant Address:</p> ${displayVenues[i].venue.location.address}, ${displayVenues[i].venue.location.city}, ${displayVenues[i].venue.location.state}</p>
					<a href="https://foursquare.com/"> 
						<img class="foursquare-image" src=${FSimg} alt="FourSquare Logo">
					</a>
				`
	
				marker.addListener('click', function(){
					infowindow.setContent(infoWindowContent)
					infowindow.open(this.map, marker)
					marker.setAnimation(window.google.maps.Animation.DROP)
				})

				if (displayVenues[i].venue.id === selectedVenueId) {
					infowindow.setContent(infoWindowContent)
					infowindow.open(this.map, marker)
					marker.setAnimation(window.google.maps.Animation.DROP)
				}

				markers.push(marker)
			}
			this.markers = markers
		}
	}

	clearMarkers = () => {
		for (let i in this.markers) {
			this.markers[i].setMap(null)
		}
	}
	
	render() {
		const { displayVenues, selectedVenueId } = this.props;
		console.log(selectedVenueId)
		this.clearMarkers()
		this.addMarker(displayVenues, selectedVenueId)
		return(
			<div id='map'>
			</div>
		)
	}
}

export default Map;