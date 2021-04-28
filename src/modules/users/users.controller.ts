import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from './users.model'
import { Roles } from '../../decorators/roles.decorator'
import { RolesGuard } from '../../guards/roles.guard'
import { AddRoleDto } from './dto/add-role.dto'
import { BanUserDto } from './dto/ban-user.dto'
import { ValidationPipe } from '../../pipes/validation.pipe'

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 201, type: User })
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto)
    }

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    getAll() {
        return this.usersService.getAllUsers()
    }

    @ApiOperation({ summary: 'Add a role' })
    @ApiResponse({ status: 200 })
    @Roles('admin')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto)
    }

    @ApiOperation({ summary: 'Ban a user' })
    @ApiResponse({ status: 200 })
    @Roles('admin')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto)
    }
}
