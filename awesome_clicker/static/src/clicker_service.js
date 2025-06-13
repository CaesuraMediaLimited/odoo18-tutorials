import { registry     } from "@web/core/registry";
import { reactive     } from "@odoo/owl";
import { ClickerModel } from "./clicker_model";

export const clickerService = {
   start() {
      const clicker = new ClickerModel();

      // Register a cleanup function to destroy the model when the service stops
      // This is important to prevent memory leaks from the setInterval
      // Odoo's service registry handles service lifecycle.
      //
      registry.category("services").add("awesome_clicker.cleanup_model", {
         start() {
             return () => clicker.destroy(); // Return a function to be called on service stop
         },
      });

      return clicker;

      /*
      const state = reactive({ clicks: 0 });
      const increment = (inc) => {
         state.clicks += inc;
         console.log ("clickerService : increment : ", inc, state.clicks);
      }
      return {
          state,
          increment,
      }
      */
   }
}
registry.category("services").add("awesome_clicker.service", clickerService);

