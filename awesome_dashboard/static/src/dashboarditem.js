/** @odoo-module **/

import { Component } from "@odoo/owl";

export class DashboardItem extends Component {
    static template   = "awesome_dashboard.DashboardItem";
    static props      = {
       size : {type : Number, optional : true, default : 1}
    }
    setup() {
       console.log("DashboardItem mounted");
    }
    // Can use a getter : get style() - then <div t-att-style="style" without the ()
    style () {
       return `width: ${10 * this.props.size}rem;`;
    }
}
