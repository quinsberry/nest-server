import { ApiProperty } from '@nestjs/swagger'
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript'
import { Role } from '../roles/roles.model'
import { UserRoles } from '../roles/user-roles.model'

interface UserCreationAttrs {
    email: string
    password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({ example: 1, description: 'Unique identifier' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({ example: '123@gmail.com', description: 'Email' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string

    @ApiProperty({ example: '123456', description: 'Password' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string

    @ApiProperty({ example: 'true', description: 'Was user banned or not' })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean

    @ApiProperty({ example: 'js injection', description: 'The reason of the ban' })
    @Column({ type: DataType.STRING, allowNull: true })
    banReason: string

    @ApiProperty({ type: [Role], description: 'User roles' })
    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]
}
