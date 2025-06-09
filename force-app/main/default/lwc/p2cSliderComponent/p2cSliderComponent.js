import { LightningElement, api } from "lwc";

export default class P2cSliderComponent extends LightningElement {
  value = 20;
  handleChange(event) {
    this.value = event.target.value;
  }
  @api resetSlider() {
    this.value = 50; // Reset the value of the slider component
  }
}
