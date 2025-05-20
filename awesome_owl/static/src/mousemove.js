import { Component, useState, onWillDestroy, xml } from "@odoo/owl";

// We define here a custom behaviour: this hook tracks the state of the mouse
// position
function useMouse() {
  const position = useState({ x: 0, y: 0 });

  function update(e) {
    position.x = e.clientX;
    position.y = e.clientY;
  }
  window.addEventListener("mousemove", update);
  onWillDestroy(() => {
    window.removeEventListener("mousemove", update);
  });

  return position;
}

// MouseMove component
export class MouseMove extends Component {
  static template = xml`<div>Mouse: <t t-esc="mouse.x"/>, <t t-esc="mouse.y"/></div>`;

  // this hooks is bound to the 'mouse' property.
  mouse = useMouse();
}
