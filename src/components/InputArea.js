import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InputArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
        this.setText = this.setText.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    setText(event) {
        this.setState({ text: event.target.value })
    }
    handleClick() {
        this.props.onSubmit(this.state.text);
        this.setState({     //to make input box empty
            text: ''
        })
    }
    render() {
        return (
            <div>
                <input type="text" value={this.state.text} onChange={this.setText} />
                <button onClick={this.handleClick}>Add</button>
            </div>
        )
    }
}
InputArea.propType = {
    onSubmit: PropTypes.func.isRequired
};