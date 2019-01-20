import React, { Component } from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {

	state = {
		label: ''
	};

	onLabelChange = (e) => {
		this.setState({
			label: e.target.value
		});
		console.log(this.state.label);
	};

	onSubmit = (e) => {
		e.preventDefault();
		this.props.onItemAdded(this.state.label);
		this.setState({
			label: ''
		})
	};

	render() {
		return (
			<form className="item-add-form d-flex"
			      onSubmit={this.onSubmit}
			>
				<input type="text"
				       className='form-control'
				       onChange={this.onLabelChange}
				       placeholder='What need too be done'
				       value={this.state.label}
				/>
				<button type="submit"
				        className="btn btn-outline-secondary"
				>Add Item</button>
			</form>
		);
	}
}