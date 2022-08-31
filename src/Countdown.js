import React from 'react';
import moment from 'moment';

class Countdown extends React.Component {
    constructor(props) {
        super(props);
        let dateTimeNow;
        this.state = {dateTimeNow};     
    }
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    tick() {
        this.setState({
            dateTimeNow: moment().toString()
        });
    }
    render() {
        const {dateTimeNow} = this.state;
        const dateTimeLeft = moment("20220928 17:00:00", "YYYYMMDD hh:mm:ss").diff(dateTimeNow, 'hours').toString();
        return(
            <div>
                <a>{dateTimeNow}</a>
                <br />
                <a>{'Countdown to Freedom: ' + dateTimeLeft + ' hours'}</a>
            </div>
        );
    }

}

export default Countdown;