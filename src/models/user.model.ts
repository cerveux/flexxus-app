import { Table, Column, Model, DataType, Index } from "sequelize-typescript";
import { UserAttributes } from "../interfaces/user.interface";


@Table( { tableName: "user" } )
class UserModel extends Model<UserAttributes> {

@Index
@Column( {
  type: DataType.STRING( 15 ),
  allowNull: false,
  unique: true,
} )
  declare username: string;

@Column( {
  type: DataType.STRING( 15 ),
  allowNull: false,
} )
declare name: string;

@Column( {
  type: DataType.STRING( 15 ),
  allowNull: false,
} )
declare lastname: string;

@Column( {
  type: DataType.STRING( 70 ),
  allowNull: false,
} )
declare password: string;

}

export default UserModel;