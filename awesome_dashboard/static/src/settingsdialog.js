import { Component } from "@odoo/owl";
import { Dialog } from "@web/core/dialog/dialog";

export class SettingsDialog extends Component {
    static template = "awesome_dashboard.SettingsDialog";
    static components = { Dialog };

    static props = {
        dashboardItems: Array,
        close: Function,
    };
    static displayName = "Dashboard Settings";

    setup () {
       console.log ("SettingsDialog called.");
    }

    closeDialog() {
        this.props.close();
    }
}

