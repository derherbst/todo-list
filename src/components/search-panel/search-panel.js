import React, { Component } from "react";

import './search-panel.css'

export default class SearchPanel extends Component {

    state = {
	    label: ''
    };

    onLabelChange = (e) => {
	    this.setState({
		    label: e.target.value
	    });
	    this.props.onSearch(e.target.value);
    };

    render() {
	    return (
		    <input type="text"
		           className="form-control search-input"
		           placeholder='Type here to search'
		           onChange={this.onLabelChange}
		           value={this.state.label}
		    />
	    )
    }
};