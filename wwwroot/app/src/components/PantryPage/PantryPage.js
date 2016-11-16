import React, { Component } from 'react';

export default class PantryPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        };
    }

    twoDigits(value) {
        return ('0' + value).slice(-2);
    }

    formatDate(dateString) {
        var date = new Date(dateString);
        var twoDigits = this.twoDigits;
        
        return `Exp: ${twoDigits(date.getDate())}.${twoDigits(date.getMonth() + 1)}.${date.getFullYear()}`;
    }

    renderPantryItem(item) {
        return (
            <div className="pantry__item" key={item.id}>
                <div className="pantry__item-img">
                </div>
                <div className="pantry__item-details">
                    <div className="pantry__item-name">
                        {item.name}
                    </div>
                    <div className="pantry__item-expiration">
                        {this.formatDate(item.expiration)}
                    </div>
                </div>
            </div>
        );
    }

    renderPantryList(list) {
        var _this = this;
        return (
            <div key={list.key} className="pantry__list">
                <div className="pantry__list-title">
                    {list.title}
                </div>
                <div className="pantry__items">
                    {list.items.map(item => _this.renderPantryItem(item))}
                </div>
            </div>
        );

    }

    render() {
        var _this = this;
        return (
            <div className="pantry__lists">
                {this.props.pantry.lists.map(pantryList => _this.renderPantryList(pantryList))}
            </div>
        );

    }
}