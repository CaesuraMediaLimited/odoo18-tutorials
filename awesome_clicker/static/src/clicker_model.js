import { Reactive   } from "@web/core/utils/reactive";
import { useService } from "@web/core/utils/hooks";
import { EventBus   } from "@odoo/owl";
import { rewards    } from "./click_rewards";
import { choose     } from "./utils";
import { browser    } from "@web/core/browser/browser";

// Migrations.
//
const MIGRATIONS = [
    {
        fromVersion: 1,
        toVersion: 2,
        apply: (model) => { 
            console.log("Applying migration from V1 to V2: Adding peach trees.");
            model.trees = {
                ...model.trees,
                peach: {
                    _treeIntervalID : 0,
                    _treeTimerGoing : false,
                    count           : 0,
                    fruits          : 0,
                },
            };
        },
    },
    // Add more migrations here 
    // {
    //     fromVersion: 2,
    //     toVersion: 3,
    //     apply: (model) => {
    //         console.log("Applying migration from V2 to V3");
    //     },
    // },
];

export class ClickerModel extends Reactive {
    constructor (model, config, data, options) {
        super(...arguments);
        this.version = 2;
        let gameState = {};
        try {
           gameState = JSON.parse(browser.localStorage.getItem ("gameState"));
           if (!gameState) {
              gameState = {};
           }
        } catch (err) {
           gameState = {};
        }
        console.log ("gameState : ", gameState);
        this.clicks        = gameState?.clicks || 0;
        this.clickBots     = gameState?.clickBots || 0;
        this.clickBigBots  = gameState?.clickBigBots || 0;
        this.level         = gameState?.level || 0;
        this._timerGoing   = false;
        this._intervalID   = 0;
        this.botMultiplier = 10;
        this.power         = gameState?.power || 1;
        this.interval      = 10000;

        this.treeInterval    = 10000;
        this.trees           = gameState?.trees || {
           pear   : {
              _treeIntervalID : 0,
              _treeTimerGoing : false,
              count           : 0,
              fruits          : 0,
           },
           cherry : {
              _treeIntervalID : 0,
              _treeTimerGoing : false,
              count           : 0,
              fruits          : 0,
           },
           apple : {
              _treeIntervalID : 0,
              _treeTimerGoing : false,
              count           : 0,
              fruits          : 0,
           },
           lemon : {
              _treeIntervalID : 0,
              _treeTimerGoing : false,
              count           : 0,
              fruits          : 0,
           },
           orange : {
              _treeIntervalID : 0,
              _treeTimerGoing : false,
              count           : 0,
              fruits          : 0,
           },
           plum : {
              _treeIntervalID : 0,
              _treeTimerGoing : false,
              count           : 0,
              fruits          : 0,
           },
           apricot : {
              _treeIntervalID : 0,
              _treeTimerGoing : false,
              count           : 0,
              fruits          : 0,
           },
        };

        this.MILESTONE_1K_THRESHOLD   = 1000;
        this.MILESTONE_5K_THRESHOLD   = 5000;
        this.MILESTONE_100K_THRESHOLD = 100000;
        this.MILESTONE_1M_THRESHOLD   = 1000000;

        this._LEVEL_ONE_NOTIFIED    = gameState?._LEVEL_ONE_NOTIFIED   || false;
        this._LEVEL_TWO_NOTIFIED    = gameState?._LEVEL_TWO_NOTIFIED   || false;
        this._LEVEL_THREE_NOTIFIED  = gameState?._LEVEL_THREE_NOTIFIED || false;
        this._LEVEL_FOUR_NOTIFIED   = gameState?._LEVEL_FOUR_NOTIFIED  || false;

        this.bus                    = new EventBus();

        // Do the migration if required. We need to migrate if no version stored in localStorage.
        //
        if (!gameState.version || (this.version > gameState.version )) {
            let loadedVersion = gameState.version || 1;
            console.log(`Running migrations from loaded version ${loadedVersion} to current version ${this.version}`);
            MIGRATIONS
                .filter(m => m.fromVersion >= loadedVersion && m.toVersion <= this.version) // Filter relevant migrations
                .sort((a, b) => a.fromVersion - b.fromVersion) // Ensure correct order
                .forEach(m => {
                    console.log(`Applying migration V${m.fromVersion} to V${m.toVersion}`);
                    m.apply(this); // Pass 'this' (the ClickerModel instance) to the migration
                });
        }

        // Start all of the timers that wre running before if there is state saved 
        // in localStorage.
        //
        if (Object.keys(gameState).length > 0 ) {

           // At least one clickBot.
           //
           if (this.clickBots > 0) {
              this._timerGoing = true;
              this._intervalID = setInterval (() => {
                 this.clicks += this.botMultiplier * this.clickBots * this.power;
                 this.serialise();
              }, this.interval);
           }

           Object.keys (this.trees).map((treeType, index) => {
              if (this.trees[treeType].count > 0) {
                 this.trees[treeType]['_treeTimerGoing'] = true;
                 this.trees[treeType]['_treeIntervalID'] = setInterval (() => {
                    this.trees[treeType]['fruits']++;
                    this.serialise ();
                 }, this.treeInterval);
              }
           });
        }

        this.setup(config, data, options);
    }

