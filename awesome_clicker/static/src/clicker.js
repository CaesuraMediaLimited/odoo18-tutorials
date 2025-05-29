/** @odoo-module **/

import { Component, useState, onWillStart, useExternalListener } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";

export class AwesomeClicker extends Component {

    // Hello World atm
    //
    static template   = "awesome_clicker.AwesomeClicker";

    // Default ones not used but gives an error with debug on : 
    //
    static props      = {
       action: Object,
       actionId: { type : Number, default : 1},
       updateActionState: Function,
       className: { type: String, optional: true },
       controlPanel: { type: Object, optional: true },
    }

    static components = {
       Layout,
    }

    setup () {
       console.log ("AwesomeClicker loaded");
    }
}
registry.category("actions" ).add("awesome_clicker.clicker",  AwesomeClicker);
