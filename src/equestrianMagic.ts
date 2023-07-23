import {Minimap} from "./minimap/minimap"
import {waitMs} from "./utils";

const magicTimeout = 5000;
const pseudoWaitingMinTimeout = 3000;
const pseudoWaitingMaxTimeout = 15000;
export class EquestrianMagic {
  private isEnabled = false;
  private isWorking = false;
  private minimap: Minimap;
  constructor (minimap: Minimap) {
    this.minimap = minimap;
  }
  private getPseudoWaitingTimeout(){
    return pseudoWaitingMinTimeout + Math.floor(Math.random() * (pseudoWaitingMaxTimeout - pseudoWaitingMinTimeout));
  }
  private async processPinchOfMagic(){
    const pillStatus = this.minimap.rPlace!.embed
      .shadowRoot!.querySelector("garlic-bread-status-pill")!
      .shadowRoot!.querySelector(".main-text")!.innerHTML;
    if(pillStatus.includes("Place!")){
      console.log("EqMagic: Waiting...");
      await waitMs(this.getPseudoWaitingTimeout());
      if(this.isWorking && this.minimap.selectRandPix()){
        this.minimap.rPlace!.embed
          .onConfirmPixel()
          .then(() => {
            console.log("EqMagic: Placed!");
          })
          .catch(() => {
            console.error("EqMagic: Failed!");
          });
      }
    }
    await waitMs(magicTimeout);
    return;
  }

  private async processLooper (){
    this.isWorking = true;
    while(true){
      if(!this.isEnabled) {
        this.isWorking = false;
        return;
      }
      await this.processPinchOfMagic();
    }
  }
  turnOn(){
    this.isEnabled = true;
    if(!this.isWorking) this.processLooper();
  }

  turnOff(){
    this.isEnabled = false;
  }
}