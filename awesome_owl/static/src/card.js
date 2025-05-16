import { Component, useState, Markup } from "@odoo/owl";

export class Card extends Component {
    static template = "awesome_owl.Card";
    static props = { header: String, body : String, footer : Markup };
}

