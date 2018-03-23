/**
 * Root class for all gui / interface component within Quartz
 * 
 * Provides facilities to:
 *   - Manage class and inline style references
 *   - Adding and removing of child elements
 *   - Disabling and enabling from user input
 *   - Accessing the controlled dom element 
 * 
 * An element can either control and existing dom node written in html (given an ID tag #FOO)
 * or create a node dynamicly by passing a node type such as "div."
 */
export default abstract class Element {

  // Internal dom node reference
  protected node: HTMLElement = null;

  /**
   * Create a new element that targest the desired dom node given its id.
   * If an id is not given a dynamic node of the desired type will be created instead.
   * 
   * @param nodeID   Dom node ID accessor for the target element
   * @param nodeType Dom node type reference for dynamic creation
   */
  constructor(nodeID: string, nodeType: string = "") {

    // If a node ID is given and matches a class selector of an item that doesn't exist
    if (nodeID && nodeID.match("^#\S+$") && (this.node = document.getElementById(nodeID)) == null) {

      // Error out: Otherwise the internal dom reference will have an associated node as is from above
      throw 'Quartz: An element with an id of ${nodeID} is not present, dom functions will not work.';

    // If a node type is given and matches a node type name
    } else if (nodeType && nodeType.match("^[a-zA-Z]+")) {

      // Create a new node of the given type
      this.node = document.createElement(nodeType);

    // If nothing was given or the like, in terms of invalid input
    } else {

      // Error: A reference name or type must be given
      throw "Quartz: A valid node ID reference or type reference is required."
    }
  }

  /**
   * Add or remove a class tag from the controlled dom element
   * 
   * @param tag      The class tag to remove or add
   * @param toRemove If removing the given class tag (false default or "adding")
   */
  public modClassTags(tag: string, toRemove: boolean = false): void {

    // Grab the current class list data set and..
    var classList = this.node.classList;

    // Depending on removal or adding do n'
    !toRemove ? classList.add(tag) : classList.remove(tag);
  }

  /**
   * Add, remove, or modify inline style tags for the controlled dom node
   * 
   * @param tag   The tag to add, remove, or modify
   * @param value The new tag value, empty to remove (default)
   */
  public modStyleTags(tag: string, value: string = ""): void {

    // Modify / Replace or Remove the desired css tag
    this.node.style[tag] = value;
  }

  /**
   * Add a desired event listener for n' event to this elements dom node
   * 
   * @param event    The event being fired
   * @param listener The listener function for the desired event
   */
  public addEventListener(event: string, listener: EventListener): void {

    // Add a desired event listener for n' event to this elements dom node
    this.node.addEventListener(event, listener);
  }

  /**
   * Add a single or multiple child nodes to this Elements dom node
   * 
   * @param element A list of Elements or subclass of Element to add
   */
  public addChildElements(...elements: Element[]): void {

    // For every element to add
    for (var element of elements) {

      // Add this iterations dom node to this elements node as a child
      this.node.appendChild(element.getNode());
    }
  }

  /**
   * Remove the desired event listener from n' event of this elements dom node
   * 
   * @param event    The event to target
   * @param listener The listener function for removal
   */
  public removeEventListener(event: string, listener: EventListener): void {

    // Remove the desired event listener from n' event of this elements dom node
    this.node.removeEventListener(event, listener);
  }

  /**
   * Remove the desired element's dom node from this element
   * 
   * @param element The element to remove
   */
  public removeChildElement(element: Element): void {

    // Remove the desired element's dom node from this element
    this.node.removeChild(element.getNode());
  }

  /**
   * Enable or disable this elements dom node
   *
   * @param isDisabled If enabling (false) or disabling (true) this elements dom node
   */
  public setDisabled(isDisabled: boolean): void {

    // Enable or disable this elements dom node
    this.node.setAttribute("disabled", isDisabled ? "true" : "false");
  }

  /**
   * Return this element's dom node
   * 
   * @return This elements dom node
   */
  public getNode(): HTMLElement {

    // Return this element's dom node
    return this.node;
  }
}
