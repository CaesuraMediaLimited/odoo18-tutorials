/** @odoo-module **/

import { registry } from "@web/core/registry";
import { rpc }      from "@web/core/network/rpc";
import { memoize }  from "@web/core/utils/functions";
import { reactive } from "@odoo/owl";


// Not used now -we are going reactive()
//
const memoizedLoadStatistics = memoize(async () => {
   return await rpc("/awesome_dashboard/statistics");
});
const N = 10 * 60 * 60 * 1000; // 10 Minutes
export const statsService = {
   start() {
      const stats       = reactive({});
      async function loadStatistics (){
         const newStats = await rpc("/awesome_dashboard/statistics");

         // Update in place.
         //
         Object.assign(stats, newStats);
      }

      // Initial load.
      //
      loadStatistics ();

      // Update every N seconds.
      //
      setInterval (loadStatistics, N);

      return {
         stats,
      };
   },
};
registry.category("services").add("awesome_dashboard.statistics", statsService);
