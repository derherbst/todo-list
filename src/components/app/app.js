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
		]
	};

	createTodoItem(label) {
		return {
			label,
			important: false,
			done: false,
			id: this.maxId++
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

	toggleProperty(arr, id, propName) {
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

	render() {

		const { toDoData } = this.state;

		console.log(toDoData)

		const doneCount = toDoData.filter((item) => item.done).length;
		const todoCount = toDoData.length - doneCount;

		return (
			<div className='todo-app'>
				<AppHeader toDo={todoCount} done={doneCount} />
				<div className='top-panel d-flex'>
					<SearchPanel/>
					<ItemStatusFilter />
				</div>
				<TodoList
					todos={toDoData}
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