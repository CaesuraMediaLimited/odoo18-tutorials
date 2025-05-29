/** @odoo-module **/

import { Component, useState, onWillStart, useExternalListener } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";

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
    }

    setup () {
       console.log ("ClientAction loaded");
       this.clickerService = useService("awesome_clicker.service");
       this.state          = useState(this.clickerService.state);
    }
}
registry.category("actions" ).add("awesome_clicker.client_action",  ClientAction);
