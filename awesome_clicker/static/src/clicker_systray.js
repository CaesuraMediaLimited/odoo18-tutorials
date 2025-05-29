/** @odoo-module **/

import { Component, useState, onWillStart, useExternalListener } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { useClicker } from "./use_clicker";
import { ClickValue } from "./clickvalue";

// Systray Component.
//
export class ClickerSystray extends Component {
    static template = "awesome_clicker.ClickerSystray";

    static components = {
       ClickValue,
    }

    setup () {
       console.log ("ClickerSystray loaded");
       this.action         = useService("action");
       // this.clickerService = useService("awesome_clicker.service");
       // this.state          = useState(this.clickerService.state);
       this.clicker        = useClicker();

       useExternalListener(document.body, "click", (ev) => {
          if (ev.target.id == "button" || ev.target.id == "icon") {
             return false;
          }
          this.clicker.increment (1);
       });
    }

    updateCount () {
       this.clicker.increment (1);
    }

    openClientAction() {
       this.action.doAction({
          type   : "ir.actions.client",
          tag    : "awesome_clicker.client_action",
          target : "new",
          name   : "Clicker",
       });
    }
}
registry.category("systray" ).add("awesome_clicker.systray", { Component: ClickerSystray }, { sequence: 100 });
