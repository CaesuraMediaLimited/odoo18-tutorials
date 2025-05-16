import { Component, useState, xml, markup } from "@odoo/owl";

export class TestComponent extends Component {
  static template = xml`
    <div class="d-flex flex-wrap">
       <t t-out="value1"/>
       <t t-out="value2"/>
    </div>
    `;
  value1 = "<div>some text 1</div>";
  value2 = markup("<div>some text 2</div>");
}

