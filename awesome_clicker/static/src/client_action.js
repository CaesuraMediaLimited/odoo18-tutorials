/** @odoo-module **/

import { Component, useState, onWillStart, useExternalListener } from "@odoo/owl";
import { useService, useBus } from "@web/core/utils/hooks";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";

// import { useClicker } from "./use_clicker";
// import { ClickValue } from "./clickvalue";

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
       // ClickValue,
    }

    setup () {
       console.log ("ClientAction loaded");
       // this.clickerService = useService("awesome_clicker.service");
       // this.state          = useState(this.clickerService.state);
       // this.clicker        = useClicker();
       this.clicker           = useState(useService("awesome_clicker.service"));
       // this.state          = useState ({level : 0, clickBots : 0, timerGoing : false});

       const effectService    = useService("effect");
       useBus(this.clicker.bus, "MILESTONE_1k", (ev) => {
            console.log("ClientAction: MILESTONE_1k received!", ev.detail);
            effectService.add({
                type: "rainbow_man",
                message: "Congratulations! You reached 1000 clicks!",
            });
        });
        useBus(this.clicker.bus, "MILESTONE_5k", (ev) => {
            console.log("ClientAction: MILESTONE_5k received!", ev.detail);
            effectService.add({
                type: "rainbow_man",
                message: "Congratulations! You reached 5K clicks!",
            });
        });
        useBus(this.clicker.bus, "MILESTONE_100k", (ev) => {
            console.log("ClientAction: MILESTONE_100k received!", ev.detail);
            effectService.add({
                type: "rainbow_man",
                message: "Congratulations! You reached 100K clicks!",
            });
        });
    }
    /*
    addHundred () {
       this.clicker.increment (100);
       if (this.clicker.state.clicks > 1000) {
          this.state.level = 1;
       }
    }
    buyBots () {
       if (this.state.level > 0) {
          this.state.clickBots++;
          if (!this.state.timerGoing) {
             this.state.timerGoing = true;

             // () => notation keeps "this", function () {...} doesn't
             //
             setInterval (() => {
                this.clicker.increment(10 * this.state.clickBots);
             }, 10000);
          }
       }
    }
    canBuyClickBots () {
       if (this.state.level > 0) {
          return "";
       } else {
          return "disabled";
       }
    }
    */
}
registry.category("actions" ).add("awesome_clicker.client_action",  ClientAction);
