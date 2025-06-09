import { LightningElement, api } from "lwc";

export default class ChildCompLwc extends LightningElement {
  @api productId;
  @api productName;
  @api productPrice;
}
