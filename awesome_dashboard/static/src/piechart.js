/** @odoo-module **/

import { Component, onWillStart, onMounted, useEffect } from "@odoo/owl";
import { loadJS } from '@web/core/assets';

export class PieChart extends Component {
    static template   = "awesome_dashboard.PieChart";
    static props      = {
       title : {type : String, optional : true},
       value : {type : Object                 },
    };
    setup() {

       this.chart    = null;
       this.canvasId = `pieChartCanvas_${Math.random().toString(36).substr(2, 9)}`;
       console.log ("PieChart loaded : props, this.canvasId : ", this.props, this.canvasId);
       onWillStart(async () => {
          await loadJS ('/web/static/lib/Chart/Chart.js');
       });

       // Create the chart on first render, then update it with new values from the server.
       //
       useEffect((el) => {
          if (!this.chart) {
             const ctx  = document.getElementById(this.canvasId);
             this.chart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Small', 'Medium', 'Extra Large',],
                    datasets: [{
                      label: this.props.title ? this.props.title : 'T-Shirt Sales',
                      data: [this.props.value.small, this.props.value.medium, this.props.value.extraLarge],
                      borderWidth: 1
                    }]
                  },
                options: {
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  }
             });
          // Update with new values using .update() in Chart.js from updated values from server.
          //
          } else {
             this.chart.data.datasets[0].data = [this.props.value.small, this.props.value.medium, this.props.value.extraLarge];
             this.chart.update();
          }

       // onChange - in React it is just [], but Owl likes a function () => ...
       //
       },() => [this.props.value.small, this.props.value.medium, this.props.value.extraLarge]);

       onMounted (async () => {
       });
    }
}
