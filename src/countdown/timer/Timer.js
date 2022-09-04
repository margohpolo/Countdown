import { render } from '@testing-library/react';
import React from 'react';
import './timer.scss';

export default class Timer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    render() {

        return(
            <div>
                <a>{this.props.daysLeft + ' days, ' + this.props.hoursLeft + ' hours, ' + this.props.minutesLeft + ' minutes, ' + this.props.secondsLeft + ' seconds'}</a>
                
                
            </div>
        );
    }
}

