import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import TodoItems from './TodoItems';
import InputArea from './InputArea';

export default class TodoApp extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            counter: 0
        };
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.checkTask = this.checkTask.bind(this);
    }

    addTask(name) {
        var c = this.state.counter;
        var newTask = {
            text: name,
            isDone: false,
            key: c++
        }
        this.setState({
            items: this.state.items.concat(newTask),
            counter: c
        });
    }

    deleteTask(key) {
        var filteredItems = this.state.items.filter(function (item) {
            return (item.key !== key);
        });
        this.setState({
            items: filteredItems
        })
    }

    checkTask(key) {
        var checkedItem = this.state.items.map((item)=>{
            if(item.key===key)
                item.isDone=!item.isDone;
            return item;
        })
        this.setState({
            items: checkedItem
        })
    }

    render() {
        return (
            <div>
                <InputArea onSubmit={this.addTask} />
                <TodoItems items={this.state.items} delete={this.deleteTask} check={this.checkTask}/>
            </div>
        )
    }
}