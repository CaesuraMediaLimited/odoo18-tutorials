import { Component, useState } from "@odoo/owl";

export class Counter extends Component {
    static template = "awesome_owl.Counter";
    static props = {
       name        : {type : String},
       updateCount : {type : Function, optional: true},
    };

    setup() {
        this.state = useState({ value: 0 });
    }

    increment() {
        this.state.value++;
        if (this.props.updateCount) {
           this.props.updateCount (this.state.value);
        }
    }
}

