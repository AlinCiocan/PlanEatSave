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
        let pantryResponse = ApiRequest.getPantry();
        this.setState({pantry: pantryResponse.pantry});
    }    
    
    renderPantry() {
        if (this.state.pantry == null) {
            return (<h3> Loading... </h3>);
        }

        return (<PantryPage pantry={this.state.pantry}/>)
    }

    render() {
        return (
            <div>
                <TopBar />
                {this.renderPantry()}
            </div>
        );


    }


}