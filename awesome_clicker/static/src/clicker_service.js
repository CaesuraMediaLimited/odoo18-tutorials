import { registry } from "@web/core/registry";
import { reactive } from "@odoo/owl";

export const clickerService = {
   start() {
      const state = reactive({ clicks: 0 });
      const increment = (inc) => {
         state.clicks += inc;
         console.log ("clickerService : increment : ", inc, state.clicks);
      }
      return {
         state,
         increment,
      }
   }
}
registry.category("services").add("awesome_clicker.service", clickerService);

