import { Reactive } from "@web/core/utils/reactive";
import { useService } from "@web/core/utils/hooks";
import { EventBus } from "@odoo/owl";

export class ClickerModel extends Reactive {
    constructor (model, config, data, options) {
        super(...arguments);
        this.clicks        = 0;
        this.clickBots     = 0;
        this.clickBigBots  = 0;
        this.level         = 0;
        this._timerGoing   = false;
        this._intervalID   = 0;
        this.botMultiplier = 10;
        this.interval      = 10000;
        this.MILESTONE_1K_THRESHOLD = 1000;
        this.MILESTONE_5K_THRESHOLD = 5000;
        this._LEVEL_ONE_NOTIFIED    = false;
        this._LEVEL_TWO_NOTIFIED    = false;
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
        if (this.clicks >= this.MILESTONE_1K_THRESHOLD && !this._LEVEL_ONE_NOTIFIED ) {
            this.bus.trigger("MILESTONE_1k", { currentClicks: this.clicks }); // Trigger event with data
            console.log("MILESTONE_1k triggered from model!");
        }
        if (this.clicks >= this.MILESTONE_5K_THRESHOLD && !this._LEVEL_TWO_NOTIFIED ) {
            this.bus.trigger("MILESTONE_5k", { currentClicks: this.clicks }); // Trigger event with data
            console.log("MILESTONE_5k triggered from model!");
        }
        if (this.clicks > this.MILESTONE_1K_THRESHOLD) {
           this.level = 1;
           this._LEVEL_ONE_NOTIFIED = true;
        }
        if (this.clicks > this.MILESTONE_5K_THRESHOLD) {
           this.level = 2;
           this._LEVEL_TWO_NOTIFIED = true;
        }
    }

    addHundred = () => {
        this.clicks += 500; // this.increment (amount) did not work for some reason.
        if (this.clicks >= this.MILESTONE_1K_THRESHOLD && !this._LEVEL_ONE_NOTIFIED) { 
            this.bus.trigger("MILESTONE_1k", { currentClicks: this.clicks }); // Trigger event with data
            console.log("MILESTONE_1k triggered from model!");
        }
        if (this.clicks >= this.MILESTONE_5K_THRESHOLD && !this._LEVEL_TWO_NOTIFIED) {
            this.bus.trigger("MILESTONE_5k", { currentClicks: this.clicks }); // Trigger event with data
            console.log("MILESTONE_5k triggered from model!");
        }
        if (this.clicks > this.MILESTONE_1K_THRESHOLD) {
           this.level = 1;
           this._LEVEL_ONE_NOTIFIED = true;
        }
        if (this.clicks > this.MILESTONE_5K_THRESHOLD) {
           this.level = 2;
           this._LEVEL_TWO_NOTIFIED = true;
        }
        console.log ("Adding 100 : this.clicks :", this.clicks);
    }

    buyBots = () => {
       console.log ("ClickerModel : buyBots called.");
       if (this.level > 0) {
          this.clickBots++;
          this.clicks -= this.MILESTONE_1K_THRESHOLD; // Deduct cost
          this._LEVEL_ONE_NOTIFIED = false;
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

    buyBigBots = () => {
       console.log ("ClickerModel : buyBigBots called.");
       if (this.level > 1) {
          this.clickBigBots++;
          this.clicks       -= this.MILESTONE_5K_THRESHOLD; // Deduct cost
          this._LEVEL_TWO_NOTIFIED = false;
          this.botMultiplier = 100;
          if (!this._timerGoing) {
             this._timerGoing = true;
             this._intervalID = setInterval (() => {
                this.clicks += this.botMultiplier * this.clickBigBots;
             }, this.interval);
          }
       }
    }

    canBuyBigClickBots = () => {
       console.log ("ClickerModel : canBuyBigClickBots called");
       if (this.clicks > this.MILESTONE_5K_THRESHOLD) {
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
