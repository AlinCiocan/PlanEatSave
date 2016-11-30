import React, { Component } from 'react';
import Pikaday from 'pikaday';
import './pikaday.css';

export default class PikadayWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            picker: null,
            date: null
        };
    }

    onSelect(date) {
        this.setState({date});
        this.props.onSelect(date);
    }

    componentDidMount() {
        var date = this.props.defaultValue? this.props.defaultValue : new Date();

        var picker = new Pikaday({ 
             field: this.refs.datepickerInput,
             defaultDate: date,
             setDefaultDate: true,
             onSelect: (date) =>  this.onSelect(date)
            });

         this.setState({ picker });
    }

    render() {
        return (
            <input type="text" ref="datepickerInput" className={this.props.className}/>
        );
    }    

}