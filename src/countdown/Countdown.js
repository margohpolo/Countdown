import React from 'react';
import moment from 'moment';
import * as TimeEnum from './Common/TimeEnum';
import Timer from './timer/Timer';

export default class Countdown extends React.Component {
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
            dateTimeNow: moment().toString(),
        });
    }
    
    render() {
        const {dateTimeNow} = this.state;
        const timeLeftSecs = moment("20220928 17:00:00", "YYYYMMDD hh:mm:ss").diff(dateTimeNow, 'seconds');
        const timeLeftDays = Math.floor(timeLeftSecs/(TimeEnum.Seconds*TimeEnum.Minutes*TimeEnum.Hours));
        const timeLeftDaysRemainer = timeLeftSecs%(TimeEnum.Seconds*TimeEnum.Minutes*TimeEnum.Hours);
        let timeLeftHours, timeLeftMinutes, timeLeftSeconds;
        if (timeLeftDaysRemainer > 0) {            
            timeLeftHours = Math.floor(timeLeftDaysRemainer/(TimeEnum.Seconds*TimeEnum.Minutes));
            const timeLeftHoursRemainer = timeLeftDaysRemainer%(TimeEnum.Seconds*TimeEnum.Minutes);
            if (timeLeftHoursRemainer > 0) {                    
                timeLeftMinutes = Math.floor(timeLeftHoursRemainer/TimeEnum.Seconds);
                timeLeftSeconds = (timeLeftHoursRemainer%TimeEnum.Seconds);
            }
        }
        

        return(
            <div>
                <a>{'The DateTime now is: ' + dateTimeNow}</a>
                <br />
                <br />
                <h3>Countdown to Freedom - <br />Days : Hours : Minutes : Seconds</h3>
                <br />
                <Timer 
                    daysLeft = {timeLeftDays}
                    hoursLeft = {timeLeftHours}
                    minutesLeft = {timeLeftMinutes}
                    secondsLeft = {timeLeftSeconds}
                />
            </div>
        );
    }

}

