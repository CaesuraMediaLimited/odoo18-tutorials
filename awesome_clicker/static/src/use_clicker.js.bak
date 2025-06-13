/** @odoo-module **/

import { useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

export function useClicker () {
   console.log ("useClicker loaded");
   const clickerService = useService ("awesome_clicker.service");
   const state          = useState   (clickerService);
   return state;
}

