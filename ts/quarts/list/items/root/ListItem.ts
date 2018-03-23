// Module Imports:
import Element from "../../../Element";

/**
 * Base class implementation for all sub items within a ListView
 * Creation of listItems is only dynamic and doesn't provide a facility to use a prebuild dom node ID reference or type name
 */
export default abstract class ListItem extends Element {

  // Sorting index reference within a list view
  private index: number = -1;

  /**
   * Create a new emlty list item
   */
  constructor() {
    super("li");
  }

  /**
   * Set the list index reference for this list item to the desired number
   * 
   * @param index The new index reference for this list item
   */
  public setIndex(index: number): void {

    // Save the given index reference
    this.index = index;
  }
}