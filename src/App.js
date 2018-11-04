import React, { Component } from 'react';

import './App.css';

class App extends Component {

  componentDidMount () {
    this.renderMap()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing&key=AIzaSyBJhg8V9CYH7XONDGiFh-s7hnDqZxNScmE&v=3&callback=initMap"
    )
    window.initMap = this.initMap;
  }

  initMap = (() => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
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

function loadScript(url) {
  const index = window.document.getElementsByTagName('script')[0];
  const script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index)
}


export default App;
 