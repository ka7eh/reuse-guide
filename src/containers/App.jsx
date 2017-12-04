import React from 'react';
import { dsvFormat } from 'd3-dsv';
import { marker } from 'leaflet';

import ItemDetails from 'containers/ItemDetails';
import ItemList from 'containers/ItemList';
import initMap from 'containers/Map';
import itemData from 'files/items.csv';
import locationData from 'files/locations.csv';
import { keyBy } from 'utils/collection';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            map: null,
            items: {},
            locations: {},
            details: null
        };

        this.addLocationMarkers = this.addLocationMarkers.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    componentDidMount() {
        const xhrItems = new XMLHttpRequest();
        xhrItems.open('GET', itemData);
        xhrItems.responseType = 'text/csv';
        xhrItems.onload = () => {
            const items = keyBy(dsvFormat(';')
                .parse(xhrItems.response), 'id');
            Object.values(items)
                .forEach((item) => {
                    item.locations = item.locations.split(',');
                });
            this.setState({
                items
            });
        };
        xhrItems.send();

        const xhrLocations = new XMLHttpRequest();
        xhrLocations.open('GET', locationData);
        xhrLocations.responseType = 'text/csv';
        xhrLocations.onload = () => {
            const locations = keyBy(dsvFormat(';')
                .parse(xhrLocations.response), 'id');
            this.setState({
                locations
            });
            this.addLocationMarkers(Object.values(locations));
        };
        xhrLocations.send();

        const map = initMap(this.context.store);

        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({ map }, () => {
            setTimeout(() => this.state.map.invalidateSize(), 1000);
            this.addLocationMarkers(Object.values(this.state.locations));
        });
    }

    addLocationMarkers(locations) {
        if (this.state.map && locations.length) {
            this.state.map.markerLayer.clearLayers();
            locations
                .forEach((location) => {
                    const locationMarker = marker([location.lat, location.lng])
                        .addTo(this.state.map.markerLayer);
                    locationMarker.bindPopup(`${location.name}<br>${location.address}<br>${location.phone}`);
                });
        }
    }

    handleBackClick() {
        this.addLocationMarkers(Object.values(this.state.locations));
        this.setState({ details: null });
    }

    handleItemClick(itemId) {
        this.setState({ details: this.state.items[itemId] });
    }

    render() {
        return (
            <div className="hero is-fullheight">
                <div className="hero-body columns is-gapless" style={{ padding: 0 }}>
                    <div className="column is-4" style={{ height: '100vh' }}>
                        {
                            this.state.details ?
                                <ItemDetails
                                    item={this.state.details}
                                    handleBackClick={this.handleBackClick}
                                    locations={this.state.locations}
                                    addLocationMarkers={this.addLocationMarkers}
                                /> :
                                <ItemList items={this.state.items} onItemClick={this.handleItemClick} />
                        }
                    </div>
                    <div className="column is-8">
                        <div key="map" id="MapContainer" className="hero is-fullheight">
                            <div id="Map" className="hero-body" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
