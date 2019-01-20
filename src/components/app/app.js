import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

	maxId = 1;

	state = {
		toDoData: [
			this.createTodoItem('Drink Coffee'),
			this.createTodoItem('Make Awesome App'),
			this.createTodoItem('Have a Lunch')
		],
		term: '',
		filterStatus: 'all'
	};

	createTodoItem(label) {
		return {
			label,
			important: false,
			done: false,
			id: this.maxId++,
			hidden: false
		}
	}

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

		const newItem = this.createTodoItem(text);

		this.setState(({ toDoData }) => {
			const newArray = [
				...toDoData,
				newItem
			];

			return {
				toDoData: newArray
			}
		})
	};

	toggleProperty = (arr, id, propName) => {
		console.log(this);
		const idx = arr.findIndex((el) => el.id === id);

		// 1. обновляем объект
		const oldItem = arr[idx];
		const newItem = {...oldItem, [propName]: !oldItem[propName]}; // с помощью spread забираем все данные из oldItem и перезаписываем свойство done новым

		// 2. создаем новый массив
		return [
			...arr.slice(0, idx),
			newItem,
			...arr.slice(idx+1)
		];
	};

	onToggleDone = (id) => {
		console.log(this);
		this.setState(({ toDoData }) => {
			return {
				toDoData: this.toggleProperty(toDoData, id, 'done')
			}
		})
	};

	onToggleImportant = (id) => {
		this.setState(({ toDoData }) => {
			return {
				toDoData: this.toggleProperty(toDoData, id, 'important')
			}
		})
	};

	onSearchChange = (value) => {
		this.setState({
			term: value
		})
	};

	onFilterChange = (value) => {
		console.log(value);
		this.setState({
			filterStatus: value
		})
	};

	filterItems(items, status) {
		switch(status) {
			case 'all':
				return items;
			case 'active':
				return items.filter((el) => !el.done);
			case 'done':
				return items.filter((el) => el.done);
			default:
				return items
		}
	};

	search(items, term) {
		if (term.length === 0) {
			return items;
		}

		return items.filter((el) => el.label.includes(term))
	}

	render() {
		const { toDoData, term, filterStatus } = this.state;
		const visibleItems = this.filterItems(this.search(toDoData, term), filterStatus);
		const doneCount = toDoData.filter((item) => item.done).length;
		const todoCount = toDoData.length - doneCount;

		return (
			<div className='todo-app'>
				<AppHeader toDo={todoCount} done={doneCount} />
				<div className='top-panel d-flex'>
					<SearchPanel
						onSearch={ this.onSearchChange }
					/>
					<ItemStatusFilter
						filterItems={ filterStatus }
						onFilterChange={this.onFilterChange}
					/>
				</div>
				<TodoList
					todos={ visibleItems }
					onDeleted={ this.deleteItem }
					onToggleImportant={ this.onToggleImportant }
					onToggleDone={ this.onToggleDone }

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