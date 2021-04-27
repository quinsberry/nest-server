import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateRoleDto {
    @ApiProperty({ example: 'admin', description: 'Role value' })
    @IsString({ message: 'Should be a string' })
    readonly value: string

    @ApiProperty({ example: 'Administrator', description: 'Role description' })
    @IsString({ message: 'Should be a string' })
    readonly description: string
}
