import React, { Component } from 'react';
// import { ApiRequest } from '../../services/ApiRequest';
// import ApiRequestsErrorHandler from '../../services/ApiRequestsErrorHandler';
import './pantry.css';

export default class PantryPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pantry: {
                lists: [{
                    id: 'pantry-list-1',
                    title: 'All products (59)',
                    items: [
                        newItem('Quinoa', '09.09.2016'),
                        newItem('Organic Coconut Milk', '29.10.2016'),
                        newItem('Vanilla Beans', '09.12.2016'),
                        newItem('Cardamom', '08.01.2017'),

                        newItem('Quinoa 2', '09.09.2018'),
                        newItem('Organic Coconut Milk 2', '29.10.2018'),
                        newItem('Vanilla Beans 2', '09.12.2018'),
                        newItem('Cardamom 2', '08.01.2018')
                    ]
                }]
            }
        };

        function newItem(name, exp) {
            return { name, expiration: 'Exp: ' + exp };
        }

    }

    renderPantryList(list) {
        return (
            <div key={list.id} className="pantry__list">
                <div className="pantry__list-title">
                    {list.title}
                </div>
                <div className="pantry__items">
                    {list.items.map((x) => (<p> {x.name + ' ' + x.expiration} </p>))}
                </div>
            </div>
        );

    }

    render() {
        var _this = this;
        return (
            <div>
                <div className="top-bar">

                </div>
                <div className="pantry__lists">
                    {this.state.pantry.lists.map((pantryList) => _this.renderPantryList(pantryList))}
                </div>
            </div>
        );

    }
}