import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreatePostDto {
    @ApiProperty({ example: 1, description: 'Unique user identifier' })
    @IsString({ message: 'Should be a string' })
    readonly userId: string

    @ApiProperty({ example: 'Test post title', description: 'Post title' })
    @IsString({ message: 'Should be a string' })
    readonly title: string

    @ApiProperty({ example: 'Test post content', description: 'Post content' })
    @IsString({ message: 'Should be a string' })
    readonly content: string
}
