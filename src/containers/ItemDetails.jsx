import React from 'react';
import PropTypes from 'prop-types';

function ItemDetails(props) {
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
                        height: window.innerHeight * 0.9,
                        overflowY: 'auto'
                    }}
                >
                    <table className="table is-striped is-hoverable">
                        <thead>
                            <tr>
                                <th>Location</th>
                                <th>Contact info</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.item.locations.split(',')
                                .map(locationId => (
                                    <tr key={locationId}>
                                        <td>{props.locations[locationId].location}</td>
                                        <td>{props.locations[locationId].contact}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
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
        locations: PropTypes.string
    }).isRequired,
    locations: PropTypes.shape({}).isRequired,
    handleBackClick: PropTypes.func.isRequired
};

export default ItemDetails;
