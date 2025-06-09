import { LightningElement } from "lwc";

export default class P2cParentComponent extends LightningElement {
  handleReset() {
    this.template.querySelector("c-p2c-slider-component").resetSlider();
  }
}
