import { Component, useState, xml, Markup } from "@odoo/owl";
import { Counter } from "./counter";
import { Card } from "./card";
import { TestComponent } from "./test_component";

export class Playground extends Component {
    static template = "awesome_owl.Playground";
    static components = { Counter, Card, TestComponent };

    setup() {
        this.state = useState({ counter: 0 });
    }

    updateCount (counter) {
       this.state.counter++;
       console.log ("Playground : counter, this.state.counter : ", counter, this.state.counter );
    }
}

