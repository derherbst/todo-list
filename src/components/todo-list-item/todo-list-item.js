import React from "react";

import './todo-list-item.css';

const TodoListItem = ({important, done, label, onDeleted, onToggleImportant, onToggleDone}) => {

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

	// state = { // новый синтаксис чтобы не объявлять все в конструкторе
	// 	done: false,
	// 	important: false
	// };

	// onLabelClick = () => { // новый стандарт (поля классов/ class fields)
	// 	this.setState(({ done }) => { // state нельзя изменять после инициализации. чтобы его изменить используем функцию setState
	// 		// передаем в качестве аругемента не объект, а функцию потому что нам необъолдимо изменять состояние в зависимости от предыдущего состояния
	// 		return {
	// 			done: !done
	// 		}
	// 	})
	// };
	//
	// onMarkImportant = () => {
	// 	this.setState((state) => {
	// 		return {
	// 			important: !state.important
	// 		}
	// 	})
	// };

	let classNames = 'todo-list-item';
	if (important) {
		classNames += ' important';
	}

	if (done) {
		classNames += ' done';
	}

	return (
		<span className={ classNames }>
            <span
	            className="todo-list-item-label"
                onClick={ onToggleDone }>
            {label}
            </span>

            <button type="button"
                    className="btn btn-outline-success btn-sm float-right"
                    onClick={ onToggleImportant }>
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
};

export default TodoListItem;