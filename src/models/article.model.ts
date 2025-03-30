import { Table, Column, Model, DataType, Index } from "sequelize-typescript";
import { ArticleAttributes } from "../interfaces/article.interface";



@Table( { tableName: "article" } )
class ArticleModel extends Model<ArticleAttributes> {

  @Column( {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  } )
  declare id: number;

  @Index( { name: "name-brand", unique: true } )
  @Column( {
    type: DataType.STRING( 50 ),
    allowNull: false,
  } )
  declare name: string;

  @Index( { name: "name-brand", unique: true } )
  @Column( {
    type: DataType.STRING( 50 ),
    allowNull: false,
  } )
  declare brand: string;

  @Column( {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  } )
  declare down: boolean;
}

export default ArticleModel;
