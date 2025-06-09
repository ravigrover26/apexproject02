import { LightningElement } from "lwc";

export default class TwoWayDataBindingDeomo extends LightningElement {
  courseName = "Zero to Hero";
  courseSubject = "Salesforce";

  changeHandler(event) {
    this.courseSubject = event.target.value;
  }
}
