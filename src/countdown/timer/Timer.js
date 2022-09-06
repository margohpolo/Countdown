import { render } from '@testing-library/react';
import React from 'react';
import * as TimeEnum from '../Common/TimeEnum';
// import './timer.scss';
import * as d3 from 'd3';

export default class Timer extends React.Component {

    constructor(props) {
        super(props);
    }

    // componentDidMount(){
    //     this.makeDonuts();
    // }

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
        const setFiveLabel = this.props.daysLeft.toString() + ' : ' 
                + this.props.hoursLeft.toString() + ' : ' 
                + this.props.minutesLeft.toString() + ' : ' 
                + this.props.secondsLeft.toString();
        var dataset5 = [
            {label: setFiveLabel, count: 0}
        ];
        var width = 360;
        var height = 360;
        var donutWidth = 25;
        var radius1 = Math.min(width, height) / 2;
        var radius2 = radius1 - donutWidth;
        var radius3 = radius2 - donutWidth;
        var radius4 = radius3 - donutWidth;
        //TODO: Brightness gradient: outside brightest; then slowly darker as moving inwards, but all different colors
        //X-TODO: Make all 4 as rings...?
        //X-TODO: Put Countdown Timing in centre -> need to adjust Font & Color
        var color1 = d3.scaleOrdinal(["#61dafb","#333333"]);
        var color2 = d3.scaleOrdinal(["#09dd09","#404040"]);
        var color3 = d3.scaleOrdinal(["#aa47ff","#4d4d4d"]);
        var color4 = d3.scaleOrdinal(["#ce3b51","#666666"]);
        var color5 = d3.scaleOrdinal(["#000000","#000000"]);
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
        var svg5 = svg.append('g')
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
            .innerRadius(0)
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
        var path5 = svg5.selectAll('path')
            .data(pie(dataset5))
            .enter()
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .attr('font-weight', function(d, i) {return i*500+500;})
            .attr('d', arc4)
            .style('fill', color5)
            .text((d) => d.data.label);
    }

    render() {
        if(d3.selectAll('svg')) {            
            d3.selectAll('svg').remove();
        }
        this.makeDonuts();
        return(
            <div>
            <script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.4.6/d3.min.js" data-semver="3.4.6" data-require="d3@*" />

                <div id="chart" />
            </div>
        );
    }
}

