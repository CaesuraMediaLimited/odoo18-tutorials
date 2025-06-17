/** @odoo-module **/

import { registry } from "@web/core/registry";
import { ClickerModel } from "./clicker_model";

const commandProviderRegistry = registry.category("command_provider");
commandProviderRegistry.add("clicker", {
    provide: (env, options) => {

        // Use the current instance of the game rather than new ClickerModel();
        //
        const clicker = env.services['awesome_clicker.service'];
        let result = [];
        result.push({
           action() {
                // From enterprise/knowledge/static/src/webclient/commands/knowledge_providers.js
                //
                env.services.action.doAction({
                   type   : "ir.actions.client",
                   tag    : "awesome_clicker.client_action",
                   target : "new",
                   name   : "Clicker",
                });
           },
           category: "Clicker Game",
           name: "Open Clicker Game",
        });
        result.push({
           action() {
                if (!clicker) {
                    console.warn("Clicker service not yet available in command provider. Commands will not be provided.");
                    alert ("No clicker game ongoing");
                } else {
                    // The instruction is "Buy 1 click bot" but you can't if you don't have enough clicks,
                    // So add 57 to see if it works.
                    //
                    clicker.increment(57);
                }
           },
           category: "Clicker Game",
           name: "Buy 57 clicks",
        });
        return result;
    },
});
