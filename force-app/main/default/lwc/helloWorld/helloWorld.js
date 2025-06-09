import { LightningElement } from "lwc";

export default class HelloWorld extends LightningElement {
  message = "Welcome to the world of Lihtning Web Components!";

  get titleText() {
    return this.message + " Title";
  }
}
