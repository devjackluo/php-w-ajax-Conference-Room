// Module Imports:
import Element  from "../../Element";
import ListItem from "../items/root/ListItem";

/** Base class for all listView widgets that manages a set of ListItems (sub class of ListItem) */
export default abstract class ListView<T extends ListItem> extends Element {

  // Internal list of sub element
  protected items: T[] = [];

  /**
   * Create a new ListView that references the desired dom node or dynamic node
   * It assumes the reference ID or dom type given is an orderd or unordered list.
   * 
   * @param nodeID A Class selector for an existing node or a node type to create a dynamic node
   */
  constructor(nodeID: string) {
    super(nodeID);
  }

  /**
   * Add a single or multiple sub items (subclass of ListItem) of type N to this list view
   * 
   * @param items A list of items to add
   */
  protected addItems(...items: T[]): void {

    // For each item to add..
    for (var item of items) {

      // Add this item to the containment list..
      this.items.push(item);

      // And root dom node
      this.addChildElements(item);

      // Set the index selection reference to this item based on its location in the sort list
      item.setIndex(this.items.length-1);
    }

    // If items were indeed added..
    if (items.length > 0) {

      // Scroll to the first item added
      (<any>this.node.scrollTo)(items[0].getNode());
    }
  }

  /**
   * Remove the desired list item at the given index within this list view
   * 
   * @param index The index position of the item to remove
   */
  public removeItemAtIndex(index: number): void {

    // If the given index is within bounds of the containment list..
    if (index >= 0 && index < this.items.length) {

      // Remove this element from the root dom node and containment list
      this.removeChildElement(this.items.splice(index, 1)[0]);

      // Starting from the referenced removal index..
      for (var itemIndex = index; itemIndex < this.items.length; itemIndex++) {

        // Update the remaining list element indexes to compensate for item removal
        this.items[itemIndex].setIndex(itemIndex);
      }
    }
  }

  /** Remove all sub elements from this list */
  public clear(): void {

    // For the number of sub items..
    for (var item of this.items) {

      // Remove this item from the root dom node
      this.removeChildElement(item);
    }

    // Clear out the containment list
    this.items = [];
  }
}