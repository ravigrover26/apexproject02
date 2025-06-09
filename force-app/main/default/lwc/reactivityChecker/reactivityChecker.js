import { LightningElement } from "lwc";

export default class ReactivityChecker extends LightningElement {
  userAddress = "123 Main St, Anytown, USA";

  handleUpdateAddress() {
    this.userAddress = "456 Main St, Anytown, USA";
  }
}
