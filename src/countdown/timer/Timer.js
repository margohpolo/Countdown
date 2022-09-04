import { render } from '@testing-library/react';
import React from 'react';
import * as TimeEnum from '../Common/TimeEnum';
// import './timer.scss';
import * as d3 from 'd3';

export default class Timer extends React.Component {

    constructor(props) {
        super(props);
    }

    makeDonuts() {
        var dataset1 = [
            {label: 'Seconds Left', count: this.props.secondsLeft*100/TimeEnum.Seconds},
            {label: 'Seconds Elapsed', count: (TimeEnum.Seconds - this.props.secondsLeft)*100/TimeEnum.Seconds}
        ];
        var dataset2 = [
            {label: 'Minutes Left', count: this.props.minutesLeft*100/TimeEnum.Minutes},
            {label: 'Minutes Elapsed', count: (TimeEnum.Minutes - this.props.minutesLeft)*100/TimeEnum.Minutes}
        ];
        var dataset3 = [
            {label: 'Hours Left', count: this.props.hoursLeft*100/TimeEnum.Hours},
            {label: 'Hours Elapsed', count: (TimeEnum.Hours - this.props.hoursLeft)*100/TimeEnum.Hours}
        ];
        var dataset4 = [
            {label: 'Days Left', count: this.props.daysLeft*100/31},
            {label: 'Days Elapsed', count: (31 - this.props.daysLeft)*100/31}
        ];
        var width = 200;
        var height = 200;
        var donutWidth = 25;
        var radius1 = Math.min(width, height) / 2;
        var radius2 = radius1 - donutWidth;
        var radius3 = radius2 - donutWidth;
        var radius4 = radius3 - donutWidth;
        var color1 = d3.scaleOrdinal(["#3182bd","#9ecae1"]);
        var color2 = d3.scaleOrdinal(["#31a354","#a1d99b"]);
        var color3 = d3.scaleOrdinal(["#756bb1","#bcbddc"]);
        var color4 = d3.scaleOrdinal(["#636363","#bdbdbd"]);
        var svg = d3.select('#chart')
            .append('svg')
            .attr('width', width)
            .attr('height', height);
            
        var svg1 = svg.append('g')
            .attr('transform', 'translate(' + (width / 2) + 
            ',' + (height / 2) + ')');
        var svg2 = svg.append('g')
            .attr('transform', 'translate(' + (width / 2) + 
            ',' + (height / 2) + ')');
        var svg3 = svg.append('g')
            .attr('transform', 'translate(' + (width / 2) + 
            ',' + (height / 2) + ')');
        var svg4 = svg.append('g')
            .attr('transform', 'translate(' + (width / 2) + 
            ',' + (height / 2) + ')');

        var arc1 = d3.arc()
            .innerRadius(radius1 - donutWidth)  
            .outerRadius(radius1);
        var arc2 = d3.arc()
            .innerRadius(radius2 - donutWidth)  
            .outerRadius(radius2);
        var arc3 = d3.arc()
            .innerRadius(radius3 - donutWidth)  
            .outerRadius(radius3);
        var arc4 = d3.arc()  
            .outerRadius(radius4);
        var pie = d3.pie()
            .padAngle(0)
            .value(function(d) {return d.count;})
            .sort(null);
        var path1 = svg1.selectAll('path')
            .data(pie(dataset1))
            .enter()
            .append('path')
            .attr('d', arc1)
            .attr('fill', function(d, i) {return color1(d.data.label)});
        var path2 = svg2.selectAll('path')
            .data(pie(dataset2))
            .enter()
            .append('path')
            .attr('d', arc2)
            .attr('fill', function(d, i) {return color2(d.data.label)});
        var path3 = svg3.selectAll('path')
            .data(pie(dataset3))
            .enter()
            .append('path')
            .attr('d', arc3)
            .attr('fill', function(d, i) {return color3(d.data.label)});
        var path4 = svg4.selectAll('path')
            .data(pie(dataset4))
            .enter()
            .append('path')
            .attr('d', arc4)
            .attr('fill', function(d, i) {return color4(d.data.label)});
    }

    render() {
        if(d3.selectAll('svg')) {            
            d3.selectAll('svg').remove();
        }
        this.makeDonuts();
        return(
            <div>
            <script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.4.6/d3.min.js" data-semver="3.4.6" data-require="d3@*" />
                <a>{this.props.daysLeft + ' days, ' + this.props.hoursLeft + ' hours, ' + this.props.minutesLeft + ' minutes, ' + this.props.secondsLeft + ' seconds'}</a>
                <br />
                <br />
                <div id="chart" />
            </div>
        );
    }
}

