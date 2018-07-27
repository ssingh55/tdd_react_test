import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class BeerListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beers: []
        }
        this.addItem = this.addItem.bind(this);
    }
    addItem(name) {
        this.setState({
            beers: this.state.beers.concat([name])
        })
    }
    render() {
        return (
            <div>
                <InputArea onSubmit={this.addItem} />
                <BeerList items={this.state.beers}/>
            </div>
        )
    }
}

export class InputArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
        this.setText = this.setText.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    setText(e) {
        this.setState({ text: e.target.value });
    }
    handleClick() {
        this.props.onSubmit(this.state.text)
    }

    render() {
        return (
            <div>
                <input value={this.state.text} onChange={this.setText} />
                <button onClick={this.handleClick}>Add</button>
            </div>
        )
    }
}
InputArea.propType = {
    onSubmit: PropTypes.func.isRequired
};

export class BeerList extends Component {
    render() {
        return this.props.items ? (
            <ul>
                {
                    this.props.items.map((item,index) => (
                        <li key={index}>{item}</li>
                    ))
                }
                </ul>
        )
        : null;

    }
}
BeerList.propType = {
    items: PropTypes.array.isRequired
};