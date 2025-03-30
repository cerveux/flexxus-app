
/**
 * Express validator custom sanitazer that capitalizes the first letter
 * @param {string} value
 * @returns {string} value
 */
export const capitalizeFirstLetter = ( value?: string ) => {
  if ( value ) return value.charAt( 0 ).toUpperCase() + value.substring( 1 ).toLocaleLowerCase();
  else return;
};