import { LightningElement, api } from "lwc";

export default class GrandChildCompLwc extends LightningElement {
  @api productId;
  //   @api productName;
  @api productPrice;
}
