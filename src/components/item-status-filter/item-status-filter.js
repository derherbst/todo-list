import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

	// state = {
	// 	isActive: 'active'
	// };

	buttons = [
		{ name: 'all', label: 'All'},
		{ name: 'active', label: 'Active'},
		{ name: 'done', label: 'Done'}
	];

	render() {

		const { filterItems } = this.props;

		const buttonsList = this.buttons.map((el) => {
			const isActive = filterItems === el.name;
			const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';
			return(
				 <button type="button"
				       	 className={`btn ${ clazz }`}
				         key={el.name}
				         onClick={() => this.props.onFilterChange(el.name)}
				 >{el.label}
		         </button>
			)
		});

		return (
			<div className="btn-group">
				{ buttonsList }
			</div>
		);
	}
}