/** @odoo-module **/

import { Component, useState, onWillStart, useExternalListener } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { Dropdown } from "@web/core/dropdown/dropdown";
import { DropdownItem } from "@web/core/dropdown/dropdown_item";
// import { useClicker } from "./use_clicker";
// import { ClickValue } from "./clickvalue";

// Systray Component.
//
export class ClickerSystray extends Component {
    static template = "awesome_clicker.ClickerSystray";

    static components = {
       // ClickValue,
       Dropdown,
       DropdownItem,
    }

    setup () {
       console.log ("ClickerSystray loaded");
       this.action         = useService("action");
       // this.clickerService = useService("awesome_clicker.service");
       // this.state          = useState(this.clickerService.state);
       // this.clicker        = useClicker();
       this.clicker        = useState(useService("awesome_clicker.service"));

       useExternalListener(document.body, "click", (ev) => {
          if (ev.target.id.match(/icon/)) {
             return false;
          }
          this.clicker.increment (1);
       });
    }

    // Totals for trees and fruits.
    //  
    get totalTrees () {
        let sum = 0;
        for (const treeType in this.clicker.trees) {
            sum += this.clicker.trees[treeType].count;
        }   
        return sum;
    }

    get totalFruits () {
        let sum = 0;
        for (const treeType in this.clicker.trees) {
            sum += this.clicker.trees[treeType].fruits;
        }   
        return sum;
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
