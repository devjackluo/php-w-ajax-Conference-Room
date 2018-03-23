// Module Imports:
import Element                 from "../Element";
import Input, { InputFilters } from "./root/Input";

/**
 * A single or multi line input area (depending on a given node) with content and error checking facilities.
 */
export default class InputField extends Element implements Input<string> {

  // Base input filter reference defaulting to plain text (Matches against anything be default)
  private inputFilter: InputFilters = InputFilters.ANY;

  /**
   * Create a new InputField element that references the desired dom node ID.
   * If no reference is given a dymaic text input feild will be generated.
   * 
   * @param nodeID A Class selector for an existing node or empty to create a dynamic node
   * @param type   The desired input type such as "email", defaults to "text" for browser compatability
   */
  constructor(nodeID: string = "", type: string = "text") {
    super(nodeID ? nodeID : "", "input");

    // Set the desired input type
    this.node.setAttribute("type", type);

    // Capture edits of this input control to facilitate on-demand error checking
    this.addEventListener('keyup', event => this.onContentModified() );
  }

  /**
   * Change the desired input validation mode
   * 
   * @param inputMode The desired input validation mode
   */
  public setInputValidationMode(inputMode: InputFilters): void {

    // Change the desired input validation mode
    this.inputFilter = inputMode;
  }

  /**
   * Change the value displayed within this input
   * 
   * @param text The new input value
   */
  public setValue(text: string = ""): void {

    // Change the value displayed within this input
    (<any>this.node).value = text;
  }

  /**
   * Set the alternate or "ghost text" of this input
   * 
   * @param text The alternate text to display
   */
  public setAlternateText(text: string): void {

    // Set the alternate or "ghost text" of this input
    this.node.setAttribute("placeholder", text);
  }

  /**
   * Return if the data contained in this input is valid based on the set input validation
   * 
   * @return If the data contained is valid
   */
  public isValid(): boolean {

    // Get the current input value
    var currentValue = this.getValue();

    // And if available..
    if (currentValue) {

      // Depending on the validation to perform..
      switch (this.inputFilter) {

        // Validate content as is
        case InputFilters.ANY: return true;

        // Check against plain text (non empty)
        case InputFilters.EMPTY_STRING: return !InputFilters.EMPTY_STRING.test(currentValue);

        // Check against an email address
        case InputFilters.EMAIL_ADDRESS: return InputFilters.EMAIL_ADDRESS.test(currentValue);
      }
    }
    
    // Invalid data by default
    return false;
  }

  /**
   * Return the value contained in this input
   * 
   * @return The value contained in this input
   */
  public getValue(): string {

    // Grab the current value of this input which might not exist
    var currentValue = (<any>this.node).value;

    // Retun the current input if available otherwise return an empty
    return currentValue ? currentValue : "";
  }

  /**
   * When the user alters the data contained in this input by any means
   */
  private onContentModified(): void {

    // Run a validation check: swaping in and out a css selector of .invalid
    this.modClassTags("invalid", this.isValid());
  }
}
