/** @odoo-module **/

import { Component, onWillStart, onMounted, useEffect } from "@odoo/owl";
import { loadJS } from '@web/core/assets';

export class PieChart extends Component {
    static template   = "awesome_dashboard.PieChart";
    // "m": 58, "s": 46, "xl": 73
    static props      = {
       medium     : {type : Number},
       small      : {type : Number},
       extraLarge : {type : Number},
    };
    setup() {
       this.chart = null;
       onWillStart(async () => {
          await loadJS ('/web/static/lib/Chart/Chart.js');
       });

       // Create the chart on first render, then update it with new values from the server.
       //
       useEffect((el) => {
          if (!this.chart) {
             const ctx = document.getElementById('tshirtChart');
             this.chart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Small', 'Medium', 'Extra Large',],
                    datasets: [{
                      label: 'T-Shirt Sales',
                      data: [this.props.small, this.props.medium, this.props.extraLarge],
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
             this.chart.data.datasets[0].data = [this.props.small, this.props.medium, this.props.extraLarge];
             this.chart.update();
          }

       // onChange - in React it is just [], but Owl likes a function () => ...
       //
       },() => [this.props.small, this.props.medium, this.props.extraLarge]);

       onMounted (async () => {
       });
    }
}
