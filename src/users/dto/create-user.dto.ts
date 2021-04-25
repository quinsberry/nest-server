import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
    @ApiProperty({ example: '123@gmail.com', description: 'Email' })
    readonly email: string

    @ApiProperty({ example: '123456', description: 'Password' })
    readonly password: string
}