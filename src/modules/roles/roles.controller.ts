import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RolesService } from './roles.service'
import { Role } from './roles.model'
import { CreateRoleDto } from './dto/create-role.dto'
import { ValidationPipe } from '../../pipes/validation.pipe'

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @ApiOperation({ summary: 'Create role' })
    @ApiResponse({ status: 201, type: Role })
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto)
    }

    @ApiOperation({ summary: 'Create role' })
    @ApiResponse({ status: 200, type: Role })
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.rolesService.getRoleByValue(value)
    }
}
