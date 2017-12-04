import React from 'react';
import PropTypes from 'prop-types';

function ItemDetails(props) {
    const locationRows = [];
    const locationMarkers = [];
    props.item.locations.forEach((locationId) => {
        locationRows.push((
            <tr key={locationId}>
                <td>{props.locations[locationId].name}</td>
                <td>{props.locations[locationId].essential_notes}</td>
                <td>{props.locations[locationId].address}</td>
                <td>{props.locations[locationId].details}</td>
                <td>{props.locations[locationId].url}</td>
                <td>{props.locations[locationId].phone}</td>
            </tr>
        ));
        locationMarkers.push(props.locations[locationId]);
    });
    props.addLocationMarkers(locationMarkers);
    return (
        <div className="section">
            <div className="field has-addons">
                <div className="control">
                    <button className="button is-primary" onClick={props.handleBackClick}>
                        <i className="fa fa-angle-double-left" />&nbsp;Back To List
                    </button>
                </div>
            </div>
            <div className="content">
                <h2>{props.item.name}</h2>
                <h3>{props.item.details}</h3>
                <div
                    style={{
                        height: window.innerHeight * 0.7,
                        overflowY: 'auto'
                    }}
                >
                    <table className="table is-striped is-hoverable">
                        <thead>
                            <tr>
                                <th>Location</th>
                                <th>Essential Notes</th>
                                <th>Address</th>
                                <th>Details</th>
                                <td>Website</td>
                                <td>Phone</td>
                            </tr>
                        </thead>
                        <tbody>{locationRows}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

ItemDetails.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        details: PropTypes.string.isRequired,
        locations: PropTypes.array
    }).isRequired,
    locations: PropTypes.shape({}).isRequired,
    handleBackClick: PropTypes.func.isRequired,
    addLocationMarkers: PropTypes.func.isRequired
};

export default ItemDetails;
