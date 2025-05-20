import { Component, useState, Markup } from "@odoo/owl";

export class Card extends Component {
    static template = "awesome_owl.Card";
    setup() {
        this.open = useState({ open: true });
    }
    toggleOpen () {
       this.open.open = !this.open.open;
    }

}

