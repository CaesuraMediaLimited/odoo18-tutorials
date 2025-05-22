/** @odoo-module **/

import { Component } from "@odoo/owl";

export class StatsCard extends Component {
    static template   = "awesome_dashboard.StatsCard";
    static props      = {
       title : {type : String, optional : true},
       value : {type : [String, Number]},
    }
    setup () {
       console.log ("StatsCard loaded, props : ", this.props);
    }
}
