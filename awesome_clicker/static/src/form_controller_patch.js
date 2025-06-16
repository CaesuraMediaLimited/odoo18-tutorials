/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { useService } from "@web/core/utils/hooks";
import { FormController } from "@web/views/form/form_controller";

patch(FormController.prototype, {
    setup() {
        super.setup();
        const clickerService = useService("awesome_clicker.service");

        const notificationService = useService("notification");
        const actionService = useService("action");

        const chance = Math.random();

        // Check for a 1% chance (0.01)
        if (chance < 0.99) {
            console.log("FormController created! 1% chance hit! Applying random reward.");
            let reward = clickerService.getReward();
            console.log ("FormController.prototype : reward is ", reward);
            clickerService.triggerRandomRewardPopup(notificationService, actionService);
        } else {
            console.log("FormController created. 1% chance missed. Chance was:", chance);
        }
    },
});
