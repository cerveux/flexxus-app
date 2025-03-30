import fs from "fs";

export const takeNameFn = ( errorStackTrace: string ): string => {
  const regex = /at\s+\w+/;
  const coincidence = regex.exec( errorStackTrace );

  let fnErrorName;
  if ( coincidence && coincidence[0] ) {
    fnErrorName = coincidence[0];
  }
  return fnErrorName || `Can not take the function name ${errorStackTrace}`;
};

/**
 * Process the error information for insertion into the database
 */
export const handleAndInsertError = async ( error: Error ) : Promise<void> => {
  try {
    const nameFn: string = takeNameFn( error.stack! );
    const writer = fs.createWriteStream( "src/errors/errors.txt", {
      flags: "a",
    } );
    writer.write( `${error.message} ${nameFn} \n` );
    writer.end();
  } catch ( error ) {
    const err = error as Error;
    throw new Error( `${err.message}` );
  }
};