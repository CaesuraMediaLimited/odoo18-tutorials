/** @odoo-module **/

import { Component, useState, onWillStart, useExternalListener } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { useClicker } from "./use_clicker";
import { ClickValue } from "./clickvalue";

export class ClientAction extends Component {
    static template   = "awesome_clicker.ClientAction";

    // Default ones not used but gives an error with debug on : 
    //
    static props      = {
       action: Object,
       actionId: { type : Number, default : 2},
       updateActionState: Function,
       className: { type: String, optional: true },
       controlPanel: { type: Object, optional: true },
    }

    static components = {
       Layout,
       ClickValue,
    }

    setup () {
       console.log ("ClientAction loaded");
       // this.clickerService = useService("awesome_clicker.service");
       // this.state          = useState(this.clickerService.state);
       this.clicker        = useClicker();
    }
    addTen () {
       this.clicker.increment (5000);
    }
}
registry.category("actions" ).add("awesome_clicker.client_action",  ClientAction);
