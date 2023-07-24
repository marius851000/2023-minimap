import {Minimap} from "./minimap/minimap"
import {waitMs} from "./utils";

const magicTimeout = 5000;
const pseudoWaitingMinTimeout = 3000;
const pseudoWaitingMaxTimeout = 15000;
export class EquestrianMagic {
  private isEnabled = false;
  private isWorking = false;
  private minimap: Minimap;
  private audio: HTMLAudioElement;
  constructor (minimap: Minimap) {
    this.minimap = minimap;
    this.audio = document.createElement("audio");
    this.audio.src = "https://garlic-bread.reddit.com/media/interactions/select-color.mp3";
    this.audio.volume = 0.1;
    this.minimap.ui!.mlpMinimapBlock.appendChild(this.audio);
  }
  private getPseudoWaitingTimeout(){
    return pseudoWaitingMinTimeout + Math.floor(Math.random() * (pseudoWaitingMaxTimeout - pseudoWaitingMinTimeout));
  }
  private async processPinchOfMagic(){
    console.log("processing pinch of magic!")
    this.audio.play();
    const pillStatus = this.minimap.rPlace!.embed
      .shadowRoot!.querySelector("garlic-bread-status-pill")!;
    let nexttilein = pillStatus.attributes["next-tile-available-in"];
    if (nexttilein == undefined || nexttilein.value == "0") {
      this.minimap.rPlace!.camera.applyPosition({
        x: this.minimap.rPlace!.canvas.width / 2,
        y: this.minimap.rPlace!.canvas.height / 2,
        zoom: 0
      });
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