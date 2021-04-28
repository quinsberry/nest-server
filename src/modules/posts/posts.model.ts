import { ApiProperty } from '@nestjs/swagger'
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from '../users/users.model'

interface PostCreationAttrs {
    userId: number
    title: string
    content: string
    image: string
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
    @ApiProperty({ example: 1, description: 'Post unique identifier' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({ example: 'Test post title', description: 'Post title' })
    @Column({ type: DataType.STRING, allowNull: false })
    title: string

    @ApiProperty({ example: 'Some testing content text', description: 'Post content' })
    @Column({ type: DataType.STRING, allowNull: false })
    content: string

    @ApiProperty({ example: 'Some testing content text', description: 'Post image' })
    @Column({ type: DataType.STRING })
    image: string

    @ApiProperty({ example: 1, description: 'Unique user identifier' })
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number

    @ApiProperty({ example: 'Elon Mask', description: 'Post author' })
    @BelongsTo(() => User)
    author: string
}
