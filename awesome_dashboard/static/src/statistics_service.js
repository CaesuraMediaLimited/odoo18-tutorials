/** @odoo-module **/

import { registry } from "@web/core/registry";
import { rpc }      from "@web/core/network/rpc";
import { memoize }  from "@web/core/utils/functions";

const memoizedLoadStatistics = memoize(async () => {
   return await rpc("/awesome_dashboard/statistics");
});
export const statsService = {
   start() {
      return {
         loadStatistics : memoizedLoadStatistics,
      };
    },
};
registry.category("services").add("awesome_dashboard.statistics", statsService);
