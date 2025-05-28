/** @odoo-module **/

import { Component, useState, onWillStart, useExternalListener } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";

export class AwesomeClicker extends Component {
    static template   = "awesome_clicker.AwesomeClicker";

    // Default ones not used but gives an error with debug on : 
    //
    static props      = {
       action: Object,
       actionId: Number,
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

// Systray Component.
//
export class ClickerSystray extends Component {
    static template = "awesome_clicker.ClickerSystray";
    setup () {
       console.log ("ClickerSystray loaded");
       this.state = useState ({count : 0});
       useExternalListener(document.body, "click", (ev) => {
          if (ev.target.id == "button" || ev.target.id == "icon") {
             return false;
          }
          this.state.count++;
       });
    }
    updateCount () {
       this.state.count += 10;
    }
}
registry.category("systray" ).add("awesome_clicker.systray", { Component: ClickerSystray }, { sequence: 100 });
