import { Reactive } from "@web/core/utils/reactive";

export class ClickerModel extends Reactive {
    constructor (model, config, data, options) {
        super(...arguments);
        this.clicks        = 0;
        this.clickBots     = 0;
        this.level         = 0;
        this._timerGoing   = false;
        this._intervalID   = 0;
        this.levelMin      = 1000;
        this.botMultiplier = 10;
        this.interval      = 10000;
        this.setup(config, data, options);
    }

    setup() {}

    // Arrow notation throughout to keep "this" in this context.
    //
    increment = () => {
        this.clicks++;
        console.log ("ClickerModel : increment called : this.clicks : ", this.clicks);
    }

    addHundred = () => {
       this.clicks += 100;
       if (this.clicks > this.levelMin) {
          this.level = 1;
       }
       console.log ("Adding 100 : this.clicks :", this.clicks);
    }

    buyBots = () => {
       console.log ("ClickerModel : buyBots called.");
       if (this.level > 0) {
          this.clickBots++;
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
       if (this.level > 0) {
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
