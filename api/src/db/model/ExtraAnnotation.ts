import { UUIDV4 } from "sequelize";
import {Column, Table, Model, DataType, PrimaryKey, AutoIncrement, Default, AllowNull, Unique, BeforeCreate, ForeignKey, BelongsTo} from "sequelize-typescript";
import connection from "../connection";
import User from "./User";
import Image from "./Image";


enum Category {"cat", "dog", "neither"};



@Table({
    tableName: 'extra_annotation',
    modelName: 'ExtraAnnotation',
    timestamps: false
})
class ExtraAnnotation extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare pk: number

    @ForeignKey(() => Image)
    @Column(DataType.INTEGER)
    declare image_pk: number

    @AllowNull(false)
    @Column(DataType.STRING)
    declare key: string

    @AllowNull(false)
    @Column(DataType.STRING)
    declare value: string

};


connection.addModels([ExtraAnnotation]);
Image.hasMany(ExtraAnnotation, {
    as: 'extra_annotations',
    foreignKey: 'image_pk'
});


export default ExtraAnnotation;