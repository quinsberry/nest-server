import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length, IsEmail } from 'class-validator'

export class CreateUserDto {
    @ApiProperty({ example: '123@gmail.com', description: 'Email' })
    @IsString({ message: 'Should be a string' })
    @IsEmail({}, { message: 'Invalid email' })
    readonly email: string

    @ApiProperty({ example: '123456', description: 'Password' })
    @IsString({ message: 'Should be a string' })
    @Length(6, 16, { message: 'Length should be more than 6 and less than 16 characters' })
    readonly password: string
}
