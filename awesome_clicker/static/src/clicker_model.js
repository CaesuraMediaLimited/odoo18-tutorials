import { Reactive } from "@web/core/utils/reactive";
import { useService } from "@web/core/utils/hooks";
import { EventBus } from "@odoo/owl";

export class ClickerModel extends Reactive {
    constructor (model, config, data, options) {
        super(...arguments);
        this.clicks        = 0;
        this.clickBots     = 0;
        this.level         = 0;
        this._timerGoing   = false;
        this._intervalID   = 0;
        this.botMultiplier = 10;
        this.interval      = 10000;
        this.MILESTONE_1K_THRESHOLD = 1000;
        this.bus           = new EventBus();
        this.setup(config, data, options);
    }

    setup() {
    }

    // Arrow notation throughout to keep "this" in this context.
    //
    increment = () => {
        this.clicks++;
        console.log ("ClickerModel : increment called : this.clicks : ", this.clicks);
        // Trigger MILESTONE_1k only if not reached before and clicks meet the threshold
        if (this.clicks >= this.MILESTONE_1K_THRESHOLD ) {
            this.bus.trigger("MILESTONE_1k", { currentClicks: this.clicks }); // Trigger event with data
            console.log("MILESTONE_1k triggered from model!");
        }
        if (this.clicks > this.MILESTONE_1K_THRESHOLD) {
           this.level = 1;
        }
    }

    addHundred = () => {
        this.clicks += 100;
        if (this.clicks > this.MILESTONE_1K_THRESHOLD) {
           this.level = 1;
        }
        // Trigger MILESTONE_1k only if not reached before and clicks meet the threshold
        if (this.clicks >= this.MILESTONE_1K_THRESHOLD) {
            this.bus.trigger("MILESTONE_1k", { currentClicks: this.clicks }); // Trigger event with data
            console.log("MILESTONE_1k triggered from model!");
        }
        console.log ("Adding 100 : this.clicks :", this.clicks);
    }

    buyBots = () => {
       console.log ("ClickerModel : buyBots called.");
       if (this.level > 0) {
          this.clickBots++;
          this.clicks -= this.MILESTONE_1K_THRESHOLD; // Deduct cost
          if (!this._timerGoing) {
             this._timerGoing = true;

             // () => notation keeps "this", function () {...} doesn't
             //
             this._intervalID = setInterval (() => {
                this.clicks += this.botMultiplier * this.clickBots;
             }, this.interval);
          }
       }
    }

    canBuyClickBots = () => {
       console.log ("ClickerModel : canBuyClickBots called");
       if (this.clicks > this.MILESTONE_1K_THRESHOLD) {
          return "";
       } else {
          return "disabled";
       }
    }

    destroy = () => {
       console.log ("ClickerModel : destroy called");
       clearInterval(this._intervalID);
       this._timerGoing = false;
    }
}
