import React from 'react';
import { dsvFormat } from 'd3-dsv';
import { keyBy } from 'lodash/collection';

import ItemDetails from 'containers/ItemDetails';
import ItemList from 'containers/ItemList';
import initMap from 'containers/Map';
import itemData from 'files/items.csv';
import locationData from 'files/locations.csv';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            map: null,
            items: {},
            locations: {},
            details: null
        };

        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    componentDidMount() {
        const xhrItems = new XMLHttpRequest();
        xhrItems.open('GET', itemData);
        xhrItems.responseType = 'text/csv';
        xhrItems.onload = () => {
            this.setState({
                items: keyBy(dsvFormat(';')
                    .parse(xhrItems.response), 'id')
            });
        };
        xhrItems.send();

        const xhrLocations = new XMLHttpRequest();
        xhrLocations.open('GET', locationData);
        xhrLocations.responseType = 'text/csv';
        xhrLocations.onload = () => {
            this.setState({
                locations: keyBy(dsvFormat(';')
                    .parse(xhrLocations.response), 'id')
            });
        };
        xhrLocations.send();

        const map = initMap(this.context.store);

        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({ map }, () => {
            setTimeout(() => this.state.map.invalidateSize(), 1000);
        });
    }

    handleBackClick() {
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
