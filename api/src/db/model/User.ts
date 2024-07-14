import { UUIDV4 } from "sequelize";
import {Column, Table, Model, DataType, PrimaryKey, AutoIncrement, Default, AllowNull, Unique, BeforeCreate} from "sequelize-typescript";
import connection from "../connection";


@Table({
    tableName: 'user',
    modelName: 'User', 
    timestamps: true
})
class User extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare pk: number

    @Unique
    @Default(UUIDV4)
    @Column(DataType.UUID)
    declare id: string

    @Unique
    @AllowNull(false)
    @Column(DataType.STRING)
    declare email: string

    @Column(DataType.VIRTUAL)
    declare password: string

    @Column(DataType.STRING)
    declare hashed_password: string

    @BeforeCreate
    static async hash_password(instance: User) {
        const hashed_password = "abc" // should do hashing for password attribute 
        instance.setDataValue("hashed_password", hashed_password)
    }
};


connection.addModels([User]);
export default User;