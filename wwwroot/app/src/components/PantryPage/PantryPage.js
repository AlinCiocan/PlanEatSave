import React, { Component } from 'react';
// import { ApiRequest } from '../../services/ApiRequest';
// import ApiRequestsErrorHandler from '../../services/ApiRequestsErrorHandler';
import './pantry.css';
import TopBar from '../TopBar/TopBar';


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

    renderPantryItem(item) {
        return (
            <div className="pantry__item">
                <div className="pantry__item-img">
                </div>
                <div className="pantry__item-details">
                    <div className="pantry__item-name">
                        {item.name}
                    </div>    
                     <div className="pantry__item-expiration">
                        {item.expiration}
                    </div>    
                </div>
            </div>
        );
    }

    renderPantryList(list) {
        var _this = this;
        return (
            <div key={list.id} className="pantry__list">
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
            <div>
                <TopBar />
                <div className="pantry__lists">
                    {this.state.pantry.lists.map(pantryList => _this.renderPantryList(pantryList))}
                </div>
            </div>
        );

    }
}