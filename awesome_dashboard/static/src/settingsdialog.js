import { Component, useState } from "@odoo/owl";
import { Dialog } from "@web/core/dialog/dialog";

export class SettingsDialog extends Component {
    static template = "awesome_dashboard.SettingsDialog";
    static components = { Dialog };

    static props = {
        dashboardItems: Array,
        close: Function,
        onSave : Function,
    };
    static displayName = "Dashboard Settings";

    setup () {
       this.checked = useState(new Set(this.props.dashboardItems.map(([key]) => key)));
    }

    // Arrow notation keeps "this."
    //
    toggleCheckbox = (itemId) => {
        console.log ("toggleCheckbox : itemId : ", itemId);
        if (this.checked.has(itemId)) {
            this.checked.delete(itemId);
        } else {
            this.checked.add(itemId);
        }
    }

    saveAndClose() {
        this.props.onSave([...this.checked]); // Convert Set to Array
        this.props.close();
    }

    closeDialog() {
        this.props.close();
    }
}

