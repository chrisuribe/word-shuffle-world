import React, { Component } from 'react';
import Clear from '@material-ui/icons/Clear';
import RoundedButton from './RoundedButton';


class ClearButton extends Component {
    render() {
        return (
                <RoundedButton>
                     <Clear />
                </RoundedButton>
        );
    }
}

export default ClearButton;
