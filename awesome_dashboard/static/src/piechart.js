/** @odoo-module **/

import { Component, onWillStart, onMounted } from "@odoo/owl";
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
       onWillStart(async () => {
          await loadJS ('/web/static/lib/Chart/Chart.js');
       });
       onMounted (async () => {
          const ctx = document.getElementById('tshirtChart');
          new Chart(ctx, {
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
       });
    }
}
