import React from 'react';
import SearchIcon from '../icons/SearchIcon';
import IconButton from '../buttons/IconButton';

class SearchInput extends React.Component {
    render() {
        return (
            <div className="pes-search">
                <input
                    type="text"
                    className="pes-search__input"
                    ref={input => this.input = input}
                    onChange={evt => this.props.onChange(evt.target.value)} />
                <IconButton
                    className="pes-search__icon"
                    onClick={() => this.props.onChange(this.input.value)}>
                    <SearchIcon />
                </IconButton>
            </div>
        );
    }
};

export default SearchInput;