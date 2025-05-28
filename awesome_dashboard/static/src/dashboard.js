/** @odoo-module **/

import { Component, useState, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { rpc } from "@web/core/network/rpc";
import { Layout } from "@web/search/layout";
import { _t } from "@web/core/l10n/translation";
import { DashboardItem } from "./dashboarditem";
import dashboardRegistry  from "./dashboardregistry";
import { AlertDialog } from "@web/core/confirmation_dialog/confirmation_dialog";
import { SettingsDialog } from "./settingsdialog";

// Now from registry ...
// import { PieChart } from "./piechart";
// import { StatsCard } from "./statscard";
// import items from "./dashboard_items";


class AwesomeDashboard extends Component {
    static template   = "awesome_dashboard.AwesomeDashboard";

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
        DashboardItem,
        // PieChart, Now from registry ...
        // StatsCard, Now from registry ...
        SettingsDialog,
    };
    setup() {
        this.action       = useService("action");
        this.statsService = useService("awesome_dashboard.statistics");
        this.dialog       = useService("dialog");
        this.stats        = useState({ stats: {} });

        // List of dashboard items could be in localStorage.
        //
        let storedList;
        try {
           const keys = JSON.parse(localStorage.getItem("dashboardList"));
           if (!Array.isArray (keys)) {
              throw (new Error ("Not JSON or stored"));
           }
           storedList = keys.map(key => [key, dashboardRegistry.get(key)]).filter(([k, def]) => def);
           console.log ("storedList OK : ", storedList, keys);
        } catch (err) {
           storedList = dashboardRegistry.getEntries();
           console.log ("storedList NOT OK : ", storedList, err);
        }

        // Now get the settings from the server instead of localStorage.
        //
        // this.items        = useState(storedList);
        this.items        = useState(dashboardRegistry.getEntries());

        onWillStart(async () => {

           // Settings from the server.
           //
           let response = await rpc("/awesome_dashboard/load_settings");
           console.log ("Loaded settings from server : ", response);
           if (response.settings && Array.isArray(response.settings)) {
              this.items = response.settings.map(key => [key, dashboardRegistry.get(key)]).filter(([k, def]) => def);
           }

           // Was : 
           // this.stats.stats = await rpc("/awesome_dashboard/statistics");
           //
           this.stats.stats  = await this.statsService.stats; // Updates state every N milliseconds.
           console.log ("this.stats.stats : ", this.stats.stats);

           // { "average_quantity": 5, "average_time": 105, "nb_cancelled_orders": 36, "nb_new_orders": 195,
           // "orders_by_size": { "m": 58, "s": 46, "xl": 73 }, "total_amount": 177 } })
           //
           let totalTShirts = 0;
           Object.values(this.stats.stats.orders_by_size).map ((value, index) => {
              totalTShirts += value;
           });
           this.stats.stats.avTshirt = totalTShirts / Object.keys(this.stats.stats.orders_by_size).length;
       })
    }
    openDialog () {
       this.dialog.add(SettingsDialog, {
          dashboardItems : this.items,
          close: () => {},
          onSave: async (selectedIds) => {
             console.log("User selected items:", selectedIds);
             this.items.splice(
                0,
                this.items.length,
                ...this.items.filter(([key]) => selectedIds.includes(key))
             );
             // Add to localStorage. Native JS/Web API.
             //
             localStorage.setItem ("dashboardList", JSON.stringify(selectedIds));

             // Save to server.
             //
             await rpc("/awesome_dashboard/save_settings", { selectedIds });
          },
       });
    }
    async openCustomers() {
      this.action.doAction("base.action_partner_form");
    }
    async openLeads() {
       this.action.doAction({
            type: 'ir.actions.act_window',
            name: _t('CRM Leads'),
            target: 'current',
            res_model: 'crm.lead',
            views: [
               [false, 'list'],
               [false, 'form'],
            ],
        });
    }
}

registry.category("actions" ).add("awesome_dashboard.dashboard",  AwesomeDashboard);
