import { LightningElement } from "lwc";

/**
 * BMI Calculator Component
 * Calculates Body Mass Index based on weight (kg) and height (meters)
 * @author Salesforce Developer
 */
export default class CalculateBMIComponent extends LightningElement {
  weight = "";
  height = "";
  bmi = 0;
  status = "";

  // Constants for BMI classification
  static BMI_RANGES = {
    UNDERWEIGHT: 18.5,
    NORMAL_MAX: 24.9,
    OVERWEIGHT_MAX: 29.9,
  };

  static BMI_STATUS = {
    UNDERWEIGHT: "Underweight",
    NORMAL: "Normal weight",
    OVERWEIGHT: "Overweight",
    OBESE: "Obesity",
  };

  static STATUS_VARIANTS = {
    [this.BMI_STATUS.UNDERWEIGHT]: "warning",
    [this.BMI_STATUS.NORMAL]: "success",
    [this.BMI_STATUS.OVERWEIGHT]: "warning",
    [this.BMI_STATUS.OBESE]: "error",
  };

  /**
   * Handles weight input change with validation
   * @param {Event} event - Input change event
   */
  handleWeightChange(event) {
    const value = event.target.value;
    this.weight = this.validateNumericInput(value, 0, 1000) ? value : "";
  }

  /**
   * Handles height input change with validation
   * @param {Event} event - Input change event
   */
  handleHeightChange(event) {
    const value = event.target.value;
    this.height = this.validateNumericInput(value, 0, 3) ? value : "";
  }

  /**
   * Validates numeric input within specified range
   * @param {string} value - Input value to validate
   * @param {number} min - Minimum allowed value
   * @param {number} max - Maximum allowed value
   * @returns {boolean} - True if valid
   */
  validateNumericInput(value, min, max) {
    const numValue = parseFloat(value);
    return !isNaN(numValue) && numValue >= min && numValue <= max;
  }

  /**
   * Resets all component values to initial state
   */
  resetValues() {
    this.weight = "";
    this.height = "";
    this.bmi = 0;
    this.status = "";

    // Clear any validation errors
    this.clearValidationErrors();
  }

  /**
   * Clears validation errors from input fields
   */
  clearValidationErrors() {
    const inputs = this.template.querySelectorAll("lightning-input");
    inputs.forEach((input) => {
      input.setCustomValidity("");
      input.reportValidity();
    });
  }

  /**
   * Calculates BMI with proper validation and error handling
   */
  calculateBMI() {
    try {
      if (!this.isValidInput()) {
        this.showValidationErrors();
        return;
      }

      const weightNum = parseFloat(this.weight);
      const heightNum = parseFloat(this.height);

      // BMI = weight(kg) / height(m)²
      const calculatedBMI = weightNum / heightNum ** 2;

      // Round to 2 decimal places for precision
      this.bmi = Math.round(calculatedBMI * 100) / 100;
      this.status = this.getBMIStatus(this.bmi);

      this.clearValidationErrors();
    } catch (error) {
      console.error("Error calculating BMI:", error);
      this.showError("An error occurred while calculating BMI");
    }
  }

  /**
   * Validates input values before calculation
   * @returns {boolean} - True if inputs are valid
   */
  isValidInput() {
    const weightNum = parseFloat(this.weight);
    const heightNum = parseFloat(this.height);

    return (
      this.weight &&
      this.height &&
      !isNaN(weightNum) &&
      !isNaN(heightNum) &&
      weightNum > 0 &&
      heightNum > 0 &&
      weightNum <= 1000 &&
      heightNum <= 3
    );
  }

  /**
   * Shows validation errors for invalid inputs
   */
  showValidationErrors() {
    const weightInput = this.template.querySelector('[data-id="weight-input"]');
    const heightInput = this.template.querySelector('[data-id="height-input"]');

    if (!this.weight || parseFloat(this.weight) <= 0) {
      weightInput?.setCustomValidity("Please enter a valid weight (1-1000 kg)");
      weightInput?.reportValidity();
    }

    if (!this.height || parseFloat(this.height) <= 0) {
      heightInput?.setCustomValidity(
        "Please enter a valid height (0.1-3.0 meters)",
      );
      heightInput?.reportValidity();
    }
  }

  /**
   * Shows error message to user
   * @param {string} message - Error message to display
   */
  showError(message) {
    // Could integrate with lightning-toast or other notification system
    console.error(message);
  }

  /**
   * Determines BMI status category based on calculated BMI
   * @param {number} bmi - Calculated BMI value
   * @returns {string} - BMI status category
   */
  getBMIStatus(bmi) {
    const { BMI_RANGES, BMI_STATUS } = CalculateBMIComponent;

    if (bmi < BMI_RANGES.UNDERWEIGHT) return BMI_STATUS.UNDERWEIGHT;
    if (bmi <= BMI_RANGES.NORMAL_MAX) return BMI_STATUS.NORMAL;
    if (bmi <= BMI_RANGES.OVERWEIGHT_MAX) return BMI_STATUS.OVERWEIGHT;
    return BMI_STATUS.OBESE;
  }

  /**
   * Returns the appropriate badge variant based on BMI status
   * @returns {string} - Lightning badge variant
   */
  get statusVariant() {
    return CalculateBMIComponent.STATUS_VARIANTS[this.status] || "neutral";
  }

  /**
   * Returns whether BMI has been calculated
   * @returns {boolean} - True if BMI is calculated
   */
  get hasBMIResult() {
    return this.bmi > 0;
  }

  /**
   * Returns formatted BMI value for display
   * @returns {string} - Formatted BMI value
   */
  get formattedBMI() {
    return this.bmi.toFixed(2);
  }

  /**
   * Returns whether the calculate button should be disabled
   * @returns {boolean} - True if button should be disabled
   */
  get isCalculateDisabled() {
    return !this.weight || !this.height;
  }
}
