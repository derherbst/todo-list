import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {


	maxId = 100;

	state = {
		toDoData: [
			{label: 'Drink Coffee', important: false, id: 1},
			{label: 'Make Awesome App', important: true, id: 2},
			{label: 'Have a Lunch', important: false, id: 3}
		]
	};

	deleteItem = (id) => {
		this.setState(({ toDoData }) => {
			const idx = toDoData.findIndex((el) => el.id === id);
			// так делать нелья потому что нельзя изменять существующий state
			// toDoData.splice(idx, 1); // начиная с индекса элемента массива idx (не включительно) вырезаем один элемент

			const before = toDoData.slice(0, idx); // начиная с инлекса 0 оставляем все до индекса idx
			const after = toDoData.slice(idx + 1);

			const newArray = [...before, ...after];

			return {
				toDoData: newArray
			}
		})
	};

	addItem = (text) => {

		const newItem = {
			label: text,
			important: false,
			id: this.maxId++
		};

		this.setState(({ toDoData }) => {
			const newArray = [
				...toDoData,
				newItem
			];

			return {
				toDoData: newArray
			}
		})
		// console.log('Added', text)
	};

	render() {
		return (
			<div className='todo-app'>
				<AppHeader toDo={1} done={3} />
				<div className='top-panel d-flex'>
					<SearchPanel/>
					<ItemStatusFilter />
				</div>
				<TodoList
					todos={this.state.toDoData}
					onDeleted={ this.deleteItem }
				/> {/* здесь передаем props в компонент ToDoList */}
				<ItemAddForm
					onItemAdded={ this.addItem }
				/>
			</div>
		)
	}
};

// const el = (
//     <App/>
// );

// const el = React.createElement('h1', null, 'Hello World');