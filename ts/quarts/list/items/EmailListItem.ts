// Module Imports:
import ListItem         from "./root/ListItem";
import Button           from "../../button/Button";
import InputField       from "../../input/InputField";
import { InputFilters } from "../../input/root/Input";

/**
 * List item implementation to allow for the modification and access of an email address
 * List items are dynamic and do no provide facilities to use an exsting dom node or node type reference
 */
export default class EmailListItem extends ListItem {

  // Email address input area
  private emailInput: InputField = new InputField("input");

  // Close button to trigger removal of this item within a parent list view
  private closeButton: Button = new Button("button");

  /**
   * Create a new dynamic email list item
   */
  constructor() {
    super();

    // Set the default input validation mode for the input feild
    this.emailInput.setInputValidationMode(InputFilters.EMAIL_ADDRESS);

    // Set the display label for the close button (TEMP: X string)
    this.closeButton.setLabel("X");

    // Add the user control interface elemtns to this elements root node for display
    this.addChildElements(this.emailInput, this.closeButton);
  }

  /**
   * Return the email string contained in this list item
   * 
   * @return The email string containd on this list item
   */
  public getValue(): string {

    // Return the email string contained in this list item
    return this.node.getAttribute("value");
  }
}