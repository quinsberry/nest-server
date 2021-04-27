import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class banUserDto {
    @ApiProperty({ example: 1, description: 'Unique user identifier' })
    @IsNumber({}, { message: 'Should be a number' })
    readonly userId: number

    @ApiProperty({ example: 'Violation of User Agreement', description: 'Reason of ban' })
    @IsString({ message: 'Should be a string' })
    readonly banReason: string
}
