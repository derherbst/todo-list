import React from "react";

import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => { /* с помощью деструктуризации забираем массив объектов из App*/

    // перебираем все объекты в массиве todos
    const elements = todos.map((item) => {
        const { id, ...itemProps } = item; // деструктурируем объект item. значение id будет передано в переменную id,
        // все остальные значения (label и important) передаются через rest оператор в ...itemProps

        return (
            <li key={id} className='list-group-item'>
                <TodoListItem
                    { ...itemProps }
                    onDeleted={() => onDeleted(id)}
	                onToggleImportant = {() => onToggleImportant(id)}
                    onToggleDone = {() => onToggleDone(id)}// вызываем функцию переданную в пропсы из App.
                />
            </li>
        )
    });

    return (
        <ul className='list-group todo-list'>
            { elements } {/* здесь выводим преобразованный массив elements */}
        </ul>
    );
};

export default TodoList;