    setup() {
    }

   serialise () {

      // First set all timerGoing to false to restart them on reload.
      //
      let savedTrees = {};
      Object.keys(this.trees).map ((treeType, index) => {
         savedTrees[treeType] = {
            ...this.trees[treeType],
            "_treeTimerGoing" : false,
         }
      });
      browser.localStorage.setItem ("gameState", JSON.stringify({
         version               : this.version,
         clicks                : this.clicks,
         clickBots             : this.clickBots,
         clickBigBots          : this.clickBigBots,
         level                 : this.level,
         botMultiplier         : this.botMultiplier,
         power                 : this.power,
         trees                 : savedTrees,
         _LEVEL_ONE_NOTIFIED   : this._LEVEL_ONE_NOTIFIED,
         _LEVEL_TWO_NOTIFIED   : this._LEVEL_TWO_NOTIFIED,
         _LEVEL_THREE_NOTIFIED : this._LEVEL_THREE_NOTIFIED,
         _LEVEL_FOUR_NOTIFIED  : this._LEVEL_FOUR_NOTIFIED,
      }));
   }

    // Arrow notation throughout to keep "this" in this context.
    //
    increment = (amount) => {
        if (typeof amount !== "number") {
           amount = 1;
        }
        this.clicks += amount * this.power;
        console.log ("ClickerModel : increment called : this.clicks : ", this.clicks);

        if (this.clicks >= this.MILESTONE_1K_THRESHOLD && !this._LEVEL_ONE_NOTIFIED ) {
            this.bus.trigger("MILESTONE_1k", { currentClicks: this.clicks }); 
            console.log("MILESTONE_1k triggered from model : this._LEVEL_ONE_NOTIFIED", this._LEVEL_ONE_NOTIFIED);
        }
        if (this.clicks >= this.MILESTONE_5K_THRESHOLD && !this._LEVEL_TWO_NOTIFIED ) {
            this.bus.trigger("MILESTONE_5k", { currentClicks: this.clicks }); 
            console.log("MILESTONE_5k triggered from model!");
        }
        if (this.clicks >= this.MILESTONE_100K_THRESHOLD && !this._LEVEL_THREE_NOTIFIED ) {
            this.bus.trigger("MILESTONE_100k", { currentClicks: this.clicks }); 
            console.log("MILESTONE_100k triggered from model!");
        }
        if (this.clicks >= this.MILESTONE_1M_THRESHOLD && !this._LEVEL_FOUR_NOTIFIED ) {
            this.bus.trigger("MILESTONE_1M", { currentClicks: this.clicks }); 
            console.log("MILESTONE_1M triggered from model!");
        }

        if (this.clicks >= this.MILESTONE_1K_THRESHOLD) {
           this.level = this.level == 0 ? 1 : this.level;
           this._LEVEL_ONE_NOTIFIED = true;
        }
        if (this.clicks >= this.MILESTONE_5K_THRESHOLD) {
           this.level = this.level == 1 ? 2 : this.level;
           this._LEVEL_TWO_NOTIFIED = true;
        }
        if (this.clicks >= this.MILESTONE_100K_THRESHOLD) {
           this.level = this.level == 2 ? 3 : this.level;
           this._LEVEL_THREE_NOTIFIED = true;
        }
        if (this.clicks >= this.MILESTONE_1M_THRESHOLD) {
           this.level = this.level == 3 ? 4 : this.level;
           this._LEVEL_FOUR_NOTIFIED = true;
        }
        this.serialise ();
    }

   addFiftySeven = () => {
      this.clicks += 57;
      this.serialise ();
   }

