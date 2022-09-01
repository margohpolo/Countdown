import React from 'react';
import moment from 'moment';

class Countdown extends React.Component {
    constructor(props) {
        super(props);
        let dateTimeNow;
        this.state = {dateTimeNow};     
    }
    componentDidMount() {
        this.intervalID = setInterval(() => this.tick(), 1000);
    }
    componentWillUnmount(){
        clearInterval(this.intervalID);
    }

    tick() {
        this.setState({
            dateTimeNow: moment().toString()
        });
    }
    render() {
        const {dateTimeNow} = this.state;
        const timeLeftSecs = moment("20220928 17:00:00", "YYYYMMDD hh:mm:ss").diff(dateTimeNow, 'seconds');
        const timeLeftDays = Math.floor(timeLeftSecs/(60*60*24));
        const timeLeftDaysRemainer = timeLeftSecs%(60*60*24);
        let timeLeftHours, timeLeftMinutes, timeLeftSeconds;
        if (timeLeftDaysRemainer > 0) {            
            timeLeftHours = Math.floor(timeLeftDaysRemainer/(60*60));
            const timeLeftHoursRemainer = timeLeftDaysRemainer%(60*60);
            if (timeLeftHoursRemainer > 0) {                    
                timeLeftMinutes = Math.floor(timeLeftHoursRemainer/60);
                timeLeftSeconds = (timeLeftHoursRemainer%60);
            }
        }

        return(
            <div>
                <a>{dateTimeNow}</a>
                <br />
                <a>{'Countdown to Freedom: ' + timeLeftDays + ' days, ' + timeLeftHours + ' hours, ' + timeLeftMinutes + ' minutes, ' + timeLeftSeconds + ' seconds'}</a>
            </div>
        );
    }

}

export default Countdown;