// Module Imports:
import Element from "../Element";

/**
 * Extended button control with the ability to manage the label displayed
 */
export default class Button extends Element {

  /**
   * Create a new button element that references the desired dom node...
   * if a dom node is not given the default element with be a dynamic button
   * 
   * @param nodeID A Class selector for an existing node or empty to create a dynamic button node
   */
  constructor(nodeID: string = "") {
    super(nodeID, "button");
  }

  /**
   * Alter the displayed label for this button
   * 
   * @param label The new display label for this button
   */
  public setLabel(label: string): void {

    // Change the display label value for the contained button dom node (assumes it's a button)
    this.node.textContent = label;
  }
}