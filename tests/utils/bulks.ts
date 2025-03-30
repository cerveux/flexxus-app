import { sequelize } from "../../src/config/sequelize";

/**
 * All the steps required to connect to the database
 * @returns {void} This functions impacts on the database and doesnt returns anything
 */
const sequelizeConnection = async () => {
  await sequelize.authenticate();
  await forceDatabase();
};

/**
 * All the steps required to disconnect to the database
 * @returns {void} This functions impacts on the database and doesnt returns anything
 */
const sequelizeDisconnection  = async () => {
  await sequelize.close();
};

/**
 * Deletes all table rows
 * @param {string} tableName Table name as specified in the database schema
 * @returns {void} This functions impacts on the database and doesnt returns anything
 */
const truncateTable = async ( tableName:string ) => {
  try{
    await sequelize.query( `TRUNCATE TABLE "${tableName}" CASCADE` );
  } catch ( error ) {
    console.log( error );
  }
};

/**
 * Temporarily enables/disables referential contraints
 * @param {number} value Value 1 to enable forein keys validations and 0 to disable it
 * @returns {void} This functions impacts on the database and doesnt returns anything
 */
const setConstraints =async ( value: 0 | 1 ) => {
  try {
    await sequelize.query( `SET CONSTRAINTS ALL ${ value ? "IMMEDIATE" : "DEFERRED" };` );
  } catch ( error ) {
    console.log( error );
  }
};


/**
 * Forces database synchronization
 * @param {number} value Value 1 to enable forein keys validations and 0 to disable it
 * @returns {void} This functions impacts on the database and doesnt returns anything
*/
const forceDatabase = async () => {
  let force = true;
  if ( force ) {
    await sequelize.sync( { force } )
      .then( () => {} )
      .catch( ( error: Error ) => {
        console.error( "Error al sincronizar tablas:", error );
      } );
    force = false;
  }
};



export {
  forceDatabase,
  setConstraints,
  sequelizeConnection,
  truncateTable,
  sequelizeDisconnection
};