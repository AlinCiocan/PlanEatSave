import React, { Component } from 'react';
import TopBar from '../TopBar/TopBar';
import { ApiRequest } from '../../services/ApiRequest';
import PantryItem from './PantryItem';
import {Link} from 'react-router';

export default class PantryUpdateItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: this.getLoadingItemMsg(),
            isItemVisible: false,
            item: {}
        };

        this.onItemChange = this.onItemChange.bind(this);
    }

    componentDidMount() {
        ApiRequest
            .retrievePantryItemById(this.props.params.itemId)
            .then(
                rsp => {
                    if(!rsp.body) {
                        this.setState({message: this.getPantryItemNotFoundMsg()})
                        return;
                    }

                    this.setState({isItemVisible: true, message: null, item: rsp.body});                    
                },
                err => {
                    console.log(err);
                    this.setState({ message: this.getErrorMessage(err), isItemVisible: true, item: {} });
                }
            );
    }

    onSelectDate(newDate) {
        this.setState({ expiration: newDate });
    }

    saveItem() {
        this.setState({ message: this.getLoadingMsg(), isItemVisible: false });

        let item = Object.assign({}, this.state.item, { pantryId: this.props.params.pantryId, id: this.props.params.itemId });

        ApiRequest
            .updatePantryItem(item)
            .then(
            rsp => {
                this.props.router.push('/pantry');
            }, err => {
                console.log(err);
                this.setState({ message: this.getErrorMessage(err), isItemVisible: true, item: item });
            });
    }

    getPantryItemNotFoundMsg() {
        return (<h3> We could not found your item id. Please go to your <Link to="/pantry"> pantry </Link> </h3>);
    }

    getErrorMessage(err, item) {
        return (
            <h3 style={{ color: 'red' }}> There was an error with our server. Please try again! </h3>
        );
    }

    getLoadingMsg() {
        return (<h3> Updating your item... </h3>);
    }

    getLoadingItemMsg() {
        return (<h3> Loading your item from the pantry... </h3>);
    }

    getSaveButton() {
        return (<div className="top-bar__side top-bar__side--right" onClick={() => this.saveItem()}> SAVE </div>);
    }

    getBackButton() {
        return (
            <div className="top-bar__side top-bar__side--left" onClick={() => this.props.router.push('/pantry')}>
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
                &nbsp; Edit pantry
            </div>
        );
    }

    onItemChange(newItem) {
        this.setState({ item: newItem });
    }

    getItemDetails() {
        return (
            <PantryItem item={this.state.item} onItemChange={this.onItemChange} />
        );
    }

    renderItemForm() {
        if (this.state.isItemVisible) {
            return this.getItemDetails();
        }
    }


    render() {
        return (
            <div>
                <TopBar leftSide={this.getBackButton()} rightSide={this.getSaveButton()} />

                {this.state.message}

                {this.renderItemForm()}
            </div>
        );
    }

}