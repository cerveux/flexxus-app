
/**
 * Express validator custom sanitazer that capitalizes the first letter
 * @param {string} value
 * @returns {string} value
 */
export const capitalizeFirstLetter = ( value?: string ) => {
  if ( value ) return value.charAt( 0 ).toUpperCase() + value.substring( 1 ).toLocaleLowerCase();
  else return;
};

/**
  * Express validator custom sanitazer that turns empty strings to null
  * @param {string} value
  * @returns {string|null} value or null
  */
export const emptyToNull = ( value: string ) => {
  if ( value === "" ) return null;
  return value;
};