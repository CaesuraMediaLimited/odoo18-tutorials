/** @odoo-module **/

import { Component, xml } from "@odoo/owl";
import { humanNumber } from "@web/core/utils/numbers";

export class ClickValue extends Component {
    static template   =  xml`
       <span t-att-data-tooltip="tooltip">
          <t t-esc="humanValue" />
       </span>
    `;

    // Default ones not used but gives an error with debug on : 
    //
    static props      = {
       action: Object,
       actionId: { type : Number, default : 1},
       updateActionState: Function,
       className: { type: String, optional: true },
       controlPanel: { type: Object, optional: true },
       value : { type : Number },
    }

    setup () {
       console.log ("ClickValue loaded : ", this.props.value);
    }
    // to use humanValue instead of humanValue().
    //
    get humanValue () {
       return  humanNumber(this.props.value);
    }
    get tooltip () {
       return this.props.value.toLocaleString?.() ?? String (this.props.value);
    }
}
