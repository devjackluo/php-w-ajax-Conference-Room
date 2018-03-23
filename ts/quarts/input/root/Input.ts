/**
 * A unified public function list for all input elements
 */
export default interface Input<T> {

  /**
   * Return if the extending items data is valid
   */
  isValid: () => boolean;

  /**
   * Return the data contained for the extending element (Generic data returned: T)
   */
  getValue: () => T;
}

/**
 * A utility class with public constants acting as an enum given enums in typescript can' have non string or integer values.
 * Privides input pattern matching
 */
export class InputFilters {

  // Any character sequence
  public static ANY: RegExp = new RegExp("^.*$");

  // Match against an empty string
  public static EMPTY_STRING: RegExp = new RegExp("^\s+$");

  // Match against an email address
  public static EMAIL_ADDRESS: RegExp = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
}
