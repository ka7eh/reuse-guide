import React from 'react';
import PropTypes from 'prop-types';

import { filter } from 'utils/collection';

class ItemList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: props.items
        };

        this.search = this.search.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ items: nextProps.items });
    }

    search() {
        const items = this.searchInput.value ?
            filter(
                this.props.items,
                item => item.name
                    .toLowerCase()
                    .includes(this.searchInput.value.toLowerCase())
            ) :
            this.props.items;
        this.setState({
            items
        });
    }

    render() {
        return (
            <div className="section">
                <div className="field">
                    <div className="control">
                        <div className="is-fullwidth">
                            <input
                                ref={(c) => {
                                    this.searchInput = c;
                                }}
                                className="input"
                                type="text"
                                placeholder="Search"
                                onChange={this.search}
                            />
                        </div>
                    </div>
                </div>
                {
                    Object.keys(this.state.items).length ?
                        <div
                            style={{
                                height: window.innerHeight * 0.7,
                                overflowY: 'auto'
                            }}
                        >
                            <table className="table is-striped is-hoverable">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Object.entries(this.state.items)
                                            .map(([idx, item]) => (
                                                <tr key={idx}>
                                                    <td>
                                                        <a href="#" onClick={() => this.props.onItemClick(idx)}>
                                                            {item.name}
                                                        </a>
                                                    </td>
                                                    <td>{item.details}</td>
                                                </tr>
                                            ))
                                    }
                                </tbody>
                            </table>
                        </div> :
                        null
                }
            </div>
        );
    }
}

ItemList.propTypes = {
    items: PropTypes.shape({}).isRequired,
    onItemClick: PropTypes.func.isRequired
};

export default ItemList;
