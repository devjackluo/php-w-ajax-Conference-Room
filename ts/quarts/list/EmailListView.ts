// Module imports:
import ListView      from "./root/ListView";
import EmailListItem from "./items/EmailListItem";

/** A List view that manages a dynamic list of editable email address items */
export default class EmailListView extends ListView<EmailListItem> {

  /**
   * Create a new Email List view that references the desired dom node or dynamic node
   * It assumes the reference ID or dom type given is an orderd or unordered list.
   * 
   * @param nodeID A Class selector for an existing node or a node type to create a dynamic node
   */
  constructor(nodeID: string) {
    super(nodeID);
  }

  /** Create a new email entry for this list and navigate to it for editing. */
  private createNewEmailEntry(): void {

    // Create a new Email List item and auto navigate to it
    this.addItems(new EmailListItem());
  }

  /**
   * Return if this email list is empty
   * 
   * @return If this email list is empty
   */
  public isEmpty(): boolean {

    // Return if this email list is empty
    return this.items.length == 0;
  }

  /**
   * Return an array of email addresses contained in this list
   * 
   * @return An array of email addresses contained in this list
   */
  public getvalues(): string[] {

    // End result array
    var result: string[] = [];

    // For every email list item..
    for (var item of this.items) {

      // add its stored email address to the return list
      result.push(item.getValue());
    }

    // Send upstream the contained list of email addresses
    return result;
  }
}