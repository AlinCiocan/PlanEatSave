import React, { Component } from 'react';
import { Link } from 'react-router';
import TopBar from '../TopBar/TopBar';
import { ApiRequest } from '../../services/ApiRequest';
import Routes from '../../services/Routes';
import PantryItem from './PantryItem';
import EmptyItemNameAlert from './EmptyItemNameAlert';

export default class PantryUpdateItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: this.getLoadingItemMsg(),
            isItemVisible: false,
            item: {},
            shouldDisplayIsItemNameEmptyAlert: false
        };

        this.onItemChange = this.onItemChange.bind(this);
    }

    componentDidMount() {
        ApiRequest
            .retrievePantryItemById(this.props.params.itemId)
            .then(
            rsp => {
                if (!rsp.body) {
                    this.setState({ message: this.getPantryItemNotFoundMsg() })
                    return;
                }

                this.setState({ isItemVisible: true, message: null, item: rsp.body });
            },
            err => {
                console.log(err);
                this.setState({ message: this.getErrorMessage(err), isItemVisible: true, item: {} });
            });
    }

    onSelectDate(newDate) {
        this.setState({ expiration: newDate });
    }

    saveItem() {
        if (!this.state.item.name) {
            this.setState({ shouldDisplayIsItemNameEmptyAlert: true });
            return;
        }

        this.setState({ message: this.getLoadingMsg(), isItemVisible: false });
        let item = { ...this.state.item, pantryId: this.props.params.pantryId, id: this.props.params.itemId };

        ApiRequest
            .updatePantryItem(item)
            .then(
            rsp => {
                this.props.router.push(Routes.myPantry());
            }, err => {
                console.log(err);
                this.setState({ message: this.getErrorMessage(err), isItemVisible: true });
            });
    }

    getPantryItemNotFoundMsg() {
        return (<h3> We could not found your item id. Please go to your <Link to={Routes.myPantry()}> pantry </Link> </h3>);
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
                <TopBar
                    hideLogo
                    backButton backButtonText="Edit pantry" backButtonOnClick={() => this.props.router.push(Routes.myPantry())}
                    saveButton saveButtonOnClick={() => this.saveItem()} />

                <div className="row">
                    {this.state.message}

                    {this.renderItemForm()}
                </div>

                <EmptyItemNameAlert
                    isOpen={this.state.shouldDisplayIsItemNameEmptyAlert}
                    onAction={() => this.setState({ shouldDisplayIsItemNameEmptyAlert: false })}
                />
            </div>
        );
    }

}