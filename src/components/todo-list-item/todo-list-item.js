import React, { Component } from "react";

import './todo-list-item.css';

export default class TodoListItem extends Component {

	// constructor() {
	// 	super();
	//
	// 	this.state = {
	// 		done: false
	// 	}
	//
	// 	// this.onLabelClick = () => {
	// 	// 	console.log(`Done: ${this.props.label}`)
	// 	// }
	// }

	state = { // новый синтаксис чтобы не объявлять все в конструкторе
		done: false,
		important: false
	};

	onLabelClick = () => { // новый стандарт (поля классов/ class fields)
		this.setState(({ done }) => { // state нельзя изменять после инициализации. чтобы его изменить используем функцию setState
			// передаем в качестве аругемента не объект, а функцию потому что нам необъолдимо изменять состояние в зависимости от предыдущего состояния
			return {
				done: !done
			}
		})
	};

	onMarkImportant = () => {
		this.setState((state) => {
			return {
				important: !state.important
			}
		})
	};

	render() { // функция отрисовывает контент. тоже самое что и в теле функции до этого

		const { label, onDeleted } = this.props;
		const { done, important } = this.state;

		let classNames = `todo-list-item ${done ? 'done' : ''} ${important ? 'important' : ''}`;

		return (
			<span className={ classNames }>
            <span
	            className="todo-list-item-label"
                onClick={ this.onLabelClick }>
            {label}
            </span>

            <button type="button"
                    className="btn btn-outline-success btn-sm float-right"
                    onClick={ this.onMarkImportant }>
                <i className="fa fa-exclamation" />
            </button>

            <button type="button"
                    className="btn btn-outline-danger btn-sm float-right"
                    onClick={onDeleted} // подставляем функцию переданную в пропсы из Todo list
            >
                <i className="fa fa-trash-o" />
            </button>
        </span>
		);
	}
}