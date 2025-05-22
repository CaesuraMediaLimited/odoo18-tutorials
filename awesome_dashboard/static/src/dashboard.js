/** @odoo-module **/

import { Component, useState, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { rpc } from "@web/core/network/rpc";
import { Layout } from "@web/search/layout";
import { _t } from "@web/core/l10n/translation";
import { DashboardItem } from "./dashboarditem";
import { PieChart } from "./piechart";

class AwesomeDashboard extends Component {
    static template   = "awesome_dashboard.AwesomeDashboard";
    static props      = {
       controlPanel   : {},
    }
    static components = {
        Layout,
        DashboardItem,
        PieChart,
    };
    setup() {
        this.action       = useService("action");
        this.statsService = useService("awesome_dashboard.statistics");
        this.stats        = useState({ stats: {} });

        onWillStart(async () => {
           // this.stats.stats = await rpc("/awesome_dashboard/statistics");
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
