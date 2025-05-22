/** @odoo-module **/

import { Component } from "@odoo/owl";
import { StatsCard } from "./statscard";
import { PieChart } from "./piechart";

export class DashboardItem extends Component {
    static template   = "awesome_dashboard.DashboardItem";
    static props      = {
       size : {type : Number, optional : true, default : 1}
    }
    static components = {
        StatsCard,
    };

    setup() {
       console.log("DashboardItem mounted");
    }
    // Can use a getter : get style() - then <div t-att-style="style" without the ()
    style () {
       return `width: ${10 * this.props.size}rem;`;
    }
}
