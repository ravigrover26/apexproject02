import { LightningElement, api } from "lwc";

export default class ParentCompLwc extends LightningElement {
  @api productsFound = false;
  @api productsList = [];
  get hasProducts() {
    return this.productsFound === "true" ? true : false;
  }
}
