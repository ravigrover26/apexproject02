import { LightningElement } from "lwc";

export default class LifecycleHooksDemoComp extends LightningElement {
  userName = "John Doe";
  showContent = true;

  toggleContent() {
    this.showContent = !this.showContent;
    console.log("Content toggled. showContent =", this.showContent);
  }

  handleNameChange() {
    const inputElement = this.template.querySelector("lightning-input");
    this.userName = inputElement.value;
  }

  // write a constrcutor callback
  constructor() {
    super();
    console.log("constructor callback");
  }

  connectedCallback() {
    console.log("connectedCallback callback");
  }

  renderedCallback() {
    console.log("renderedCallback callback");
  }

  disconnectedCallback() {
    console.log("disconnectedCallback callback");
  }

  errorCallback(error, stack) {
    console.log("errorCallback callback");
    console.log(error);
    console.log(stack);
  }
}
