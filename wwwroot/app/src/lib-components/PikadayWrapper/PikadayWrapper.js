import React, { Component } from 'react';
import Pikaday from 'pikaday';
import './pikaday.css';

export default class PikadayWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            picker: null
        };
    }

    componentDidMount() {
        var _this = this;
         var picker = new Pikaday({ field: this.refs.datepickerInput, onSelect: () =>  _this.onSelect()});
         this.setState({ picker });
    }


    render() {
        return (
            <input type="text" ref="datepickerInput" />
        );
    }    

}