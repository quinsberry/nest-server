import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber } from 'class-validator'

export class addRoleDto {
    @ApiProperty({ example: 1, description: 'Unique user identifier' })
    @IsNumber({}, { message: 'Should be a number' })
    readonly userId: number

    @ApiProperty({ example: 'admin', description: 'Administrator value' })
    @IsString({ message: 'Should be a string' })
    readonly value: string
}
