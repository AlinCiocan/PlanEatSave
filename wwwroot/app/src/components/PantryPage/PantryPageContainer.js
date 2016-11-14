import React, { Component } from 'react';
import PantryPage from './PantryPage';
import { ApiRequest } from '../../services/ApiRequest';
import TopBar from '../TopBar/TopBar';

export default class PantryPageContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pantry: null
        };
    }

    componentDidMount() {
        ApiRequest.getPantry().then(response => {
            console.log('response pantry', response);
            let pantryDb = response.body;


            let pantry = {
                lists: [{
                    id: pantryDb.id,
                    title: `All products (${pantryDb.pantryItems.length})`,
                    items: pantryDb.pantryItems
                }]
            };


            this.setState({ pantry });
        }, err => {
            console.log(err);
        });
    }

    renderPantry() {
        if (this.state.pantry == null) {
            return (<h3> Loading... </h3>);
        }

        return (<PantryPage pantry={this.state.pantry} />)
    }

    getAddPantryItemButton() {
        return (
            <button className="top-bar__side top-bar__side--right add-pantry-item"
                    onClick={() => this.props.router.push(`/pantry/${this.state.pantry.lists[0].id}/add-item`)}>+</button>
        );
    }

    render() {
        return (
            <div>
                <TopBar rightSide={this.getAddPantryItemButton()} />
                {this.renderPantry()}
            </div>
        );


    }


}