import { UUIDV4 } from "sequelize";
import {Column, Table, Model, DataType, PrimaryKey, AutoIncrement, Default, AllowNull, Unique, BeforeCreate, ForeignKey, BelongsTo} from "sequelize-typescript";
import connection from "../connection";
import User from "./User";


enum Category {"cat", "dog", "neither"};



@Table({
    tableName: 'image',
    modelName: 'Image',
    timestamps: true
})
class Image extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare pk: number

    @Unique
    @Column(DataType.UUID)
    declare id: string

    @Unique
    @AllowNull(false)
    @Column(DataType.STRING)
    declare file_name: string

    @Column(DataType.STRING)
    declare file_extension: string

    @AllowNull(true)
    @Column(DataType.ENUM("cat", "dog", "neither"))
    declare category: Category

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    declare user_pk: number


    @BelongsTo(() => User, {
        as: 'user',
        foreignKey: 'user_pk',
    })
    declare user: User
};


connection.addModels([Image]);
User.hasMany(Image, {
    as: 'images',
    foreignKey: 'user_pk'
});


export default Image;