    addHundred = () => {
        if (this.level == 1) {
            this.increment (5000);
        } else if (this.level == 2) {
            this.increment(10000); 
        } else if (this.level == 3) {
            this.increment(200000); 
        } else if (this.level == 4) {
            this.increment(500000); 
        } else {
            this.increment(100); 
        }
        console.log ("Adding some : this.clicks :", this.clicks);
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
                this.clicks += this.botMultiplier * this.clickBots * this.power;
                this.serialise();
             }, this.interval);
          }
          this.serialise ();
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
          this.botMultiplier = 100;
          if (!this._timerGoing) {
             this._timerGoing = true;
             this._intervalID = setInterval (() => {
                this.clicks += this.botMultiplier * this.clickBigBots * this.power;
                this.serialise();
             }, this.interval);
          }
       }
       this.serialise ();
    }

    canBuyBigClickBots = () => {
       console.log ("ClickerModel : canBuyBigClickBots called");
       if (this.clicks > this.MILESTONE_5K_THRESHOLD) {
          return "";
       } else {
          return "disabled";
       }
    }

    buyPower = () => {
       console.log ("ClickerModel : buyPower called.");
       if (this.level > 2) {
          this.power++;
          this.clicks       -= this.MILESTONE_100K_THRESHOLD; // Deduct cost
          if (!this._timerGoing) {
             this._timerGoing = true;
             this._intervalID = setInterval (() => {
                this.clicks += this.botMultiplier * this.clickBigBots * this.power;
                this.serialise();
             }, this.interval);
          }
          this.serialise ();
       }
    }
    canBuyPower = () => {
       console.log ("ClickerModel : canBuyPower called");
       if (this.clicks > this.MILESTONE_100K_THRESHOLD) {
          return "";
       } else {
          return "disabled";
       }
    }

    buyTree = (type) => {
       console.log ("ClickerModel : buyTree called : type : ", type);
       if (this.level > 3) {
          this.clicks = 0; // for now      -= this.MILESTONE_1M_THRESHOLD; // Deduct cost
          this.trees[type]['count']++;
          if (!this.trees[type]['_treeTimerGoing']) {
             this.trees[type]['_treeTimerGoing'] = true;
             this.trees[type]['_treeIntervalID'] = setInterval (() => {
                this.trees[type]['fruits']++;
                this.serialise ();
             }, this.treeInterval);
          }
          this.serialise ();
       }
    }
    canBuyTree = () => {
       console.log ("ClickerModel : canBuyTree called");
       if (this.clicks > this.MILESTONE_1M_THRESHOLD) {
          return "";
       } else {
          return "disabled";
       }
    }

    getReward = () => {
        const currentLevel = this.level;
        console.log("Getting random reward for level:", currentLevel);

        const applicableRewards = rewards.filter(reward => {
            const hasMinLevel = reward.minLevel !== undefined;
            const hasMaxLevel = reward.maxLevel !== undefined;

            // Check if current level meets minLevel condition
            const meetsMin = !hasMinLevel || currentLevel >= reward.minLevel;
            // Check if current level meets maxLevel condition
            const meetsMax = !hasMaxLevel || currentLevel <= reward.maxLevel;

            return meetsMin && meetsMax;
        });

        if (applicableRewards.length === 0) {
            console.log("No applicable rewards found for level:", currentLevel);
            return null; // No rewards found for the current level
        }

        // Select a random reward from the applicable ones
        const selectedReward = choose(applicableRewards);

        console.log("Selected reward:", selectedReward.description);
        return selectedReward;
    }
    applyRandomReward = (reward) => {
        if (reward) {
            reward.apply(this);
            this.bus.trigger("reward_applied", { description: reward.description });
            this.serialise ();
        }
    }

    triggerRandomRewardPopup = (notificationService, actionService) => { // Pass services as args
        const reward = this.getReward();
        if (!reward) {
            console.log("No reward applicable for current level.");
            return;
        }

        const dismissNotification = notificationService.add(
            `A wild reward appeared: ${reward.description}!`,
            {
                sticky: true,
                type: 'info',
                className: 'o_clicker_reward_notification',
                buttons: [
                    {
                        name: "Collect",
                        onClick: () => {
                            console.log("Collect button clicked for reward:", reward.description);
                            reward.apply(this);
                            dismissNotification(); 
                            actionService.doAction({
                               type   : "ir.actions.client",
                               tag    : "awesome_clicker.client_action",
                               target : "new",
                               name   : "Clicker",
                            });
                        },
                    },
                    {
                        name: "Dismiss",
                        onClick: () => {
                            console.log("Dismiss button clicked for reward:", reward.description);
                            dismissNotification(); 
                        },
                    },
                ],
            }
        );
    };

    destroy = () => {
       console.log ("ClickerModel : destroy called");
       clearInterval(this._intervalID);
       this._timerGoing = false;
       this.serialise ();
    }
}
