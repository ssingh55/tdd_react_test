import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TodoItems extends Component {
    delete(key) {
        this.props.delete(key);
    }
    check(key) {
        this.props.check(key);
    }
    render() {
        return this.props.items ? (
            <ul>
                {
                    this.props.items.map((item, index) => (
                        <li key={index}> 
                            <input type="checkbox" onChange={(e) => this.check(item.key)} />
                            <span style={{ 'textDecoration': item.isDone ? 'line-through' : 'none', checked: this.props.checked }}>{item.text}
                            </span>
                            <button onClick={() => this.delete(item.key)}>x</button>
                        </li>
                    ))
                }
            </ul>
        )
            : null;
    }
}
TodoItems.propType = {
    items: PropTypes.array.isRequired
}