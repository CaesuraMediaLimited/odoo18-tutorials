import { whenReady } from "@odoo/owl";
import { mountComponent } from "@web/env";
import { Playground } from "./playground";

whenReady(() => {
    mountComponent(Playground, document.body);
});

